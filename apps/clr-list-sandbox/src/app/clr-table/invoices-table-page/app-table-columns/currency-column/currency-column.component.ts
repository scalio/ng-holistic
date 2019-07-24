import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hlc-currency-column',
  templateUrl: './currency-column.component.html',
  styleUrls: ['./currency-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyColumnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
