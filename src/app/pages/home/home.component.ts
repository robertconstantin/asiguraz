import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var Swiper: any;
/* tslint:disable */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.jsInit();
  }

  jsInit() {
    this.jsSidebarInit();
    this.jsParalax();
    this.jsTextAnimation();
    this.jsSlider();
  }

  jsSidebarInit() {
    const isLogin = this.router.url.indexOf('login.html') > -1;
    const isSignUp = this.router.url.indexOf('sign-up.html') > -1;
    const isForgotPassword = this.router.url.indexOf('forgot-password.html') > -1;
    const isResetPassword = this.router.url.indexOf('reset-password') > -1;

    const div = $('.popup-data-user');
    const div2 = $('.container-perspective');
    const html = $('html');
    const body = $('body');
    if (isLogin || isSignUp || isForgotPassword || isResetPassword) {
      html.addClass('full-h');
      body.addClass('full-h overflow');
      div.addClass('active');
      div2.addClass('persp add-effect');
    } else {
      html.removeClass('full-h');
      body.removeClass('full-h overflow');
      div.removeClass('active');
      div2.removeClass('persp add-effect');
    }
  }

  jsParalax() {
    if ($(window).width() > 1200) {
      const scrolled = $(window).scrollTop();
      const scroll_fade_elem = $('.scroll-fade');
      scroll_fade_elem.css('top', -(scrolled * 0.0315) + 'rem');
      scroll_fade_elem
        .parent()
        .find('.fade-elem')
        .css('top', -(scrolled * -0.005) + 'rem');
      scroll_fade_elem
        .parent()
        .find('.fade-elem')
        .css('opacity', 1 - scrolled * 0.00275);
    }
  }

  jsTextAnimation() {
    const text_animation_elem = $('.text-animation');
    const sentenceVal1 = text_animation_elem.attr('data-first'),
      sentenceVal2 = text_animation_elem.attr('data-second'),
      sentenceVal3 = text_animation_elem.attr('data-third');
    if (text_animation_elem.length) {
      text_animation_elem.typed({
        strings: [sentenceVal1, sentenceVal2, sentenceVal3],
        typeSpeed: 50
      });
    }
    const text_animation2_elem = $('.text-animation2');
    const sentenceVal4 = text_animation2_elem.attr('data-prev'),
      sentenceVal5 = text_animation2_elem.attr('data-next');
    if (text_animation2_elem.length) {
      text_animation2_elem.typed({
        strings: [sentenceVal4, sentenceVal5],
        typeSpeed: 60
      });
    }
  }

  jsSlider() {
    const swipers = [];
    let winW, winH, offsetScroll, fullPageHeight;
    const smPoint = 480, mdPoint = 768, lgPoint = 992, addPoint = 1200;

    function pageCalculations() {
      winW = $(window).width();
      winH = $(window).height();
          offsetScroll = ($('.single-title').innerHeight() - $('header').height()) + 'px';
          fullPageHeight = parseInt((winH - $('.header').height()).toString(), 10);
    }
    pageCalculations();

    function updateSlidesPerView(swiperContainer) {
      if (winW >= addPoint) { return parseInt(swiperContainer.attr('data-add-slides'), 10); } else
      if (winW >= lgPoint) { return parseInt(swiperContainer.attr('data-lg-slides'), 10); } else
      if (winW >= mdPoint) { return parseInt(swiperContainer.attr('data-md-slides'), 10); } else
      if (winW >= smPoint) { return parseInt(swiperContainer.attr('data-sm-slides'), 10);
      } else { return parseInt(swiperContainer.attr('data-xs-slides'), 10); }
    }

    function initSwiper() {
      let initIterator = 0;
      $('.swiper-container').each(function() {
        const $t = $(this);
        const index = 'swiper-unique-id-' + initIterator;

        $t.addClass('swiper-' + index  +  ' initialized').attr('id', index);
        $t.find('.pagination').addClass('pagination-' + index);

        const autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
        const slideEffect = $t.attr('data-effect');
        let slidesPerViewVar = $t.attr('data-slides-per-view');

        if (slidesPerViewVar === 'responsive') {
          slidesPerViewVar = updateSlidesPerView($t);
        }

        const autoHeight = parseInt($t.attr('data-autoheight'), 10);
        const directMode = $t.attr('data-mode');
        const loopVar = parseInt($t.attr('data-loop'), 10);
        const speedVar = parseInt($t.attr('data-speed'), 10);
        const centerVar = parseInt($t.attr('data-center'), 10);
        const freeMode = parseInt($t.attr('data-freemode'), 10);
        const scrollVar = parseInt($t.attr('data-scroll'), 10);
        let scrollBar = false;
        if ($('.swiper-scrollbar').length) {
            scrollBar = $t.attr('data-bar');
        }
        swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
          speed: speedVar,
          pagination: '.pagination-' + index,
          paginationHide: false,
          loop: loopVar,
          paginationClickable: true,
          autoplay: autoPlayVar,
          slidesPerView: slidesPerViewVar,
          autoHeight: autoHeight,
          keyboardControl: true,
          simulateTouch: true,
          centeredSlides: centerVar,
          effect: slideEffect,
          mousewheelControl: scrollVar,
          nextButton: '.swiper-arrow-right',
          prevButton: '.swiper-arrow-left',
          direction: directMode,
          freeMode: freeMode,
                  scrollbar: scrollBar,
          fade: {
              crossFade: false
          },
          coverflow: {
            rotate: 70,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : false
          },
          paginationBulletRender: function (i, className, swiper) {
              if ($('.nubmer-point-style').length) {
                return '<span class="' + className + '">' + '<i>' + (i  +  1) + '</i>' + '</span>';
              } else {
                if ($('.point-styled-text').length) {
                const pointText = $t.find('.swiper-slide .title').eq(i).attr('data-point-text');
                          return '<span class="' + className + '">' + '<i>' + (pointText) + '</i>' + '</span>';
                } else {
                  return '<span class="' + className + '"></span>';
                }
            }
                  },
          onSlideChangeStart: function(swiper) {
                 const activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                     const slider_swiching = $t.closest('.slider-swiching');
                 if (slider_swiching.length) {
                swipers['swiper-' + slider_swiching.find('.swich-parent').attr('id')].slideTo(swiper.activeIndex);
                  slider_swiching.find('.slide-swich').removeClass('active');
                  slider_swiching.find('.slide-swich').eq(activeIndex).addClass('active');
                }
            if ($t.closest('.single2-slider').length) {
               $('.main-content').addClass('open-panel');
               $('.close-nav-bar').addClass('active');
            }
          }
        });
        swipers['swiper-' + index].update();
          if ($t.attr('data-slides-per-view') === 'responsive') {
            const paginationSpan = $t.find('.pagination span');
            const paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
            if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) {
              $t.addClass('pagination-hidden');
            } else {
              $t.removeClass('pagination-hidden');
            }
            paginationSlice.show();
          }
        initIterator++;
      });
    }

    initSwiper();

    $(document).on('click', '.slide-swich', function() {
      const swichIndex = $(this).closest('.slider-swiching').find('.slide-swich').index(this);
       $(this).closest('.slider-swiching').find('.slide-swich').removeClass('active');
        $(this).addClass('active');
      swipers['swiper-' + $(this).closest('.slider-swiching').find('.container-swich').attr('id')].slideTo(swichIndex);
        return false;
    });
  }
}
