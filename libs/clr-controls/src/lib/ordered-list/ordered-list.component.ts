import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hlc-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderedListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
