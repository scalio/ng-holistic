import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
  styleUrls: ['./form-field-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
