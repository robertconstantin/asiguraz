import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['contact.component.scss']
})
export class ContactComponent implements OnInit {
  hidden = false;

  constructor() {}

  ngOnInit() {
    this.jsInit();
  }

  showForm() {
    this.hidden = !this.hidden;
  }

  jsInit() {
    let winW, winH, offsetScroll, fullPageHeight;

    function pageCalculations() {
      winW = $(window).width();
      winH = $(window).height();
      offsetScroll =
        $('.single-title').innerHeight() - $('header').height() + 'px';
      fullPageHeight = parseInt((winH - $('.header').height()).toString(), 10);
    }
    pageCalculations();

    // $('.preload').fadeOut(1000);
    if ($('.popup-ajax').length) {
      $('body').addClass('overflowh');
      $('.popup-ajax').addClass('active');
    }
    if ($('.map-wrapper').length) {
      setTimeout(function() {
        initialize();
      }, 100);
    }
    if ($(window).width() > 1024) {
      if ($('.wrapper-full-scroll').length) {
        $('body').addClass('overflowh');
        $('.full-scroll-section').height(fullPageHeight);
      }
    }
    $('.onepage-box .add-nav-link').click();

    const marker = [],
      infowindow = [],
      image = $('.map-wrapper').attr('data-marker');
    let map: any;

    function addMarker(location, name, contentstr) {
      marker[name] = new google.maps.Marker({
        position: location,
        map: map,
        icon: image
      });
      marker[name].setMap(map);

      infowindow[name] = new google.maps.InfoWindow({
        content: contentstr
      });

      google.maps.event.addListener(marker[name], 'click', function() {
        infowindow[name].open(map, marker[name]);
      });
    }

    function initialize() {
      const lat = $('#map-canvas').attr('data-lat');
      const lng = $('#map-canvas').attr('data-lng');
      const mapStyle = $('#map-canvas').attr('data-style');

      const myLatlng = new google.maps.LatLng(lat, lng);

      const setZoom = parseInt($('#map-canvas').attr('data-zoom'), 10);

      let styles: any;

      if (mapStyle === '1') {
        styles = [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              { saturation: 36 },
              { color: '#000000' },
              { lightness: 40 }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              { visibility: 'on' },
              { color: '#000000' },
              { lightness: 16 }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [{ color: '#000000' }, { lightness: 20 }]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 20 }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 21 }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#000000' }, { lightness: 17 }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#000000' }, { lightness: 29 }, { weight: 0.2 }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 18 }]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 16 }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 19 }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 17 }]
          }
        ];
      } else {
        if (mapStyle === '2') {
          styles = [
            {
              featureType: 'administrative.land_parcel',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'labels',
              stylers: [{ visibility: 'simplified' }, { lightness: 20 }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ hue: '#f49935' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [{ hue: '#fad959' }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road.local',
              elementType: 'geometry',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'road.local',
              elementType: 'labels',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [
                { hue: '#a1cdfc' },
                { saturation: 30 },
                { lightness: 49 }
              ]
            }
          ];
        }
      }
      const styledMap = new google.maps.StyledMapType(styles, {
        name: 'Styled Map'
      });

      let draggMap: any;
      if (!false) {
        draggMap = true;
      } else {
        draggMap = false;
      }

      const mapOptions = {
        zoom: setZoom,
        disableDefaultUI: false,
        scrollwheel: false,
        zoomControl: true,
        streetViewControl: true,
        center: myLatlng,
        draggable: draggMap
      };
      map = new google.maps.Map(
        document.getElementById('map-canvas'),
        mapOptions
      );

      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      $('.addresses-block a').each(function() {
        const mark_lat = $(this).attr('data-lat');
        const mark_lng = $(this).attr('data-lng');
        const this_index = $('.addresses-block a').index(this);
        const mark_name = 'template_marker_' + this_index;
        const mark_locat = new google.maps.LatLng(mark_lat, mark_lng);
        const mark_str = $(this).attr('data-string');
        addMarker(mark_locat, mark_name, mark_str);
      });
    }
  }
}
