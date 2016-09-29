'use strict'

$(function() {
  var setBackgroundImage = function() {
    var randomIndex = Math.round(Math.random() * 24);
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

  $('#spotify-login-btn').click(function() {
    location.href = '//nostlgia.herokuapp.com/login'
  })

  setInterval(function() {
    var randomNumber = Math.random() * 1000
    $('#spotify-login-btn').css('background-color', "#"+((1<<24)*Math.random()|0).toString(16))
  }, 1000)

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