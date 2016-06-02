(function(){

  'use strict';

  var config = {
    'countdownClock': document.getElementsByClassName('countdown-clock'),
    'date': [{
      'name': 'Day 1',
      'time': '09:00',
      'day': 24,
      'month': 'June',
      'year': '2016',
      'sup': 'th'
    },{
      'name': 'Day 2',
      'time': '09:00',
      'day': 25,
      'month': 'June',
      'year': '2016',
      'sup': 'th'
    }]
  };

  // function _getWindowSize(cb) {
  //
  //   $('#video-carousel').width(window.innerWidth);
  //   $('#video-carousel').height(window.innerHeight);
  //
  //   if(cb) {
  //     cb();
  //   }
  //
  // }

  // Countdown
  var _timeRemaining = function(startDate) {
    var targetDate = Date.parse(startDate.time +' '+ startDate.day +' '+ startDate.month +' '+ startDate.year) - Date.parse(new Date());

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

  // Main
  document.addEventListener('DOMContentLoaded', function() {

    if (config.countdownClock) {
      _initClock();
    }

    // _getWindowSize(function() {
    //   $('#video-carousel').slidesjs({
    //     navigation: {
    //       active: false
    //     },
    //     play: {
    //       auto: true,
    //       interval: 6400
    //     },
    //     effect: {
    //       slide: {
    //         speed: 2400
    //       }
    //     },
    //     width: 960,
    //     height: 540
    //   });
    // });



  });
})();
