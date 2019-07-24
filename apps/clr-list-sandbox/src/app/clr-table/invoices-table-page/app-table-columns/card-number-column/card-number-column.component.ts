import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hlc-card-number-column',
  templateUrl: './card-number-column.component.html',
  styleUrls: ['./card-number-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNumberColumnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
