import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DictMapperService } from '../list-items.config';

@Component({
    selector: 'hlc-clr-tags-list',
    templateUrl: './tags-list.component.html',
    styleUrls: ['./tags-list.component.scss']
})
export class HlcClrTagsListComponent implements OnInit {
    @Input() items: any[];
    @Output() remove = new EventEmitter<any>();

    constructor(private readonly dictMapper: DictMapperService) {}

    ngOnInit() {}

    onRemove(item: any) {
        this.remove.emit(item);
    }

    trackById(_: any, item: any) {
        return this.dictMapper.getKey(item);
    }

    getLabel(item: any) {
        return this.dictMapper.getLabel(item);
    }
}
