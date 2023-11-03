import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-servicii',
  templateUrl: './servicii.component.html'
})
export class ServiciiComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.jsInit();
  }

  jsInit() {
    $('.team-slide-item').on('mouseenter', function() {
      $('.team-slide-item')
        .removeClass('out')
        .addClass('in');
      $(this)
        .removeClass('in')
        .addClass('out');
    });

    $('.team-slide-item').on('mouseleave', () => {
      $('.team-slide-item')
        .removeClass('out')
        .removeClass('in');
    });
  }
}
