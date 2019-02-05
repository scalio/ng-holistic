import { A, BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, NINE, TAB, UP_ARROW, Z, ZERO } from '@angular/cdk/keycodes';
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import {
    debounceTime,
    filter,
    flatMap,
    map,
    mapTo,
    shareReplay,
    startWith,
    takeUntil,
    withLatestFrom
} from 'rxjs/operators';
import { OverlayHelperService } from './overlay-helper.service';
import { ResultFormatter, ResultKeyFun, SkipPredicate } from './results-container/results-container.component';

export interface SearchArgInit {
    kind: 'SearchArgInit';
}

export interface SearchArgFocus {
    kind: 'SearchArgFocus';
}

export interface SearchArgTyping {
    kind: 'SearchArgTyping';
    term: string;
}

export type SearchArg = SearchArgInit | SearchArgFocus | SearchArgTyping;

export type SearchFun = (text: Observable<SearchArg>) => Observable<any[]>;

const isOpenKey = (allowAddNew: boolean, keyCode: number) =>
    (keyCode >= ZERO && keyCode <= NINE) ||
    (keyCode >= A && keyCode <= Z) ||
    (!allowAddNew && keyCode === ENTER) ||
    keyCode === DOWN_ARROW ||
    keyCode === UP_ARROW ||
    keyCode === BACKSPACE;

export const cleanupTypeaheadValue = (val: any) => {
    return val && typeof val === 'string' ? val.replace('<em>', '').replace('</em>', '') : val;
};

@Directive({
    selector: 'input[hlcTypeahead]',
    providers: [OverlayHelperService]
})
export class HlcTypeaheadDirective implements OnInit, OnDestroy {
    private readonly _click$: Observable<MouseEvent>;
    private readonly _keyDown$: Observable<KeyboardEvent>;
    private readonly _focus$: Observable<void>;
    private readonly _valueChanges$: Observable<string>;
    private readonly _destroy$ = new Subject();
    private value: any | null | undefined;

    // tslint:disable-next-line:no-input-rename
    @Input('hlcTypeahead')
    search: SearchFun | undefined;
    @Input()
    resultFormatter: ResultFormatter | undefined;
    @Input()
    resultTemplate: TemplateRef<any> | undefined;
    @Input()
    skipPredicate: SkipPredicate | undefined;
    @Input()
    resultKey: ResultKeyFun | undefined;
    @Input()
    autoselectFirst = true;
    @Input()
    allowAddNew = false;

    @Output()
    valueChange = new EventEmitter<any | undefined>();

    @Output()
    addNew = new EventEmitter<string>();

    @Input('value')
    set setValue(val: any | null | undefined) {
        this.value = val;
        this.updateInputTextByValue();
    }

    constructor(private _elementRef: ElementRef<HTMLInputElement>, private overlayHelper: OverlayHelperService) {
        this._valueChanges$ = fromEvent<Event>(_elementRef.nativeElement, 'input').pipe(
            map($event => ($event.target as HTMLInputElement).value)
        );

        this._focus$ = fromEvent<void>(_elementRef.nativeElement, 'focus');

        this._keyDown$ = fromEvent<KeyboardEvent>(_elementRef.nativeElement, 'keydown');

        this._click$ = fromEvent<MouseEvent>(_elementRef.nativeElement, 'click');
    }

    ngOnInit() {
        if (this.search) {
            // open
            const openKeys$ = this._keyDown$.pipe(filter(evt => isOpenKey(this.allowAddNew, evt.keyCode)));

            const open$ = merge(this._focus$, this._click$, openKeys$).pipe(
                // check here focus returns from dropdown
                filter(() => !this.overlayHelper.isOpen)
            );

            // search

            const focusSearch$ = this._focus$.pipe(
                // real focus, ignore reurn from dropdown
                filter(() => !this.overlayHelper.isOpen),
                map(() => ({
                    kind: 'SearchArgFocus'
                }))
            );

            const openSearch$ = open$.pipe(
                map(() => ({
                    kind: 'SearchArgOpen'
                }))
            );

            const typingSearch$ = this._valueChanges$.pipe(
                // search by user typing
                map(term => ({ kind: 'SearchArgTyping', term }))
            );

            const resultsTriggers$ = merge(focusSearch$, openSearch$, typingSearch$).pipe(
                // search when control initialized
                startWith({ kind: 'SearchArgInit' })
            );

            const results$ = resultsTriggers$.pipe(
                this.search,
                // make it shared
                shareReplay(1)
            );

            // subscribe immediately to emit SearchArgInit
            results$
                .pipe(
                    takeUntil(this._destroy$),
                    withLatestFrom(resultsTriggers$)
                )
                .subscribe(([_, arg]) => {
                    if (this.autoselectFirst && arg.kind === 'SearchArgTyping') {
                        this.overlayHelper.setFirstItemActive();
                    }
                });

            // select
            const select$ = open$.pipe(
                filter(() => !this.overlayHelper.isOpen),
                flatMap(() =>
                    this.overlayHelper.show(
                        {
                            resultTemplate: this.resultTemplate,
                            value: this.value,
                            skipPredicate: this.skipPredicate,
                            resultFormatter: this.resultFormatter,
                            resultKey: this.resultKey
                        },
                        results$,
                        this._keyDown$
                    )
                )
            );

            // close
            const closeKeys$ = this._keyDown$.pipe(
                filter(evt => evt.keyCode === ESCAPE),
                mapTo(null)
            );

            const close$ = merge(select$, closeKeys$);

            close$
                .pipe(
                    takeUntil(this._destroy$),
                    filter(() => this.overlayHelper.isOpen)
                )
                .subscribe(item => {
                    // important : focus should be set before hide since overwise open$ will emit event
                    this._elementRef.nativeElement.focus();
                    this.overlayHelper.hide();
                    if (item) {
                        this.value = item;
                        this.updateInputTextByValue();
                        this.valueChange.emit(cleanupTypeaheadValue(this.value));
                    }
                });

            // special case close, no need to set focus on input
            this._keyDown$
                .pipe(
                    takeUntil(this._destroy$),
                    filter(evt => evt.keyCode === TAB)
                )
                .subscribe(() => {
                    this.overlayHelper.hide();
                });

            // add new behaviour
            const addNew$ = this._keyDown$.pipe(
                debounceTime(1),
                filter(
                    evt =>
                        // check if allow add new item
                        this.allowAddNew &&
                        // add by 'enter' key
                        evt.keyCode === ENTER &&
                        // value in input must not be empty
                        evt.target &&
                        (evt.target as any)['value']
                ),
                map(evt => evt.target && (evt.target as any)['value']),
                // wait to overlay close
                filter(
                    () =>
                        // check if overlayClosed (no item selected)
                        !this.overlayHelper.isOpen
                )
            );

            addNew$.pipe(takeUntil(this._destroy$)).subscribe(text => {
                this.addNew.emit(text);
                this.setValue = null;
            });
        }
    }

    ngOnDestroy() {
        this._destroy$.next();
        this.overlayHelper.destroy();
    }

    // click outside
    @HostListener('document:click', ['onDocumentClick($event)'])
    onDocumentClick($event: MouseEvent) {
        if (!$event || !this.overlayHelper.isOpen) {
            return;
        }
        if (
            !this._elementRef.nativeElement.contains($event.target as any) &&
            !this.overlayHelper.overlayRef.overlayElement.contains($event.target as any)
        ) {
            this.overlayHelper.hide();
        }
    }

    private updateInputTextByValue() {
        this._elementRef.nativeElement.value =
            this.value && this.resultFormatter ? this.resultFormatter(this.value) : this.value || '';
    }
}
