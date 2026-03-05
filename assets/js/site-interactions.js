document.addEventListener('DOMContentLoaded', function() {
  // Facebook share popup
  var fbLinks = document.querySelectorAll('.share a.facebook');
  fbLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(
        'https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href),
        'facebook-share-dialog',
        'width=626,height=436'
      );
    });
  });

  // Obfuscated email links
  var emailLinks = document.querySelectorAll('a[data-email-user]');
  emailLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      location.href = 'mailto:' + link.getAttribute('data-email-user') + '@' + link.getAttribute('data-email-domain');
    });
  });
});
