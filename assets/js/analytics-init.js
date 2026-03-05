window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

var gaId = document.currentScript && document.currentScript.getAttribute('data-ga-id');
if (gaId) {
  gtag('config', gaId);
}
