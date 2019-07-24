import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hlc-amount-column',
  templateUrl: './amount-column.component.html',
  styleUrls: ['./amount-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountColumnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
