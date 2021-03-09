"use strict";

var $ = jQuery;
var nextArrow = '<svg><use xlink:href="/img/sprites/symbol/sprite.svg#chevron-right"></use></svg>';
var prevArrow = '<svg><use xlink:href="/img/sprites/symbol/sprite.svg#chevron-left"></use></svg>';
var nextArrow2 = '<svg><use xlink:href="/img/sprites/symbol/sprite.svg#right-arrow"></use></svg>';
var prevArrow2 = '<svg><use xlink:href="/img/sprites/symbol/sprite.svg#left-arrow"></use></svg>';

function drags(dragElement, resizeElement, container) {
  dragElement.on("mousedown vmousedown", function (e) {
    dragElement.addClass('ba-draggable');
    resizeElement.addClass('ba-resizable');
    var dragWidth = dragElement.outerWidth(),
        xPosition = dragElement.offset().left + dragWidth - e.pageX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth(),
        minLeft = containerOffset + 10,
        maxLeft = containerOffset + containerWidth - dragWidth - 10;
    dragElement.parents().on("mousemove vmousemove", function (e) {
      var leftValue = e.pageX + xPosition - dragWidth; //constrain the draggable element to move inside its container

      if (leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }

      var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';
      $('.ba-draggable').css('left', widthValue).on("mouseup vmouseup", function () {
        $(this).removeClass('ba-draggable');
        resizeElement.removeClass('ba-resizable');
      });
      $('.ba-resizable').css('width', widthValue);
    }).on("mouseup vmouseup", function (e) {
      dragElement.removeClass('ba-draggable');
      resizeElement.removeClass('ba-resizable');
    });
    e.preventDefault();
  }).on("mouseup vmouseup", function (e) {
    dragElement.removeClass('ba-draggable');
    resizeElement.removeClass('ba-resizable');
  });
}

function setCompareImagesWidth() {
  $.each($('.cd-image-container'), function (k, v) {
    var w = $(v).width();
    $(v).find('.cd-resize-img__bg').width(w);
  });
}

function showNotification(text, type) {
  var color = 'linear-gradient(45deg, #92cf47, #56ab2f)';

  if (type === 'danger') {
    color = 'linear-gradient(45deg, #e52d27, #b31217)';
  }

  Toastify({
    text: text,
    duration: 3000,
    //close: true,
    gravity: "top",
    position: "center",
    backgroundColor: color,
    stopOnFocus: true
  }).showToast();
}

