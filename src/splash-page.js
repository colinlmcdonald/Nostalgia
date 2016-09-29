'use strict'

$(function() {
  var setBackgroundImage = function() {
    var randomIndex = Math.floor(Math.random() * 24);
    $('#splash-page-img').css({
      'background': `linear-gradient(
        rgba(0, 0, 0, 0.8), 
        rgba(0, 0, 0, 0.8)
        )`,
      'background-image': `url(images/gif-${randomIndex}.gif)`,
      'background-repeat': 'no-repeat',
      'background-size': 'cover'
    })
  };
  setBackgroundImage();
  setInterval(function() {
    setBackgroundImage();
  }, 5000)

  var el = document.getElementById('spotify-login-btn');
  el.onclick = function() {
    location.href = '//localhost:3000/login'
  }
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});