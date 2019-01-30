import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WellcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
