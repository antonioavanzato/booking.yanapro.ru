/* YanaPro booking widget loader.
   Вставка на wfolio:
   <div id="yp-booking"></div>
   <script src="https://antonioavanzato.github.io/booking.yanapro.ru/embed.js" defer></script>
*/
(function () {
  'use strict';
  var ORIGIN = 'https://antonioavanzato.github.io';
  var PAGE = ORIGIN + '/booking.yanapro.ru/?embed=1';

  var script = document.currentScript;
  var mount = document.getElementById('yp-booking');
  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'yp-booking';
    if (script && script.parentNode) script.parentNode.insertBefore(mount, script);
    else document.body.appendChild(mount);
  }
  if (mount.getAttribute('data-yp-loaded')) return;
  mount.setAttribute('data-yp-loaded', '1');

  var iframe = document.createElement('iframe');
  iframe.src = PAGE;
  iframe.title = 'Онлайн-запись на тренировку — Яна Самойлова';
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('scrolling', 'no');
  iframe.style.cssText = 'width:100%;border:0;display:block;height:1100px;overflow:hidden;';
  mount.appendChild(iframe);

  window.addEventListener('message', function (e) {
    if (e.origin !== ORIGIN || e.source !== iframe.contentWindow) return;
    var d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === 'yp-booking-height' && typeof d.height === 'number' && d.height > 0) {
      iframe.style.height = Math.ceil(d.height) + 'px';
    } else if (d.type === 'yp-booking-scroll-top') {
      var top = iframe.getBoundingClientRect().top + window.pageYOffset - 16;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }
  });
})();
