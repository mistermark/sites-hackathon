$(document).ready(function(){
  $('.photos-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.photos',
    lazyLoad: 'ondemand'
  });
  $('.photos').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.photos-main',
    focusOnSelect: true,
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 2000
  });
});
