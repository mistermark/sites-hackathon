/* globals channels, slickOpts */
(function(){

  'use strict';

  var config = {
    'countdownClock': document.getElementsByClassName('countdown-clock'),
    'stopCounting': true,
    'date': [{
      'name': 'Day 1',
      'time': '09:00',
      'day': '24',
      'month': 'June',
      'year': '2016',
      'sup': 'th'
    },{
      'name': 'Day 2',
      'time': '09:00',
      'day': '25',
      'month': 'June',
      'year': '2016',
      'sup': 'th'
    }]
  };

  var _epochTime = function() {
    var date = new Date();
    return Math.floor( date.getTime() / 1000 );
  };

  var _setRefreshPageTime = function() {
    var epoch = _epochTime();
    console.log(epoch);
  };

  // Countdown
  var _timeRemaining = function(startDate) {
    var targetDate = Date.parse(startDate.day +' '+ startDate.month +' '+ startDate.year +' '+ startDate.time) - Date.parse(new Date());

    var seconds = Math.floor( (targetDate/1000) % 60);
    var minutes = Math.floor( (targetDate/1000/60) % 60 );
    var hours = Math.floor( (targetDate/(1000*60*60)) % 24 );
    var days = Math.floor( targetDate/(1000*60*60*24) );

    return {
      'total': targetDate,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  var _initClock = function() {
    var clock = config.countdownClock;

    var _updateClock = function() {
      var t = _timeRemaining(config.date[0]);

      for (var i = 0; i < clock.length; i++) {
        clock[i].querySelector('.days').innerHTML = t.days;
        clock[i].querySelector('.hours').innerHTML = t.hours;
        clock[i].querySelector('.minutes').innerHTML = t.minutes;
        clock[i].querySelector('.seconds').innerHTML = t.seconds;
      }

      if(t.total<=0) {
        clearInterval(timeInterval);
      }
    };

    _updateClock();
    var timeInterval = setInterval(_updateClock, 1000);
  };

  var _resizeIframe = function(target, cb) {
    switch (target) {
      case 'maximize':
          $('html').addClass('livestream-fullscreen');
          $('.livestream-carousel').not('.slick-initialized').slick('reInit');
        break;
      default:
          $('html').removeClass('livestream-fullscreen');
          $('.livestream-carousel').not('.slick-initialized').slick('reInit');
        break;
    }

    if(cb) {
      cb();
    }
  };

  var _slickResize = function(target) {
    _resizeIframe(target, function() {
      $('.livestream-iframe').each(function(i, obj) {
        var url = obj.src + '&uid='+ _epochTime();
        obj.src = url;
      });
    });
  };

  window._initLivestreams = function(channel) {
    console.log('Initialize LiveStreams');

    if(channel.offline !== 'true' && channel.test !== 'true') {
      var iframeHtml = '<iframe class="livestream-iframe" width="640" height="385" src="http://cdn.livestream.com/embed/{channelName}?layout=4&color=0x000000&autoPlay=true&mute=true&iconColorOver=0xe7e7e7&iconColor=0xcccccc&allowchat=false&height=385&width=640" style="border:0;outline:0" frameborder="0" scrolling="no"></iframe>';
      var placeholder = 'livestream-iframe-placeholder';

      var _renderIframe = function(channelName) {
        return iframeHtml.replace('{channelName}', channelName);
      };

      var channelSlide = document.getElementById('channel-'+ channel.name);
      channelSlide.getElementsByClassName(placeholder)[0].innerHTML = _renderIframe(channel.name);
    }

  };

  // Main
  document.addEventListener('DOMContentLoaded', function() {

    $('.slick-maximize').on('click', function() {
      _slickResize('maximize');
    });

    $('.slick-normalize').on('click', function() {
      _slickResize('normalize');
    });

    if (config.countdownClock && config.stopCounting !== true) {
      _initClock();
    }

    _setRefreshPageTime();

  });

})();
