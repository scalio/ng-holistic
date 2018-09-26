import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, NgModule, OnInit, Output } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FieldsLayoutComponent } from './fields-layout.component';
import { FieldsLayoutModule } from './fields-layout.module';

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

describe('fields-layout', () => {
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
        describe('with no elements', () => {
            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text: [''] });
                fixture.detectChanges();
            }));

            it('must render empty layout', () => {
                // div / form
                expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
                expect(fixture.nativeElement['children']['length']).toEqual(1);
                expect(fixture.nativeElement['firstChild'] instanceof HTMLFormElement).toEqual(true);
                expect(fixture.nativeElement['firstChild']['children']['length']).toEqual(0);
            });
        });

        describe('with 1 text input', () => {
            let input: HTMLInputElement;

            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text: [''] });
                comp.fields = [{ id: 'text', kind: 'TextField' }];
                fixture.detectChanges();
                input = fixture.nativeElement.querySelector('input');
            }));

            it('must render layout with single text input', () => {
                // div / form

                expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
                expect(fixture.nativeElement['children']['length']).toEqual(1);
                expect(fixture.nativeElement['firstChild'] instanceof HTMLFormElement).toEqual(true);
                expect(fixture.nativeElement['firstChild']['children']['length']).toEqual(1);
                expect(
                    fixture.nativeElement['firstChild']['children']['0']['children']['0'] instanceof HTMLInputElement
                ).toEqual(true);
            });

            it('text input value must be empty string', () => {
                expect(input.value).toEqual('');
            });

            it('when user type text form value must be changed', () => {
                sendKeys(input, '123');
                expect(input.value).toEqual('123');
                expect(comp.formGroup.value).toEqual({ text: '123' });
            });

            it('when form value patched it must update input value', () => {
                comp.formGroup.patchValue({ text: '567' });
                fixture.detectChanges();
                expect(input.value).toEqual('567');
            });
        });

        describe('when field has some property value set', () => {
            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text: [''] });
                comp.fields = [{ id: 'text', kind: 'TextField', readonly: true }];
                fixture.detectChanges();
            }));

            fit('must set property with same name on component', () => {
                const input = fixture.nativeElement.querySelector('input[disabled]');
                expect(input).not.toBeNull();
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
