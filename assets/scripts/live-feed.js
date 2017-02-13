(function(){
  // Main
  document.addEventListener('DOMContentLoaded', function() {

    $('.slick-maximize').on('click', function() {
      _slickResize('maximize');
    });

    $('.slick-normalize').on('click', function() {
      _slickResize('normalize');
    });

    $('.slick-stop').on('click', function() {
      _stopRefreshPagetime('stop');
    });
    $('.slick-start').on('click', function() {
      _setRefreshPageTime();
    });

    if(window.location.search.indexOf('time=') > -1) {
      $('.slick-maximize').click();
    }

    if (config.countdownClock && config.stopCounting !== true) {
      _initClock();
    }

    _setRefreshPageTime();

  });

})();
