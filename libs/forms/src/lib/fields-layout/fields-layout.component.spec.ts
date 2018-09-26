import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, NgModule, OnInit, Output } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FieldsLayoutComponent } from './fields-layout.component';
import { FieldsLayoutModule } from './fields-layout.module';

@Component({
    selector: 'hlc-text-field',
    template: `<input type="text" [value]="value" (change)="onChange($event.target.value)" >`,
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
            beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
                comp.formGroup = fb.group({ text: [''] });
                comp.fields = [{ id: 'text', kind: 'TextField' }];
                fixture.detectChanges();
            }));

            it('must render layout with text input', () => {
                // div / form
                expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
                expect(fixture.nativeElement['children']['length']).toEqual(1);
                expect(fixture.nativeElement['firstChild'] instanceof HTMLFormElement).toEqual(true);
                expect(fixture.nativeElement['firstChild']['children']['length']).toEqual(1);
                expect(
                    fixture.nativeElement['firstChild']['children']['0']['children']['0'] instanceof HTMLInputElement
                ).toEqual(true);
            });
        });
    });
});
