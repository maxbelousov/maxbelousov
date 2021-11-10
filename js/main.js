"use strict";

var $ = jQuery;
var nextArrow = '<svg><use xlink:href="/img/sprites/symbol/sprite.svg#right-arrow"></use></svg>';
var prevArrow = '<svg><use xlink:href="/img/sprites/symbol/sprite.svg#left-arrow"></use></svg>';
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $(".header").addClass("has-scroll");
    } else {
      $(".header").removeClass("has-scroll");
    }
  });
  $(".js-toggle-mobile-menu").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("mobile-menu-active");
  });
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $("body").removeClass("mobile-menu-active");
    }
  });
  document.querySelectorAll("pre code").forEach(function (block) {
    hljs.highlightBlock(block);
  });
  $(".code-card__content").mCustomScrollbar();
  $('.thumbs-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.thumbs-slider-counter span').html(nextSlide + 1);
  });
  $('.thumbs-slider').slick({
    arrows: true,
    dots: false,
    slidesToShow: 4,
    infinite: false,
    prevArrow: '<button class="control-btn prev">' + prevArrow + '</button>',
    nextArrow: '<button class="control-btn next">' + nextArrow + '</button>',
    responsive: [{
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        variableWidth: true
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        variableWidth: true
      }
    }]
  });
  $('[data-fancybox]').fancybox({
    loop: true,
    animationEffect: false,
    animationDuration: 0,
    afterClose: function afterClose() {
      if ($(window).scrollTop() > 20) {
        $(".header").addClass("has-scroll");
      } else {
        $(".header").removeClass("has-scroll");
      }
    },
    buttons: ["zoom", "close"],
    infobar: false,
    btnTpl: {
      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
      zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg><use xlink:href="/img/sprites/symbol/sprite.svg#zoom"></use></svg></button>',
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' + prevArrow + '</button>',
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' + nextArrow + '</button>'
    }
  }); //code modal

  $('.code-card__link').click(function (e) {
    e.preventDefault();
    var modal = $($(this).attr('href'));
    var code = $(this).parents('.code-card').find('pre').clone();
    modal.find('.code-modal__content').html(code);
    modal.addClass('is-active');
    console.log({
      modal: modal
    });
    console.log({
      code: code
    });
    $('html').addClass('code-modal-active');
  });
  $('.js-code-modal-close').click(function (e) {
    e.preventDefault();
    $(this).closest('.code-modal').removeClass('is-active');
    $('html').removeClass('code-modal-active');
  });
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      $('html').removeClass('code-modal-active').removeClass('modal-active');
      $('.code-modal.is-active').removeClass('is-active');
      $('.modal.is-active').removeClass('is-active');
    }
  });

  if ($('#map').length) {
    var init = function init() {
      var mapOptions = {
        zoom: 11,
        fullscreenControl: false,
        center: new google.maps.LatLng(59.942015, -30.344885),
        styles: [{
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e9e9e9"
          }, {
            "lightness": 17
          }]
        }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }, {
            "lightness": 20
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 17
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 29
          }, {
            "weight": 0.2
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 18
          }]
        }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }, {
            "lightness": 16
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }, {
            "lightness": 21
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dedede"
          }, {
            "lightness": 21
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "visibility": "on"
          }, {
            "color": "#ffffff"
          }, {
            "lightness": 16
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "saturation": 36
          }, {
            "color": "#333333"
          }, {
            "lightness": 40
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f2f2f2"
          }, {
            "lightness": 19
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#fefefe"
          }, {
            "lightness": 20
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#fefefe"
          }, {
            "lightness": 17
          }, {
            "weight": 1.2
          }]
        }]
      };
      var mapElement = document.getElementById('map');
      var map = new google.maps.Map(mapElement, mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(59.942015, -30.344885),
        map: map,
        title: 'Dolmen',
        icon: '../img/map-marker.svg'
      });
    };

    google.maps.event.addDomListener(window, 'load', init);
  }

  $('.js-anchor').click(function (e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 600);
  });
  initLangSelect();
  initModals();
  initModalForm();
}); //masonry grid

function resizeGridItem(item) {
  var grid = document.getElementsByClassName("masonry")[0];
  var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
  var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"));
  var rowSpan = Math.ceil((item.querySelector(".masonry__item-content").getBoundingClientRect().height + 25) / rowHeight);
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  var allItems = document.getElementsByClassName("masonry__item");

  for (var x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  var item = instance.elements[0];
  resizeGridItem(item);
}

function initLangSelect() {
  $('.lang-select__toggle').click(function (e) {
    e.preventDefault();
    $(this).closest('.lang-select').toggleClass('is-active');
  });
  $(document).click(function (event) {
    var $target = $(event.target);

    if (!$target.closest('.lang-select.is-active').length) {
      $('.lang-select.is-active').removeClass('is-active');
    }
  });
}

function initModals() {
  $('.js-open-modal').click(function (e) {
    e.preventDefault();
    $($(this).attr('data-modal')).addClass('is-active');
    $('html').addClass('modal-active');
  });
  $('.js-close-modal').click(function (e) {
    e.preventDefault();
    $(this).closest('.modal').removeClass('is-active');
    $('html').removeClass('modal-active');
  });
}

function initModalForm() {
  $('.modal-form__options input[type="checkbox"]').change(function () {
    var form = $(this).closest('.modal-form');

    if (form.find('.modal-form__options input[type="checkbox"]:checked').length !== 0) {
      form.addClass('is-active');
    } else {
      form.removeClass('is-active');
    }
  });
}

window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);
//# sourceMappingURL=main.js.map
