import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChildren
} from '@angular/core';
import { HlcResultItemComponent } from '../result-item/result-item.component';

export type ResultFormatter = (item: any) => string;
export type SkipPredicate = (item: any) => boolean;
export type ResultKeyFun = (result: any) => string;

export interface ContainerProperties {
    value: any | undefined;
    resultTemplate: TemplateRef<any> | undefined;
    skipPredicate: SkipPredicate | undefined;
    resultFormatter: ResultFormatter | undefined;
    resultKey: ResultKeyFun | undefined;
}

@Component({
    selector: 'hlc-results-container',
    templateUrl: './results-container.component.html',
    styleUrls: ['./results-container.component.scss']
})
export class HlcResultsContentComponent implements AfterViewInit, ContainerProperties {
    keyManager: ActiveDescendantKeyManager<HlcResultItemComponent>;
    @ViewChildren(HlcResultItemComponent)
    itemComponents: QueryList<HlcResultItemComponent>;
    @Input()
    results: any[];

    @Input()
    value: any | undefined;
    @Input()
    resultTemplate: TemplateRef<any> | undefined;
    @Input()
    resultFormatter: ResultFormatter | undefined;
    @Input()
    skipPredicate: SkipPredicate | undefined;
    @Input()
    resultKey: ResultKeyFun | undefined;

    @Output()
    selected = new EventEmitter();

    constructor() {}

    private findValueIndex() {
        if (!this.value) {
            return -1;
        }
        if (this.resultKey) {
            const resultKey = this.resultKey;
            return this.results.findIndex(result => resultKey(result) === resultKey(this.value()));
        } else {
            return this.results.indexOf(this.value);
        }
    }

    private setActiveItemByValue() {
        if (this.value && this.results) {
            const i = this.findValueIndex();
            if (i !== -1) {
                this.keyManager.setActiveItem(i);
                if (this.keyManager.activeItem) {
                    this.keyManager.activeItem.scrollIntoView();
                }
            } else {
                console.warn(`value ${this.value} is not in results`);
            }
        }
    }

    ngAfterViewInit() {
        this.keyManager = new ActiveDescendantKeyManager(this.itemComponents).withVerticalOrientation(true).withWrap();
        if (this.skipPredicate) {
            this.keyManager.skipPredicate(x => (this.skipPredicate as SkipPredicate)(x.result));
        }
        // issue with property was changed after check
        setTimeout(() => this.setActiveItemByValue(), 0);
    }

    isSkip(item: any) {
        return this.skipPredicate ? this.skipPredicate(item) : false;
    }

    onResultClick(item: any) {
        if (this.isSkip(item)) {
            return;
        }

        if (item && this.keyManager) {
            const i = this.results.indexOf(item);
            this.setActiveItem(i);
        }
        this.onSelect(item);
    }

    setActiveItem(index: number) {
        if (index !== -1) {
            this.keyManager.setActiveItem(index);
        }
    }

    onSelect(item: any) {
        this.value = item;
        this.selected.emit(item);
    }

    onKeyDown(ev: KeyboardEvent) {
        if (ev.keyCode === ENTER) {
            ev.preventDefault();
            this.onSelect(this.keyManager.activeItem ? this.keyManager.activeItem.result : null);
        }

        if (ev.keyCode === UP_ARROW) {
            ev.preventDefault();
            this.keyManager.setPreviousItemActive();
            if (this.keyManager.activeItem) {
                this.keyManager.activeItem.scrollIntoView();
            }
        }

        if (ev.keyCode === DOWN_ARROW) {
            ev.preventDefault();
            this.keyManager.setNextItemActive();
            if (this.keyManager.activeItem) {
                this.keyManager.activeItem.scrollIntoView();
            }
        }
    }

    trackByResult(index: number, result: any) {
        return this.resultKey ? this.resultKey(result) : index;
    }
}
