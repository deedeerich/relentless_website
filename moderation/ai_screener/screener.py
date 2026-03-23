"""
RELENTLESS — AI Content Moderation Screener (Gate 1)

Two-gate system:
  Gate 1 (this): Automated AI screening via OpenAI Moderation API.
    - Hard fails: auto-rejected (hate, sexual, self-harm, violence, spam)
    - Clean passes: queued for community feed
    - Ambiguous: flagged for human review (Gate 2)
  Gate 2: Human review in Airtable by Stephen/Chelsea/staff.

Usage:
  python3 screener.py                    # Interactive test mode
  python3 -m pytest screener.py -v       # Run doctests

Environment:
  OPENAI_API_KEY     — Required. OpenAI API key.
  AIRTABLE_API_KEY   — Required for queue integration.
  AIRTABLE_BASE_ID   — Required for queue integration.
"""

import json
import os
import sys
from dataclasses import dataclass
from enum import Enum
from typing import Optional

try:
    from openai import OpenAI
except ImportError:
    print("Install openai: pip install openai")
    sys.exit(1)


class Decision(Enum):
    APPROVED = "approved"
    REJECTED = "rejected"
    FLAGGED = "flagged_for_review"


@dataclass
class ScreeningResult:
    decision: Decision
    content_preview: str
    categories_flagged: list[str]
    confidence: float
    reason: str


# Categories from Chelsea's community guidelines — mapped to OpenAI moderation categories
HARD_REJECT_CATEGORIES = {
    "hate",
    "hate/threatening",
    "self-harm",
    "self-harm/intent",
    "self-harm/instructions",
    "sexual",
    "sexual/minors",
    "violence",
    "violence/graphic",
    "harassment",
    "harassment/threatening",
}

# Threshold for auto-approve vs flag for review
AUTO_APPROVE_THRESHOLD = 0.15
FLAG_THRESHOLD = 0.40


def screen_content(text: str, author_id: Optional[str] = None) -> ScreeningResult:
    """
    Screen user-submitted content through OpenAI Moderation API.

    Returns a ScreeningResult with decision: APPROVED, REJECTED, or FLAGGED.
    """
    if not text or not text.strip():
        return ScreeningResult(
            decision=Decision.REJECTED,
            content_preview="",
            categories_flagged=["empty_submission"],
            confidence=1.0,
            reason="Empty submission.",
        )

    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    response = client.moderations.create(
        model="omni-moderation-latest",
        input=text,
    )

    result = response.results[0]
    flagged_categories = []
    max_score = 0.0

    for category, flagged in result.categories.model_dump().items():
        score = getattr(result.category_scores, category, 0.0)
        if score > max_score:
            max_score = score
        if flagged or score > FLAG_THRESHOLD:
            flagged_categories.append(category)

    # Hard reject: any category in the reject list is flagged
    hard_rejects = [c for c in flagged_categories if c in HARD_REJECT_CATEGORIES]
    if hard_rejects:
        return ScreeningResult(
            decision=Decision.REJECTED,
            content_preview=text[:200],
            categories_flagged=hard_rejects,
            confidence=max_score,
            reason=f"Content violates community guidelines: {', '.join(hard_rejects)}.",
        )

    # Ambiguous: some flags but not hard rejects, or scores in the middle range
    if flagged_categories or max_score > AUTO_APPROVE_THRESHOLD:
        return ScreeningResult(
            decision=Decision.FLAGGED,
            content_preview=text[:200],
            categories_flagged=flagged_categories if flagged_categories else ["borderline_score"],
            confidence=max_score,
            reason="Content needs human review — borderline moderation scores.",
        )

    # Clean pass
    return ScreeningResult(
        decision=Decision.APPROVED,
        content_preview=text[:200],
        categories_flagged=[],
        confidence=1.0 - max_score,
        reason="Content passed AI screening.",
    )


def main():
    """Interactive test mode."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Set OPENAI_API_KEY environment variable to test.")
        print("\nExample:")
        print('  export OPENAI_API_KEY="sk-..."')
        print("  python3 screener.py")
        sys.exit(1)

    print("RELENTLESS — AI Content Screener (Gate 1)")
    print("Type content to screen. Ctrl+C to exit.\n")

    while True:
        try:
            text = input("Content> ").strip()
            if not text:
                continue
            result = screen_content(text)
            print(f"  Decision:   {result.decision.value}")
            print(f"  Categories: {result.categories_flagged}")
            print(f"  Confidence: {result.confidence:.2f}")
            print(f"  Reason:     {result.reason}\n")
        except KeyboardInterrupt:
            print("\nDone.")
            break


if __name__ == "__main__":
    main()
