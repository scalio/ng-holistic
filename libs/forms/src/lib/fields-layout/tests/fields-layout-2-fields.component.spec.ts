import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, NgModule, OnInit, Output } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { FieldsLayoutComponent } from '../fields-layout.component';
import { FieldsLayoutModule } from '../fields-layout.module';
import { take, map } from 'rxjs/operators';

@Component({
    selector: 'hlc-text-field',
    // tslint:disable-next-line:max-line-length
    template: `<input type="text" [disabled]="readonly === true ? true : undefined" [value]="value || ''" (change)="onChange($event.target.value)" >`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextFieldComponent),
            multi: true
        }
    ]
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
    // TextFieldComponent
    @Input() readonly: boolean;
    //
    @Input() value: string | undefined;
    @Output() valueChange = new EventEmitter<string>();

    constructor() {}

    propagateChange = (_: any) => {};

    ngOnInit() {}

    onChange(val: string) {
        this.value = val;
        this.valueChange.emit(val);
        this.propagateChange(val);
    }

    //
    writeValue(obj: any) {
        this.value = obj;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(_: any) {}
}

@NgModule({
    declarations: [TextFieldComponent],
    exports: [TextFieldComponent],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [],
    entryComponents: [TextFieldComponent]
})
export class TextFieldModule {}

///

describe('fields-layout with 2 fields', () => {
    let fixture: ComponentFixture<FieldsLayoutComponent>;
    let comp: FieldsLayoutComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [],
            imports: [
                FieldsLayoutModule.forRoot({ TextField: TextFieldComponent }),
                ReactiveFormsModule,
                TextFieldModule
            ]
        });

        fixture = TestBed.createComponent(FieldsLayoutComponent);
        comp = fixture.componentInstance;
    });

    it('should create', () => {
        expect(comp).toBeDefined();
    });

    describe('generate layout ', () => {
        describe('with 2 text input', () => {
            let inputs: HTMLInputElement[];

            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text1: [''], text2: [''] });
                comp.fields = [{ id: 'text1', kind: 'TextField' }, { id: 'text2', kind: 'TextField' }];
                fixture.detectChanges();
                inputs = fixture.nativeElement.querySelectorAll('input');
            }));

            it('must render layout with single text input', () => {
                expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
                expect(fixture.nativeElement['children']['length']).toEqual(1);
                expect(fixture.nativeElement['firstChild'] instanceof HTMLFormElement).toEqual(true);
                expect(fixture.nativeElement['firstChild']['children']['length']).toEqual(2);
                expect(
                    fixture.nativeElement['firstChild']['children']['0']['children']['0'] instanceof HTMLInputElement
                ).toEqual(true);
                expect(
                    fixture.nativeElement['firstChild']['children']['1']['children']['0'] instanceof HTMLInputElement
                ).toEqual(true);
            });

            it('text input value must be empty string', () => {
                expect(inputs[0].value).toEqual('');
                expect(inputs[1].value).toEqual('');
            });

            it('when user type text form value must be changed', () => {
                sendKeys(inputs[1], '123');
                expect(inputs[1].value).toEqual('123');
                expect(comp.formGroup.value).toEqual({ text1: '', text2: '123' });
            });

            it('when form value patched it must update input value', () => {
                comp.formGroup.patchValue({ text1: '567' });
                fixture.detectChanges();
                expect(inputs[0].value).toEqual('567');
                expect(inputs[1].value).toEqual('');
            });
        });

        describe('when field has some property value set', () => {
            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text1: [''], text2: [''] });
                comp.fields = [
                    { id: 'text1', kind: 'TextField', readonly: true },
                    { id: 'text2', kind: 'TextField', readonly: false }
                ];
                fixture.detectChanges();
            }));

            it('must set property with same name on component', () => {
                const inputs = fixture.nativeElement.querySelectorAll('input[disabled]');
                expect(inputs.length).toEqual(1);
            });
        });

        describe('when field has some property value set to observable', () => {
            const subj1 = new BehaviorSubject(true);
            const subj2 = new BehaviorSubject(false);
            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text1: [''], text2: [''] });
                comp.fields = [
                    { id: 'text1', kind: 'TextField', readonly: subj1 },
                    { id: 'text2', kind: 'TextField', readonly: subj2 }
                ];
                fixture.detectChanges();
            }));

            it('must set property to scalar value with same name on component', () => {
                const inputs = fixture.nativeElement.querySelectorAll('input[disabled]');
                expect(inputs.length).toEqual(1);
            });

            it('must update property value when new observable event emited', () => {
                subj2.next(true);
                fixture.detectChanges();
                const inputs = fixture.nativeElement.querySelectorAll('input[disabled]');
                expect(inputs.length).toEqual(2);
            });
        });

        describe('when field has some Subject property and coponent has EventEmitter for the same name field', () => {
            const subj1 = new Subject();
            const subj2 = new Subject();
            let inputs: HTMLInputElement[];
            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text1: [''], text2: [''] });
                comp.fields = [
                    { id: 'text1', kind: 'TextField', valueChange: subj1 },
                    { id: 'text2', kind: 'TextField', valueChange: subj2 }
                ];
                fixture.detectChanges();
                inputs = fixture.nativeElement.querySelectorAll('input');
            }));

            it('it must emit events to subject when outpust event emited on property', async () => {
                const p = subj2
                    .pipe(
                        map((val, i) => {
                            if (i === 0) {
                                expect(val).toEqual('1');
                            }
                            if (i === 1) {
                                expect(val).toEqual('12');
                            }
                            if (i === 2) {
                                expect(val).toEqual('123');
                            }
                            return true;
                        }),
                        take(3)
                    )
                    .toPromise();
                sendKeys(inputs[1], '123');
                return p;
            });
        });
    });
});

function sendKeys(element: Element, keys: string) {
    const e = element as HTMLInputElement;
    for (const key of keys) {
        const eventParams = { key, char: key, keyCode: key.charCodeAt(0) };
        e.dispatchEvent(new KeyboardEvent('keydown', eventParams));
        e.dispatchEvent(new KeyboardEvent('keypress', eventParams));
        e.value += key;
        e.dispatchEvent(new KeyboardEvent('keyup', eventParams));
        e.dispatchEvent(new KeyboardEvent('change', eventParams));
        e.dispatchEvent(new Event('input'));
    }
}
