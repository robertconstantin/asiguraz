import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  public currentUrl: string;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.currentUrl = this.router.url;
    });
  }

  ngOnInit() {}
}
