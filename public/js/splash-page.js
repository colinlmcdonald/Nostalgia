'use strict'


$(function() {
  var gifs = ['http://media4.giphy.com/media/32qAeAZG3iFjy/giphy.gif', 'http://media2.giphy.com/media/11iuRh95rGa7G8/giphy.gif', 'http://media2.giphy.com/media/ieMPmOadvWFqg/giphy.gif', 'https://media0.giphy.com/media/4oZpTY30l6XtK/giphy.gif', 'https://media2.giphy.com/media/11E9AooBL616Kc/giphy.gif', 'https://media1.giphy.com/media/10vlI8UFCVTqCc/giphy.gif', 'https://media3.giphy.com/media/ibtOIPpP6kBX2/giphy.gif', 'http://media3.giphy.com/media/l2JdT9LcOhSK2dhAc/giphy.gif', 'https://media2.giphy.com/media/7uVl7ovt8sXT2/giphy.gif', 'https://media4.giphy.com/media/XmA3srjoDGXzW/giphy.gif', 'https://media3.giphy.com/media/fnmJdRPTxlOXC/giphy.gif', 'http://media0.giphy.com/media/3orifit3M8XcjC0YmY/giphy.gif', 'https://media2.giphy.com/media/Gg5e1pain7MOI/giphy.gif', 'http://media1.giphy.com/media/3orif6doWBydBzzGj6/giphy.gif', 'https://media1.giphy.com/media/efzsFKbCGB5io/giphy.gif', 'https://media0.giphy.com/media/MblbgKyC3cCIM/giphy.gif','https://media3.giphy.com/media/VnXzhpvUo0eRO/giphy.gif', 'http://media2.giphy.com/media/3oszKwQOeGASATyeyI/giphy.gif', 'http://media3.giphy.com/media/3oszKuNHx6l5hASXIY/giphy.gif', 'http://media1.giphy.com/media/Rjz8xl9WlMgXC/giphy.gif', 'http://media1.giphy.com/media/V3YYmQqvwmRWM/giphy.gif', 'http://media4.giphy.com/media/S7ZifwZ6xzuFy/giphy.gif', 'http://media1.giphy.com/media/4LTGEdPueINFzycY1Ixq/giphy.gif', 'http://media4.giphy.com/media/6Y6DJB68J9edq/giphy.gif'];
  var gifs2 = [];
  var setBackgroundImage = function() {
    var randomIndex = Math.floor(Math.random() * gifs.length);
    if (!gifs.length) {
      gifs = gifs2.splice(0)
    }
    $('#splash-page-img').css({
      'background': `linear-gradient(
        rgba(0, 0, 0, 0.8), 
        rgba(0, 0, 0, 0.8)
        ),
        url(${gifs[randomIndex]})`,
      'background-repeat': 'no-repeat',
      'background-size': 'cover'
    })
    gifs2.push(gifs.splice(randomIndex, 1)[0])
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