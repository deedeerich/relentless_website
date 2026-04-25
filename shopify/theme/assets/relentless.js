/**
 * relentless.js
 * ============================================================================
 * Relentless Performa — Unified JavaScript for Shopify theme
 *
 * Systems:
 *   1. Cosmos Starfield Engine (canvas animation)
 *   2. Bloom Card System (hover expand / mobile tap)
 *   3. Rotating Mantra System (hero tagline rotation)
 *   4. Nav Scroll Handler (scrolled class on nav)
 *   5. Scroll Reveal (IntersectionObserver for sections/cards)
 *   6. Cookie Consent (localStorage-based)
 *   7. Newsletter / Waitlist Form (GDPR consent validation)
 *   8. Mobile Navigation (hamburger toggle)
 *   9. Still Building Page (action pages, category cards, checkbox tracker)
 *
 * All code wrapped in an IIFE for scope isolation.
 * CSP-compliant: no inline handlers — addEventListener only.
 * Respects prefers-reduced-motion.
 * ============================================================================
 */
(function () {
  'use strict';

  /* ========================================================================
   * UTILITY FUNCTIONS
   * ======================================================================== */

  /**
   * Clamps a numeric value between a minimum and maximum.
   * @param {number} v - The value to clamp.
   * @param {number} mn - Minimum bound.
   * @param {number} mx - Maximum bound.
   * @returns {number} The clamped value.
   */
  function clamp(v, mn, mx) {
    return Math.max(mn, Math.min(mx, v));
  }

  /**
   * Returns true if the user prefers reduced motion.
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Returns true if the device supports touch events.
   * @returns {boolean}
   */
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }


  /* ========================================================================
   * 1. COSMOS STARFIELD ENGINE
   *
   * Full-canvas starfield with nebula clouds, bokeh light orbs, twinkling
   * stars, shooting stars, bright accent stars with cross-diffraction spikes,
   * and a sweeping diagonal light arc.
   *
   * Target: <canvas id="starfield">
   * ======================================================================== */

  /** @type {HTMLCanvasElement|null} */
  var canvas = document.getElementById('starfield');

  if (canvas && canvas.getContext) {
    (function initStarfieldEngine() {
      /** @type {CanvasRenderingContext2D} */
      var ctx = canvas.getContext('2d');

      /** @type {Array<Object>} Star particles */
      var stars = [];
      /** @type {Array<Object>} Bokeh light orbs */
      var bokeh = [];
      /** @type {Array<Object>} Active shooting stars */
      var shooters = [];
      /** @type {Array<Object>} Nebula cloud ellipses */
      var nebs = [];
      /** @type {number} Global animation frame counter */
      var frame = 0;
      /** @type {number|null} requestAnimationFrame ID for cleanup */
      var rafId = null;

      /**
       * Returns current canvas width.
       * @returns {number}
       */
      function W() { return canvas.width; }

      /**
       * Returns current canvas height.
       * @returns {number}
       */
      function H() { return canvas.height; }

      /**
       * Resizes the canvas to match the window dimensions.
       */
      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      /**
       * initCosmos — Populates the star field, bokeh orbs, and nebula clouds.
       * Called on load and on resize.
       *
       * - 600 stars with varied warm/cool color temperatures
       * - 22 bokeh orbs, 60% weighted to the left third of the viewport
       * - 6 nebula cloud ellipses for atmospheric depth
       */
      function initCosmos() {
        stars = [];
        bokeh = [];
        shooters = [];
        nebs = [];

        var i, warm, leftBias;

        // Dense tiny star field — 600 stars, varied warmth
        for (i = 0; i < 600; i++) {
          warm = Math.random();
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.1 + 0.1,
            op: Math.random() * 0.7 + 0.15,
            speed: Math.random() * 0.3 + 0.04,
            phase: Math.random() * Math.PI * 2,
            // warm amber stars mixed with cool whites
            r1: warm > 0.6 ? 200 : 220,
            g1: warm > 0.6 ? (warm > 0.8 ? 160 : 140) : 210,
            b1: warm > 0.6 ? 60 : 200
          });
        }

        // Bokeh light orbs — heavier on left side matching reference
        for (i = 0; i < 22; i++) {
          leftBias = Math.random() < 0.6;
          bokeh.push({
            x: leftBias
              ? Math.random() * canvas.width * 0.38
              : Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: leftBias
              ? Math.random() * 160 + 60    // larger on left
              : Math.random() * 100 + 30,
            op: leftBias
              ? Math.random() * 0.18 + 0.06 // brighter on left
              : Math.random() * 0.1 + 0.02,
            speed: Math.random() * 0.12 + 0.015,
            phase: Math.random() * Math.PI * 2,
            hue: Math.random() > 0.35 ? '205,145,45' : '185,125,35'
          });
        }

        // Nebula clouds — soft atmospheric depth
        for (i = 0; i < 6; i++) {
          nebs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            rx: Math.random() * 300 + 150,
            ry: Math.random() * 180 + 80,
            op: Math.random() * 0.06 + 0.01,
            hue: Math.random() > 0.4 ? '180,130,50' : '140,100,40'
          });
        }
      }

      /**
       * drawLightArc — Draws a sweeping diagonal light arc across the canvas.
       * Two bezier curves: a primary thick arc and a secondary thinner arc,
       * both with pulsing opacity driven by the frame counter.
       *
       * @param {number} f - Current frame counter value.
       */
      function drawLightArc(f) {
        var w = canvas.width;
        var h = canvas.height;

        // Sweeping arc from lower-left to lower-right
        var pulse = Math.sin(f * 0.3) * 0.015 + 0.04;
        var g = ctx.createLinearGradient(0, h * 0.85, w, h * 0.65);
        g.addColorStop(0,    'rgba(200,140,40,0)');
        g.addColorStop(0.15, 'rgba(200,140,40,' + pulse + ')');
        g.addColorStop(0.35, 'rgba(220,160,50,' + (pulse * 1.6) + ')');
        g.addColorStop(0.55, 'rgba(200,140,40,' + pulse + ')');
        g.addColorStop(0.75, 'rgba(180,120,35,' + (pulse * 0.6) + ')');
        g.addColorStop(1,    'rgba(160,110,30,0)');
        ctx.beginPath();
        ctx.moveTo(0, h * 0.88);
        ctx.bezierCurveTo(w * 0.25, h * 0.7, w * 0.65, h * 0.72, w, h * 0.6);
        ctx.strokeStyle = g;
        ctx.lineWidth = clamp(h * 0.006, 2, 8);
        ctx.stroke();

        // Second thinner arc
        var g2 = ctx.createLinearGradient(0, h * 0.78, w * 0.7, h * 0.55);
        g2.addColorStop(0,   'rgba(210,150,40,0)');
        g2.addColorStop(0.2, 'rgba(210,150,40,' + (pulse * 0.7) + ')');
        g2.addColorStop(0.6, 'rgba(200,140,40,' + (pulse * 0.4) + ')');
        g2.addColorStop(1,   'rgba(190,130,35,0)');
        ctx.beginPath();
        ctx.moveTo(0, h * 0.76);
        ctx.bezierCurveTo(w * 0.2, h * 0.62, w * 0.5, h * 0.6, w * 0.72, h * 0.52);
        ctx.strokeStyle = g2;
        ctx.lineWidth = clamp(h * 0.003, 1, 4);
        ctx.stroke();
      }

      /**
       * maybeShoot — Probabilistically spawns a new shooting star each frame.
       * ~0.3% chance per frame. Shooting stars travel at a diagonal angle
       * and fade over their lifetime.
       */
      function maybeShoot() {
        if (Math.random() < 0.003) {
          shooters.push({
            x: Math.random() * canvas.width * 0.6,
            y: Math.random() * canvas.height * 0.4,
            len: Math.random() * 120 + 60,
            angle: Math.PI / 4 + Math.random() * 0.4,
            life: 1,
            decay: Math.random() * 0.015 + 0.008,
            op: Math.random() * 0.7 + 0.3
          });
        }
      }

      /**
       * drawCosmos — Main render loop for the starfield canvas.
       *
       * Render order (back to front):
       *   1. Nebula clouds (bottom layer)
       *   2. Light arc (sweeping diagonal)
       *   3. Bokeh orbs (warm magical glow spots)
       *   4. Star field (twinkling with glow on brighter stars)
       *   5. Shooting stars (spawned probabilistically)
       *   6. Bright accent stars (large glowing focal points with cross spikes)
       *
       * Uses requestAnimationFrame for smooth 60fps rendering.
       */
      function drawCosmos() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame += 0.003;

        var g, pulse, t, op, dx, dy, glow, sg;

        // 1. Nebula clouds (bottom layer)
        nebs.forEach(function (n) {
          g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx);
          g.addColorStop(0, 'rgba(' + n.hue + ',' + n.op + ')');
          g.addColorStop(1, 'rgba(' + n.hue + ',0)');
          ctx.save();
          ctx.scale(1, n.ry / n.rx);
          ctx.beginPath();
          ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
          ctx.restore();
        });

        // 2. Light arc — sweeping diagonal like the reference
        drawLightArc(frame);

        // 3. Bokeh orbs — the warm magical glow spots
        bokeh.forEach(function (b) {
          pulse = b.op + Math.sin(frame * b.speed + b.phase) * 0.015;
          g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0,   'rgba(' + b.hue + ',' + Math.max(0, pulse) + ')');
          g.addColorStop(0.4, 'rgba(' + b.hue + ',' + Math.max(0, pulse * 0.4) + ')');
          g.addColorStop(1,   'rgba(' + b.hue + ',0)');
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        });

        // 4. Star field — twinkling
        stars.forEach(function (s) {
          t = s.op + Math.sin(frame * s.speed + s.phase) * 0.2;
          op = Math.max(0, Math.min(1, t));

          // Small glow on brighter stars
          if (s.r > 0.8 && op > 0.5) {
            g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
            g.addColorStop(0, 'rgba(' + s.r1 + ',' + s.g1 + ',' + s.b1 + ',' + (op * 0.25) + ')');
            g.addColorStop(1, 'rgba(' + s.r1 + ',' + s.g1 + ',' + s.b1 + ',0)');
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + s.r1 + ',' + s.g1 + ',' + s.b1 + ',' + op + ')';
          ctx.fill();
        });

        // 5. Shooting stars
        maybeShoot();
        shooters = shooters.filter(function (s) { return s.life > 0; });
        shooters.forEach(function (s) {
          s.life -= s.decay;
          dx = Math.cos(s.angle) * s.len;
          dy = Math.sin(s.angle) * s.len;
          g = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
          g.addColorStop(0,   'rgba(240,200,120,' + (s.op * s.life) + ')');
          g.addColorStop(0.3, 'rgba(220,170,80,' + (s.op * s.life * 0.5) + ')');
          g.addColorStop(1,   'rgba(200,140,50,0)');
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + dx, s.y + dy);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // 6. Bright accent stars — large glowing focal points with cross-diffraction spikes
        var accents = [
          { x: canvas.width * 0.88, y: canvas.height * 0.12, r: 4,   pulse: 1.2 },
          { x: canvas.width * 0.08, y: canvas.height * 0.72, r: 3,   pulse: 0.9 },
          { x: canvas.width * 0.92, y: canvas.height * 0.65, r: 2.5, pulse: 1.5 },
          { x: canvas.width * 0.15, y: canvas.height * 0.18, r: 2,   pulse: 0.7 }
        ];

        accents.forEach(function (a) {
          glow = Math.sin(frame * a.pulse) * 0.4 + 0.6;

          // Outer glow
          g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 14);
          g.addColorStop(0,   'rgba(220,170,70,' + (0.5 * glow) + ')');
          g.addColorStop(0.2, 'rgba(200,140,50,' + (0.2 * glow) + ')');
          g.addColorStop(1,   'rgba(180,120,40,0)');
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r * 14, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r * glow, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,220,140,' + (0.9 * glow) + ')';
          ctx.fill();

          // Cross diffraction spikes
          ctx.save();
          ctx.globalAlpha = 0.3 * glow;
          var spikes = [[a.r * 18, 0], [0, a.r * 18]];
          spikes.forEach(function (spike) {
            var sdx = spike[0];
            var sdy = spike[1];
            sg = ctx.createLinearGradient(a.x - sdx, a.y - sdy, a.x + sdx, a.y + sdy);
            sg.addColorStop(0,   'rgba(220,170,70,0)');
            sg.addColorStop(0.5, 'rgba(240,200,120,0.8)');
            sg.addColorStop(1,   'rgba(220,170,70,0)');
            ctx.beginPath();
            ctx.moveTo(a.x - sdx, a.y - sdy);
            ctx.lineTo(a.x + sdx, a.y + sdy);
            ctx.strokeStyle = sg;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          });
          ctx.restore();
        });

        rafId = requestAnimationFrame(drawCosmos);
      }

      // --- Starfield initialization ---
      if (prefersReducedMotion()) {
        // If user prefers reduced motion, draw a single static frame
        resize();
        initCosmos();
        frame = 0.5; // mid-state for a nice static look
        // Draw once without scheduling next frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nebs.forEach(function (n) {
          var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx);
          g.addColorStop(0, 'rgba(' + n.hue + ',' + n.op + ')');
          g.addColorStop(1, 'rgba(' + n.hue + ',0)');
          ctx.save();
          ctx.scale(1, n.ry / n.rx);
          ctx.beginPath();
          ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
          ctx.restore();
        });
        drawLightArc(frame);
        bokeh.forEach(function (b) {
          var g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0,   'rgba(' + b.hue + ',' + b.op + ')');
          g.addColorStop(0.4, 'rgba(' + b.hue + ',' + (b.op * 0.4) + ')');
          g.addColorStop(1,   'rgba(' + b.hue + ',0)');
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        });
        stars.forEach(function (s) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + s.r1 + ',' + s.g1 + ',' + s.b1 + ',' + s.op + ')';
          ctx.fill();
        });
      } else {
        resize();
        initCosmos();
        drawCosmos();
      }

      /**
       * Canvas resize handler — resizes canvas and re-initializes cosmos
       * particles so they distribute across the new viewport size.
       */
      window.addEventListener('resize', function () {
        resize();
        initCosmos();
      });
    })();
  }


  /* ========================================================================
   * 2. BLOOM CARD SYSTEM
   *
   * Desktop: CSS handles hover expand via max-height transitions.
   *          JS manages pillar-line linkage (highlighting corresponding
   *          hero pillar lines when bloom cards are hovered).
   *
   * Mobile:  First tap expands the card (.tapped class).
   *          Second tap navigates to the link href.
   *          Uses touchend detection to distinguish tap from scroll.
   * ======================================================================== */

  (function initBloomCards() {
    var bloomCards = document.querySelectorAll('.bloom-card');
    if (!bloomCards.length) return;

    var pillarLines = document.querySelectorAll('.pillar-line');
    var isTouch = isTouchDevice();

    /**
     * Maps bloom card IDs to their corresponding pillar-line index
     * for the hover linkage system.
     */
    var bloomToPillarMap = {
      'bloom-becoming': 0,
      'bloom-building': 1,
      'bloom-philosophy': 2,
      'bloom-shop': 3
    };

    /**
     * Clears the linked-active class from all pillar lines.
     */
    function clearLinkedActive() {
      pillarLines.forEach(function (line) {
        line.classList.remove('linked-active');
      });
    }

    // Desktop: pillar-line linkage on hover
    bloomCards.forEach(function (card) {
      var cardId = card.id;
      var pillarIndex = bloomToPillarMap[cardId];

      // When hovering a bloom card, highlight the corresponding pillar line
      card.addEventListener('mouseenter', function () {
        clearLinkedActive();
        if (pillarIndex !== undefined && pillarLines[pillarIndex]) {
          pillarLines[pillarIndex].classList.add('linked-active');
        }
      });

      card.addEventListener('mouseleave', function () {
        clearLinkedActive();
      });
    });

    // Pillar lines: clicking a pillar-line activates the corresponding bloom card
    pillarLines.forEach(function (line, idx) {
      line.addEventListener('mouseenter', function () {
        clearLinkedActive();
        line.classList.add('linked-active');
        // Also trigger visual state on the matching bloom card
        bloomCards.forEach(function (card) {
          card.classList.remove('linked-active');
        });
        if (bloomCards[idx]) {
          bloomCards[idx].classList.add('linked-active');
        }
      });

      line.addEventListener('mouseleave', function () {
        clearLinkedActive();
        bloomCards.forEach(function (card) {
          card.classList.remove('linked-active');
        });
      });
    });

    // Mobile: tap-to-expand system
    if (isTouch) {
      bloomCards.forEach(function (card) {
        card.addEventListener('touchend', function (e) {
          // If this card is not yet tapped/expanded, expand it (prevent navigation)
          if (!card.classList.contains('tapped')) {
            e.preventDefault();
            // Close all other bloom cards first
            bloomCards.forEach(function (other) {
              if (other !== card) {
                other.classList.remove('tapped');
              }
            });
            card.classList.add('tapped');
          }
          // If already tapped, allow the default link navigation (second tap)
        });
      });

      // Tap outside bloom cards to collapse them
      document.addEventListener('touchend', function (e) {
        var tappedInsideBloom = false;
        bloomCards.forEach(function (card) {
          if (card.contains(e.target)) {
            tappedInsideBloom = true;
          }
        });
        if (!tappedInsideBloom) {
          bloomCards.forEach(function (card) {
            card.classList.remove('tapped');
          });
        }
      });
    }

    /* --- Pillar Card System (legacy 4-card grid, if present) --- */
    var pillarCards = document.querySelectorAll('.pillar-card');
    if (pillarCards.length && isTouch) {
      pillarCards.forEach(function (card) {
        card.addEventListener('touchend', function (e) {
          if (!card.classList.contains('active')) {
            e.preventDefault();
            pillarCards.forEach(function (other) {
              other.classList.remove('active');
            });
            card.classList.add('active');
          }
        });
      });
    }
  })();


  /* ========================================================================
   * 3. ROTATING MANTRA SYSTEM
   *
   * Targets: <p id="heroMantra">
   * Rotates through ~41 mantras on a 9-second interval.
   * Each transition uses a 1.2s CSS opacity fade.
   * ======================================================================== */

  (function initMantraSystem() {
    var mantraEl = document.getElementById('heroMantra');
    if (!mantraEl) return;

    /**
     * Complete mantra collection — organized by theme.
     * @type {string[]}
     */
    var mantras = [
      // Core brand voice
      'The work is not finished. Neither are you.',
      'Nothing is finished. Keep building.',
      'The pursuit is the point.',
      'Unfinished is not failure. It is forward.',
      'Every day. Every step. Every moment.',

      // Identity and becoming
      'You are not who you were. You are not yet who you will be. Keep going.',
      'The best version of you is still becoming.',
      "You don't have to be finished to be enough.",
      'You were made for more than standing still.',
      'Progress is not linear. Keep moving anyway.',
      'Becoming takes longer than you think and starts sooner than you know.',
      "What you're building matters \u2014 even when you can't see it yet.",
      'You are further along than you feel.',

      // Community and belonging
      "You don't have to become alone.",
      'The people around you are still becoming too.',
      "We are all unfinished. That's the point.",
      'A community of people who refused to stop.',
      "Show up for each other. That's the whole thing.",
      'The rink. The gym. The grind. The community. All of it matters.',

      // Athletic and pursuit
      'Every rep, every rep. Every day, every day.',
      "The ice doesn't care how you feel. Get on it anyway.",
      'Champions are made in the moments nobody watches.',
      'Rest is part of the work. So is showing up again.',
      'The comeback is always stronger than the setback.',
      'Train like it matters. It does.',
      'Fall seven times. Rise relentless.',
      'Your body knows more than your doubt does.',

      // Mindset and resilience
      'Discipline is just consistency with a longer view.',
      'Pressure reveals what you\'re made of. So does patience.',
      'Hard is not the same as impossible.',
      "You've survived every hard day so far. That's a perfect record.",
      "The gap between where you are and where you're going \u2014 that gap is sacred.",
      'Comparison is the thief of becoming. Stay in your lane.',
      'Do not despise small beginnings. They are still beginnings.',
      'The work whispers. The results eventually speak.',

      // Purpose and calling — subtle faith thread
      'Called to more. Moving toward it.',
      'You are not here by accident.',
      "There is a reason the pursuit won't let you go.",
      'Something in you knows this work is not finished.',
      "What you're chasing was placed in you on purpose.",
      'The hunger you feel for more \u2014 that was given to you for a reason.'
    ];

    var mantraIdx = Math.floor(Math.random() * mantras.length);

    /**
     * Transitions to a new mantra with a fade effect.
     * Adds .fade class (opacity: 0 via CSS transition), waits 1.2s,
     * swaps text, then removes .fade to fade back in.
     *
     * @param {number} idx - Index into the mantras array.
     */
    function showMantra(idx) {
      mantraEl.classList.add('fade');
      setTimeout(function () {
        mantraEl.textContent = mantras[idx];
        mantraEl.classList.remove('fade');
      }, 1200);
    }

    // Show first mantra immediately
    mantraEl.textContent = mantras[mantraIdx];

    // Rotate every 9 seconds (skip rotation if reduced motion is preferred)
    if (!prefersReducedMotion()) {
      setInterval(function () {
        mantraIdx = (mantraIdx + 1) % mantras.length;
        showMantra(mantraIdx);
      }, 9000);
    }
  })();


  /* ========================================================================
   * 4. NAV SCROLL HANDLER
   *
   * Adds .scrolled class to the <nav id="mainNav"> element when the
   * user scrolls past 60px. This triggers the CSS background transition
   * from transparent gradient to solid dark background.
   * ======================================================================== */

  (function initNavScroll() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;

    /**
     * Toggles the .scrolled class based on scroll position.
     */
    function handleScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set initial state in case page loads already scrolled
    handleScroll();
  })();


  /* ========================================================================
   * 5. SCROLL REVEAL
   *
   * Uses IntersectionObserver to fade in elements as they enter the
   * viewport. Targets: .give-card, .cause-card, .submit-box,
   * .category-card, and any element with [data-reveal].
   *
   * Each element gets a staggered transition delay based on its index
   * within its group.
   * ======================================================================== */

  (function initScrollReveal() {
    if (prefersReducedMotion()) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('revealed');
          // Once revealed, stop observing to avoid re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Homepage reveal targets
    var revealSelectors = [
      '.give-card',
      '.cause-card',
      '.submit-box',
      '[data-reveal]',
      '.scroll-reveal',
      '.manifesto-block'
    ];

    var revealElements = document.querySelectorAll(revealSelectors.join(','));
    revealElements.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 1.1s ease, transform 1.1s ease';
      observer.observe(el);
    });

    // Still Building page: category card reveal with staggered delays
    var categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.9s ease ' + (i * 0.12) + 's, transform 0.9s ease ' + (i * 0.12) + 's';
      observer.observe(el);
    });
  })();


  /* ========================================================================
   * 6. COOKIE CONSENT
   *
   * A minimal, localStorage-based cookie consent banner.
   * Looks for an element with id="cookieConsent" and a dismiss/accept
   * button inside it.
   *
   * localStorage key: 'relentless_cookie_consent'
   *   - 'accepted' = user has accepted, banner stays hidden
   * ======================================================================== */

  (function initCookieConsent() {
    var consentBanner = document.getElementById('cookie-consent-banner');
    if (!consentBanner) return;

    var STORAGE_KEY = 'relentless_cookie_consent';

    // If already accepted, keep the banner hidden
    if (localStorage.getItem(STORAGE_KEY) === 'accepted') {
      return;
    }

    // Show the banner (remove hidden attribute)
    consentBanner.removeAttribute('hidden');

    /**
     * Accepts cookies, hides the banner, and persists the choice.
     */
    function acceptCookies() {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      consentBanner.setAttribute('hidden', '');
    }

    // Accept button
    var acceptBtn = consentBanner.querySelector('[data-cookie-accept]');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }

    // Dismiss / close button (same behavior as accept for simplicity)
    var dismissBtn = consentBanner.querySelector('[data-cookie-dismiss]');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', acceptCookies);
    }
  })();


  /* ========================================================================
   * 7. NEWSLETTER / WAITLIST FORM
   *
   * Handles the email waitlist signup form.
   * Validates email format and GDPR consent checkbox before submission.
   *
   * Targets:
   *   - input#waitlistEmail
   *   - button#waitlistBtn
   *   - input#gdprConsent (checkbox, optional)
   * ======================================================================== */

  (function initWaitlistForm() {
    var form = document.querySelector('[data-klaviyo-form]');
    if (!form) return;
    var waitlistEmail = form.querySelector('input[type="email"]');
    var waitlistBtn = form.querySelector('button[type="submit"]');
    if (!waitlistBtn || !waitlistEmail) return;

    /**
     * Validates email format (basic check for @ and domain).
     * @param {string} email
     * @returns {boolean}
     */
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Handles waitlist form submission.
     * Validates email, checks GDPR consent if present, and provides
     * visual feedback on success.
     *
     * @param {Event} e - The click event.
     */
    function handleWaitlistSubmit(e) {
      e.preventDefault();
      var email = waitlistEmail.value.trim();

      // Validate email
      if (!email || !isValidEmail(email)) {
        waitlistEmail.style.borderColor = 'rgba(220,80,60,0.6)';
        waitlistEmail.placeholder = 'Please enter a valid email';
        waitlistEmail.value = '';
        setTimeout(function () {
          waitlistEmail.style.borderColor = '';
          waitlistEmail.placeholder = 'your@email.com';
        }, 3000);
        return;
      }

      // Check GDPR consent checkbox if present
      var gdprCheckbox = document.getElementById('gdprConsent');
      if (gdprCheckbox && !gdprCheckbox.checked) {
        // Highlight the consent area
        var consentLabel = gdprCheckbox.closest('label') || gdprCheckbox.parentElement;
        if (consentLabel) {
          consentLabel.style.color = 'rgba(220,80,60,0.8)';
          setTimeout(function () {
            consentLabel.style.color = '';
          }, 3000);
        }
        return;
      }

      // Success feedback (actual submission handled by Shopify form action or API)
      waitlistEmail.value = '';
      waitlistEmail.placeholder = "You're on the list. \u2713";
      waitlistEmail.style.borderColor = 'rgba(200,146,42,0.6)';
      waitlistBtn.textContent = 'Added';
      waitlistBtn.disabled = true;

      // Reset after a few seconds
      setTimeout(function () {
        waitlistEmail.placeholder = 'your@email.com';
        waitlistEmail.style.borderColor = '';
        waitlistBtn.textContent = 'Notify Me';
        waitlistBtn.disabled = false;
      }, 4000);
    }

    waitlistBtn.addEventListener('click', handleWaitlistSubmit);

    // Also handle Enter key in the email input
    waitlistEmail.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handleWaitlistSubmit(e);
      }
    });
  })();


  /* ========================================================================
   * 8. MOBILE NAVIGATION
   *
   * Hamburger menu toggle for mobile viewports.
   * Toggles .nav-open class on the nav and updates aria-expanded
   * on the hamburger button.
   *
   * Targets:
   *   - button#navHamburger (or [data-nav-toggle])
   *   - nav#mainNav (receives .nav-open class)
   *   - .nav-links (the menu that shows/hides)
   * ======================================================================== */

  (function initMobileNav() {
    var nav = document.getElementById('mainNav');
    var hamburger = document.getElementById('navHamburger') ||
                    document.querySelector('[data-nav-toggle]') ||
                    document.querySelector('.nav-hamburger');
    if (!nav || !hamburger) return;

    var mobileNav = document.getElementById('mobile-nav');

    /**
     * Toggles the mobile navigation open/closed state.
     * Updates aria-expanded for accessibility.
     */
    function toggleMobileNav() {
      var isOpen = hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (mobileNav) {
        mobileNav.classList.toggle('open', isOpen);
        mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      }

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      if (mobileNav) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileNav);

    // Close nav when a mobile nav link is clicked
    if (mobileNav) {
      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobileNav);
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        closeMobileNav();
      }
    });
  })();


  /* ========================================================================
   * 9. STILL BUILDING PAGE
   *
   * Handles the "We Are Still Building" community action pages:
   *   - Category card click opens a full-screen action page overlay
   *   - Close button / Escape key dismisses the overlay
   *   - Symbolic checkbox tracker (no login, no tracking — just intention)
   *
   * Targets:
   *   - .category-card[data-action] — cards that open action pages
   *   - .action-page#action-{id} — full-screen overlays
   *   - .action-close — close buttons within overlays
   *   - .tracker-check#check-{id} — symbolic checkboxes
   * ======================================================================== */

  (function initStillBuildingPage() {
    var actionPages = document.querySelectorAll('.action-page');
    if (!actionPages.length) return;

    /**
     * Opens an action page overlay by adding the .open class.
     * Locks body scroll while the overlay is visible.
     *
     * @param {string} id - The action category identifier (e.g. 'education').
     */
    function openAction(id) {
      var page = document.getElementById('action-' + id);
      if (page) {
        page.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    /**
     * Closes all open action page overlays and restores body scroll.
     */
    function closeAction() {
      actionPages.forEach(function (p) {
        p.classList.remove('open');
      });
      document.body.style.overflow = '';
    }

    /**
     * Toggles the symbolic checkbox for a category.
     * Purely visual — no data is sent or stored.
     *
     * @param {string} id - The category identifier.
     */
    function toggleCheck(id) {
      var check = document.getElementById('check-' + id);
      var text = document.getElementById('tracker-text-' + id);
      if (!check || !text) return;

      var isChecked = check.classList.toggle('checked');
      text.textContent = isChecked ? 'Done something? Keep going.' : 'I took one step today.';
      text.classList.toggle('checked-text', isChecked);
    }

    // Bind category cards — replace inline onclick with addEventListener
    var categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(function (card) {
      // Read the action id from the data-action-open attribute
      var actionId = card.getAttribute('data-action-open') || card.getAttribute('data-action');

      // Fallback: try to extract from the card's content or id
      if (!actionId) {
        // Look for a matching action page by checking all known categories
        var categories = ['education', 'health', 'community', 'sports'];
        categories.forEach(function (cat) {
          var heading = card.querySelector('.category-title');
          if (heading) {
            var text = heading.textContent.toLowerCase();
            if (cat === 'education' && text.indexOf('education') !== -1) actionId = cat;
            if (cat === 'health' && text.indexOf('health') !== -1) actionId = cat;
            if (cat === 'community' && text.indexOf('community') !== -1) actionId = cat;
            if (cat === 'sports' && (text.indexOf('sport') !== -1 || text.indexOf('youth') !== -1)) actionId = cat;
          }
        });
      }

      if (actionId) {
        // Remove any existing inline onclick attribute for CSP compliance
        card.removeAttribute('onclick');
        card.addEventListener('click', function () {
          openAction(actionId);
        });
      }
    });

    // Bind close buttons — replace inline onclick
    var closeButtons = document.querySelectorAll('.action-close');
    closeButtons.forEach(function (btn) {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', closeAction);
    });

    // Bind symbolic checkboxes — replace inline onclick
    var trackerChecks = document.querySelectorAll('.tracker-check');
    trackerChecks.forEach(function (check) {
      var checkId = check.id; // e.g. 'check-education'
      if (checkId && checkId.indexOf('check-') === 0) {
        var categoryId = checkId.replace('check-', '');
        check.removeAttribute('onclick');
        check.addEventListener('click', function () {
          toggleCheck(categoryId);
        });
      }
    });

    // Keyboard close — Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAction();
      }
    });
  })();


  /* ========================================================================
   * SMOOTH SCROLL FOR ANCHOR LINKS
   *
   * Intercepts clicks on links with href="#..." and smoothly scrolls
   * to the target element. Handles both homepage and subpage anchors.
   * ======================================================================== */

  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetSelector = anchor.getAttribute('href');
        if (!targetSelector || targetSelector === '#') return;

        var target = document.querySelector(targetSelector);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  })();


  /* ========================================================================
   * 11. CART DRAWER
   *
   * Slide-out cart panel triggered by [data-cart-open] button.
   * Overlay click and Escape key close the drawer.
   *
   * Targets:
   *   - [data-cart-open] — triggers open
   *   - .cart-drawer-overlay — backdrop
   *   - .cart-drawer-panel — slide panel
   *   - [data-cart-close] — close button
   * ======================================================================== */

  (function initCartDrawer() {
    var overlay = document.querySelector('.cart-drawer-overlay');
    var panel = document.querySelector('.cart-drawer-panel');
    var openBtns = document.querySelectorAll('[data-cart-open]');
    var closeBtns = document.querySelectorAll('[data-cart-close]');

    if (!overlay || !panel || openBtns.length === 0) return;

    function openCart() {
      overlay.classList.add('open');
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      overlay.classList.remove('open');
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', openCart);
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', closeCart);
    });

    overlay.addEventListener('click', closeCart);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        closeCart();
      }
    });
  })();

})();
