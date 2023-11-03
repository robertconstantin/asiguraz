import { Component, OnInit } from '@angular/core';
/* tslint:disable */
declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-despre-noi',
  templateUrl: './despre-noi.component.html',
  styleUrls: ['despre-noi.component.css']
})
export class DespreNoiComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.jsInit();
  }

  jsInit() {
    this.jsStatistics();
    this.jsSlider();
  }

  jsStatistics() {
    let hasCreatedObjects = false;
    $(window).scroll(function() {
      if ($('.time-line').length) {
        $('.time-line')
          .not('.animated')
          .each(function() {
            if (
              $(window).scrollTop() >=
              $(this).offset().top - $(window).height() * 0.9
            ) {
              $(this)
                .addClass('animated')
                .find('.timer')
                .countTo();
              if (!hasCreatedObjects) {
                hasCreatedObjects = true;
                $('.circle-item').each(function(index) {
                  $(this)
                    .find('.skill-circle')
                    .attr('id', 'circle-range-' + index);
                  $('#circle-range-' + index).circliful();
                });
              }
            }
          });
      }
    });
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
