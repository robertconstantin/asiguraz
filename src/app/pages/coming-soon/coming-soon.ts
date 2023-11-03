import { Component, OnInit } from '@angular/core';
import { Observable, interval  } from 'rxjs';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.html'
})
export class ComingSoonComponent implements OnInit {
  public days = 77;
  public hours = 77;
  public minutes = 77;
  public seconds = 77;

  public date = new Date(2018, 6, 1);

  constructor() {
    interval(1000).subscribe(x => {
      const dateCurrentDate = new Date();
      this.getDateDiff(this.date, dateCurrentDate);
    });
  }

  ngOnInit() {
  }

  private getDateDiff(time1, time2) {

    let dMiliSeconds = time1 - time2;
    const dDays = dMiliSeconds / 1000 / 60 / 60 / 24;
    // console.log(dDays - (dDays % 1) + ' days');
    this.days = dDays - (dDays % 1);

    dMiliSeconds = dMiliSeconds - ( ( dDays - (dDays % 1) ) * 1000 * 60 * 60 * 24);
    const dHours = dMiliSeconds / 1000 / 60 / 60;
    // console.log(dHours - (dHours % 1) + ' hours');
    this.hours = dHours - (dHours % 1);

    dMiliSeconds = dMiliSeconds - ( ( dHours - (dHours % 1) ) * 1000 * 60 * 60);
    const dMinutes = dMiliSeconds / 1000 / 60;
    // console.log(dMinutes - (dMinutes % 1) + ' minutes');
    this.minutes = dMinutes - (dMinutes % 1);

    dMiliSeconds = dMiliSeconds - ( ( dMinutes - (dMinutes % 1) ) * 1000 * 60);
    const dSeconds = dMiliSeconds / 1000;
    // console.log(dSeconds - (dSeconds % 1) + ' s');
    this.seconds = dSeconds - (dSeconds % 1);

  }
}
