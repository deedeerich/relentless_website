/**
 * RELENTLESS — Theme JavaScript
 * Minimal, accessible, no frameworks.
 */

(function () {
  'use strict';

  /**
   * Cookie consent banner — GDPR/CCPA compliance.
   * Shows banner if user hasn't accepted. Stores preference in localStorage.
   */
  function initCookieConsent() {
    var banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;

    var accepted = localStorage.getItem('relentless_cookie_consent');
    if (accepted === 'true') {
      banner.setAttribute('hidden', '');
      return;
    }

    banner.removeAttribute('hidden');

    var acceptBtn = banner.querySelector('[data-cookie-accept]');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem('relentless_cookie_consent', 'true');
        banner.setAttribute('hidden', '');
      });
    }
  }

  /**
   * Accessible mobile navigation toggle.
   */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav-menu]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.setAttribute('aria-hidden', String(expanded));
    });
  }

  /**
   * Newsletter form — double opt-in messaging.
   */
  function initNewsletterForm() {
    var forms = document.querySelectorAll('[data-newsletter-form]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var consent = form.querySelector('[data-gdpr-consent]');
        if (consent && !consent.checked) {
          e.preventDefault();
          var msg = form.querySelector('[data-consent-error]');
          if (msg) {
            msg.textContent = 'Please agree to receive emails before subscribing.';
            msg.removeAttribute('hidden');
          }
        }
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initCookieConsent();
    initMobileNav();
    initNewsletterForm();
  }
})();
