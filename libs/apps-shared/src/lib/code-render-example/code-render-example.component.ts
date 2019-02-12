import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-code-render-example',
  templateUrl: './code-render-example.component.html',
  styleUrls: ['./code-render-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcCodeRenderExampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
