import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-clr-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
