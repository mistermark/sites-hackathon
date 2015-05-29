(function(){

  'use strict';

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

  // Main
  _loadJSON('content/index.json', function (sections) {
    document.addEventListener('DOMContentLoaded', function() {
  //     Object.keys(sections).forEach(function(section){
  //       var tmpl = MyApp.templates[section + '-tmpl'];
  //       if (tmpl) {
  //         document.getElementById(section).innerHTML = tmpl(sections[section]);
  //       }
  //
        // Timer
        var startDate = sections.agenda.days[0].date;
        var targetDate = new Date(startDate.month + ', ' + startDate.day + ', ' + startDate.year).getTime();
        var countdownTimer = document.getElementById('countdown-clock');
        var countdownCounter = document.getElementById('countdown');

        if (countdownCounter && countdownTimer) {
          setInterval(function () {
            var tl = timeLeft(targetDate);
            countdownCounter.innerHTML = tl.days +  ' days ' +
              tl.hours + ' hours ' +
              tl.minutes + ' minutes and ' +
              tl.seconds + ' seconds';
            countdownTimer.innerHTML = '<span>' + tl.days +  ' days</span>' +
              '<span>' + tl.hours + ' hours</span>' +
              '<span>' + tl.minutes + ' minutes</span>' +
              '<span>' + tl.seconds + ' seconds</span>';
          }, 500);
        }
      // });
  //
  //     document.getElementsByTagName("body")[0].style.display=null;
    });
  });
})();