$(function () {
  $('.cd-image-container').each(function () {
    var actual = $(this);
    drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual);
  });
  setCompareImagesWidth();
  $(window).resize(setCompareImagesWidth);
  tippy('.tippy', {
    content: function content(reference) {
      var id = reference.getAttribute('data-template');
      console.log({
        reference: reference
      });
      console.log({
        id: id
      });
      var template = document.getElementById(id);
      console.log({
        template: template
      });
      return template.innerHTML;
    },
    allowHTML: true,
    placement: 'bottom',
    theme: 'light'
  });
  $('.js-tabs-nav a').click(function (e) {
    e.preventDefault();

    if ($(this).hasClass('is-active')) {
      return;
    }

    $(this).addClass('is-active').siblings().removeClass('is-active');
    $($(this).attr('href')).addClass('is-active').siblings().removeClass('is-active');
  });
  $('.js-slider-1').slick({
    arrows: true,
    dots: false,
    slidesToShow: 1,
    infinite: true,
    prevArrow: '<button class="control-btn prev">' + prevArrow + '</button>',
    nextArrow: '<button class="control-btn next">' + nextArrow + '</button>'
  });
  $('.js-banners-slider').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1
  });
  $('.js-photo-slider').slick({
    arrows: true,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    prevArrow: '<button class="control-btn prev">' + prevArrow2 + '</button>',
    nextArrow: '<button class="control-btn next">' + nextArrow2 + '</button>',
    responsive: [{
      breakpoint: 1199,
      settings: {
        arrows: false
      }
    }, {
      breakpoint: 767,
      settings: "unslick"
    }]
  }); //mobile menu

  $('.menu__nav  .has-submenu > a').click(function (e) {
    e.preventDefault();
    $(this).parent().addClass('is-active').siblings().removeClass('is-active');
    $(this).closest('.menu__nav').addClass('submenu-active');
  });
  $('.menu__nav  .back').click(function (e) {
    e.preventDefault();
    $(this).closest('li').removeClass('is-active');
    $(this).closest('.menu__nav').removeClass('submenu-active');
  });
  $('.js-close-menu').click(function (e) {
    e.preventDefault();
    $('.menu').removeClass('is-active');
    $('body').removeClass('menu-active');
  });
  $('.js-open-menu').click(function (e) {
    e.preventDefault();
    $('.menu').addClass('is-active');
    $('body').addClass('menu-active');
  });
  $('.table-3__head-toggle, .table-4__head-toggle').click(function (e) {
    e.preventDefault();
    var type = $(this).attr('data-type');
    $("[data-type=\"".concat(type, "\"]")).toggleClass('is-active');
  });
  $('.select__toggle').click(function (e) {
    e.preventDefault();
    $(this).closest('.select').toggleClass('is-open');
  });
  $('.select__option').click(function (e) {
    e.preventDefault();
    var content = $(this).html();
    $(this).closest('.select').removeClass('is-open');
    $(this).closest('.select').find('.select__toggle').html(content);
    $(this).addClass('is-active').siblings().removeClass('is-active');
    console.log({
      content: content
    });
  });
  $(document).click(function (event) {
    var $target = $(event.target);

    if (!$target.closest('.select.is-open').length) {
      $('.select.is-open').removeClass('is-open');
    }

    if (!$target.closest('.has-submenu.is-active').length) {
      $('.has-submenu.is-active').removeClass('is-active');
    }
  });
  $('.filters__group-items').mCustomScrollbar();
  $('.js-open-filters').click(function (e) {
    e.preventDefault();
    $('.filters').addClass('is-active');
  });
  $('.js-close-filters').click(function (e) {
    e.preventDefault();
    $('.filters').removeClass('is-active');
  });
  $('.page-search__input').focus(function (e) {
    e.preventDefault();
    $(this).closest('.page-search').addClass('is-active');
  });
  $('.page-search__input').blur(function (e) {
    e.preventDefault();
    $(this).closest('.page-search').removeClass('is-active');
  });
  $('.js-close-modal').click(function (e) {
    e.preventDefault();
    $(this).closest('.modal').removeClass('is-active');
  });
  $('.js-open-modal').click(function (e) {
    e.preventDefault();
    var target = $(this).attr('data-modal');
    $(target).addClass('is-active');
  });
  $('[data-fancybox]').fancybox({
    loop: true,
    animationEffect: false,
    animationDuration: 0,
    buttons: ["close"],
    infobar: false,
    btnTpl: {
      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg><use xlink:href="/img/sprites/symbol/sprite.svg#close"></use></svg></button>',
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' + prevArrow + '</button>',
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' + nextArrow + '</button>'
    },
    baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' + '<div class="fancybox-toolbar">{{buttons}}</div>' + '<div class="fancybox-stage"></div>' + '<div class="fancybox-nav-and-caption">' + '<div class="fancybox-navigation">{{arrows}}</div>' + '<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' + '</div>' + '</div>' + '</div>'
  });
  $('.filters__toggle-group').click(function (e) {
    e.preventDefault();
    var group = $(this).closest('.filters__group');
    if (group.hasClass('is-disabled')) return;
    group.toggleClass('is-open');
  });
  $('.js-quantity-input').keyup(function (e) {
    var val = $(this).val();
    $(this).val(val.replace(/[^0-9]/g, ''));
  });
  $('.js-quantity-btn').click(function (e) {
    console.log('CLICK');
    e.preventDefault();
    var input = $(this).closest('.quantity').find('.js-quantity-input');
    var operation = $(this).attr('data-type');
    var val = parseInt(input.val()) || 0;

    if (operation === 'minus') {
      val = val - 1;
    } else {
      val = val + 1;
    }

    input.val(val < 0 ? 0 : val);
  });
  $('.js-remove-from-cart').click(function (e) {
    e.preventDefault();
    $(this).closest('.cart-item').remove();
    showNotification('Товар удален из корзины!', 'danger');
  });
  $('.js-add-to-cart').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('in-cart')) return;
    $(this).addClass('in-cart');

    if ($(this).find('.btn__content').length) {
      $(this).find('.btn__content').html('В корзине!');
    }

    showNotification('Товар добавлен в корзину!');
  });
});
//# sourceMappingURL=main.js.map
