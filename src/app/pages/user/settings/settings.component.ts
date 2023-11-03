import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// model
// service

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public loading = true;

  constructor(private router: Router) {}

  ngOnInit() {}
}
