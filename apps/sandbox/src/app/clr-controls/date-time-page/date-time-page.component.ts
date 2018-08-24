import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-date-time-page',
  templateUrl: './date-time-page.component.html',
  styleUrls: ['./date-time-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
