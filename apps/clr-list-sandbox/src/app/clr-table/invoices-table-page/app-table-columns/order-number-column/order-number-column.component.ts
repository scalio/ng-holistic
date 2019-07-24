import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hlc-order-number-column',
  templateUrl: './order-number-column.component.html',
  styleUrls: ['./order-number-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderNumberColumnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
