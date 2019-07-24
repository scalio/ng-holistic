import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hlc-customer-name-column',
  templateUrl: './customer-name-column.component.html',
  styleUrls: ['./customer-name-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerNameColumnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
