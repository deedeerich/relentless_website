"""
RELENTLESS — DNS Propagation Verification Script

Checks that relentlessperforma.com DNS records are correctly pointed to Shopify.
Run after updating DNS at Directnic.

Usage:
  python3 scripts/dns_verify.py

Expected results:
  A record    → 23.227.38.65 (Shopify)
  CNAME (www) → shops.myshopify.com
"""

import socket
import sys


DOMAIN = "relentlessperforma.com"
EXPECTED_SHOPIFY_IP = "23.227.38.65"
EXPECTED_CNAME_TARGET = "shops.myshopify.com"


def check_a_record(domain: str) -> tuple[bool, str]:
    """Check A record resolves to Shopify IP."""
    try:
        ip = socket.gethostbyname(domain)
        if ip == EXPECTED_SHOPIFY_IP:
            return True, f"A record: {ip} (Shopify)"
        return False, f"A record: {ip} (expected {EXPECTED_SHOPIFY_IP})"
    except socket.gaierror as e:
        return False, f"A record lookup failed: {e}"


def check_www_cname(domain: str) -> tuple[bool, str]:
    """Check www CNAME points to Shopify."""
    www = f"www.{domain}"
    try:
        result = socket.getaddrinfo(www, None)
        ip = result[0][4][0]
        # If www resolves to Shopify IP, CNAME is likely correct
        if ip == EXPECTED_SHOPIFY_IP:
            return True, f"www CNAME: resolves to {ip} (Shopify)"
        return False, f"www CNAME: resolves to {ip} (expected Shopify)"
    except socket.gaierror as e:
        return False, f"www CNAME lookup failed: {e}"


def check_https(domain: str) -> tuple[bool, str]:
    """Verify HTTPS connectivity."""
    import urllib.request
    import ssl

    try:
        url = f"https://{domain}"
        req = urllib.request.Request(url, method="HEAD")
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            return True, f"HTTPS: {resp.status} (SSL valid)"
    except Exception as e:
        return False, f"HTTPS check failed: {e}"


def main():
    print(f"RELENTLESS — DNS Verification for {DOMAIN}")
    print("=" * 50)

    checks = [
        ("A Record", check_a_record(DOMAIN)),
        ("WWW CNAME", check_www_cname(DOMAIN)),
        ("HTTPS/SSL", check_https(DOMAIN)),
    ]

    all_passed = True
    for name, (passed, message) in checks:
        status = "PASS" if passed else "FAIL"
        icon = "+" if passed else "!"
        print(f"  [{icon}] {name}: {message}")
        if not passed:
            all_passed = False

    print("=" * 50)
    if all_passed:
        print("All checks passed. DNS is correctly pointed to Shopify.")
    else:
        print("Some checks failed. DNS may still be propagating (up to 48 hours).")
        print("If this persists, verify Directnic DNS settings:")
        print(f"  A record:    @ → {EXPECTED_SHOPIFY_IP}")
        print(f"  CNAME record: www → {EXPECTED_CNAME_TARGET}")
        sys.exit(1)


if __name__ == "__main__":
    main()
