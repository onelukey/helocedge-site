/* HE-030B.10A: analytics opt-in only. Not a Google-certified advertising CMP. */
(function () {
  'use strict';
  var key = 'he_home_analytics_consent_v1'; // Keep existing homepage preferences.
  var id = 'G-9RLKEB7GMX';
  var panel = document.getElementById('he-consent');
  var settings = document.getElementById('he-consent-settings');
  if (!panel || !settings) return;
  var loaded = false;
  function read() { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(key, v); } catch (e) {} }
  function start() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  function apply(choice) {
    panel.hidden = true;
    settings.hidden = false;
    if (choice === 'accept') start();
    if (choice === 'reject' && loaded) location.reload();
  }
  document.getElementById('he-accept').addEventListener('click', function () { write('accept'); apply('accept'); });
  document.getElementById('he-reject').addEventListener('click', function () { write('reject'); apply('reject'); });
  settings.addEventListener('click', function () { panel.hidden = false; settings.hidden = true; document.getElementById('he-reject').focus(); });
  var saved = read();
  if (saved === 'accept' || saved === 'reject') apply(saved);
  else panel.hidden = false;
})();
