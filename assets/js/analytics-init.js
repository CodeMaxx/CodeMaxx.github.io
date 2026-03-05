window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

var gaScript = document.querySelector('script[data-ga-id]');
if (gaScript) {
  gtag('config', gaScript.getAttribute('data-ga-id'));
}
