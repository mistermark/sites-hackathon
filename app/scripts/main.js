(function(){

  'use strict';

  var config = {
    "date": {
      "title": "Day 1",
      "day": 24,
      "month": "Jun",
      "year": "2016",
      "sup": "th"
    }
  }

  // Spit HTML coming from contents.json
  // Handlebars.registerHelper('strip-scripts', function(context) {
  //   return new Handlebars.SafeString(context);
  // });

  // Countdown
  function timeLeft(targetDate) {
    var currentDate = new Date().getTime(),
        secondsLeft = (targetDate - currentDate) / 1000,
        result = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };

    result.days = parseInt(secondsLeft / 86400);
    secondsLeft = secondsLeft % 86400;
    result.hours = parseInt(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;
    result.minutes = parseInt(secondsLeft / 60);
    result.seconds = parseInt(secondsLeft % 60);

    return result;
  }

  // Get JSON
  function _loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType('application/json');
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4 && xobj.status === 200) {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);
  }

  function _setTimerHtml(obj, tl) {
    obj.innerHTML = '<span>' + tl.days +  ' days</span>, ' +
      '<span>' + tl.hours + ' hours</span>, ' +
      '<span>' + tl.minutes + ' minutes</span>, ' +
      '<span>' + tl.seconds + ' seconds</span>';
  }

  function _getWindowSize(cb) {

    $('#video-carousel').width(window.innerWidth);
    $('#video-carousel').height(window.innerHeight);

    if(cb) {
      cb();
    }

  }

  // Main
  document.addEventListener('DOMContentLoaded', function() {

    if(document.getElementById('countdown-clock') || document.getElementById('countdown')) {
      console.log(document.getElementById('countdown-clock'));
      var startDate = config.date;
      var targetDate = new Date(startDate.month + ', ' + startDate.day + ', ' + startDate.year).getTime();
      var countdownTimer = document.getElementById('countdown-clock');
      var countdownCounter = document.getElementById('countdown');

      var tl = timeLeft(targetDate);
      if (countdownCounter) {
        _setTimerHtml(countdownCounter, tl);
      }
      if (countdownTimer) {
        _setTimerHtml(countdownTimer, tl);
      }
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
