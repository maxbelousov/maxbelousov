"use strict";

var $ = jQuery;

function collapse(item) {
  item.animate({
    height: 0
  }, 300);
}

function expand(item) {
  item.css('height', 'auto');
  var height = item.height();
  item.css('height', 0).animate({
    height: height
  }, 300, function () {
    item.css('height', 'auto');
  });
}

function setScrollHeader() {
  var st = $(window).scrollTop();

  if (st > 0) {
    $('.header').addClass('has-scroll');
  } else {
    $('.header').removeClass('has-scroll');
  }
}

;

function getImgSliderSlide(imgPath) {
  return '<div class="swiper-slide"><a class="img-slide" data-fancybox href="' + imgPath + '"><div class="img-slide__bg"></div><div class="img-slide__main" data-swiper-parallax-opacity="0.2"><div class="img-slide__img left"><img src="' + imgPath + '"></div><div class="img-slide__img right"><img src="' + imgPath + '"></div></div></a></div>';
}

$(function () {
  $('.pcard__toggle').click(function (e) {
    e.preventDefault();
    var pcard = $(this).closest('.pcard');
    var content = pcard.find('.pcard__content');
    var isActive = pcard.hasClass('is-active');
    pcard.toggleClass('is-active');

    if (isActive) {
      collapse(content);
    } else {
      expand(content);
    }
  });
  var bannersSlider = new Swiper('.banners-slider', {
    speed: 600,
    parallax: true,
    autoplay: {
      delay: 10000
    },
    pagination: {
      el: '.banners-slider__pagination',
      type: 'bullets',
      clickable: true
    }
  });
  var examplesSlider = new Swiper('.examples-slider', {
    speed: 600,
    parallax: true,
    spaceBetween: 20,
    navigation: {
      nextEl: '.examples-slider__next',
      prevEl: '.examples-slider__prev'
    },
    on: {
      init: function init() {
        $('.examples-slider__count').html(this.slides.length);
      },
      slideChange: function slideChange(e) {
        $('.examples-slider__current').html(e.activeIndex + 1);
      }
    },
    breakpoints: {
      1200: {
        spaceBetween: 30
      }
    }
  });
  var imgSlider = new Swiper('.img-slider', {
    speed: 600,
    parallax: true,
    spaceBetween: 12,
    navigation: {
      nextEl: '.img-slider__next',
      prevEl: '.img-slider__prev'
    },
    on: {
      init: function init() {
        $('.img-slider__count').html(this.slides.length);
      },
      slideChange: function slideChange(e) {
        $('.img-slider__current').html(e.activeIndex + 1);
      }
    },
    breakpoints: {
      1200: {
        spaceBetween: 30
      }
    }
  });
  $('.js-open-slider-modal').click(function (e) {
    e.preventDefault();
    var modal = $(this).attr('data-modal');
    var title = $(this).attr('data-title');
    var img = $(this).attr('data-img');
    var images = img.split(', ');
    var slides = images.map(function (image) {
      return getImgSliderSlide(image);
    });

    if (title) {
      $(modal).find('.slider-modal__title').html(title);
    }

    imgSlider.removeAllSlides();
    imgSlider.appendSlide(slides);
    imgSlider.update();
    $('.img-slider__count').html(images.length);
    $(modal).addClass('is-active');
  });
  $('.js-open-modal').click(function (e) {
    e.preventDefault();
    var modal = $(this).attr('data-modal');
    var title = $(this).attr('data-title');
    var service = $(this).attr('data-service');
    var btn = $(this).attr('data-btn');

    if (title) {
      $(modal).find('.modal-form__title').html(title);
    }

    if (service) {
      $(modal).find('input[name="service"]').val(service);
    }

    if (btn) {
      $(modal).find('.modal-form__submit .btn').html(btn);
    }

    $(modal).addClass('is-active');
  });
  $('.js-close-modal').click(function (e) {
    e.preventDefault();
    $(this).closest('.modal').removeClass('is-active');
  });
  $('.js-order-form').submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log({
      formData: formData
    });
    $('#order-modal.is-active').removeClass('is-active');
    $('#thanks-modal').addClass('is-active');
  });
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $('.modal.is-active').removeClass('is-active');
      $('.menu-active').removeClass('menu-active');
    }
  });
  setScrollHeader();
  $(window).scroll(function () {
    setScrollHeader();
  });
  $('.js-menu-toggle').click(function (e) {
    e.preventDefault();
    $('.header').toggleClass('menu-active');
  });
  $('.js-anchor').click(function (e) {
    e.preventDefault();
    var top = $($(this).attr('href')).offset().top - 100;
    $('.menu-active').removeClass('menu-active');
    $('html, body').animate({
      scrollTop: top
    }, 500);
  });
  $().fancybox({
    selector: '[data-fancybox]',
    animationEffect: "zoom-in-out",
    buttons: ["zoom", "close"]
  });
  $('[type="phone"]').mask("8 (999) 999-99-99");
});
//# sourceMappingURL=main.js.map
