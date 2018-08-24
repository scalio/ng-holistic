import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-base-list-page',
  templateUrl: './base-list-page.component.html',
  styleUrls: ['./base-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
