(function() {
  var el = document.getElementById('disqus_thread');
  if (!el) return;
  var shortname = el.getAttribute('data-disqus-shortname');
  if (!shortname) return;
  window.disqus_shortname = shortname;
  window.disqus_developer = 0;
  var dsq = document.createElement('script');
  dsq.async = true;
  dsq.src = 'https://' + shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();
