import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLayoutComponent } from './form-layout.component';
import { FormLayoutModule } from './form-layout.module';

@Component({
    selector: 'hlc-div-group',
    template: `<div><ng-content></ng-content></div>`
})
export class DivGroupComponent {}

@Component({
    selector: 'hlc-p-group',
    template: `<p><ng-content></ng-content></p>`
})
export class PGroupComponent {}

@Component({
    selector: 'hlc-span-group',
    template: `<span><ng-content></ng-content></span>`
})
export class SpanGroupComponent {}

@NgModule({
    declarations: [DivGroupComponent, SpanGroupComponent, PGroupComponent],
    exports: [DivGroupComponent, SpanGroupComponent, PGroupComponent],
    imports: [CommonModule],
    providers: [],
    entryComponents: [DivGroupComponent, SpanGroupComponent, PGroupComponent]
})
export class GroupsModule {}

///

describe('form-layout', () => {
    let fixture: ComponentFixture<FormLayoutComponent>;
    let comp: FormLayoutComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [],
            imports: [
                FormLayoutModule.forRoot({ div: DivGroupComponent, p: PGroupComponent, span: SpanGroupComponent }),

                GroupsModule
            ]
        });

        fixture = TestBed.createComponent(FormLayoutComponent);
        comp = fixture.componentInstance;
    });

    it('should create', () => {
        expect(comp).toBeDefined();
    });

    describe('generate layout with no elements', () => {
        it('must render empty layout', () => {
            // div
            expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
            console.log(fixture.nativeElement.outerHTML);
            expect(fixture.nativeElement['children']['length']).toEqual(0);
        });
    });

    describe('generate layout /div/[span]', () => {
        beforeEach(() => {
            comp.group = {
                kind: 'div',
                $content: [{ kind: 'span', $content: [] }]
            };

            fixture.detectChanges();
        });

        it('must render layout with single text input', () => {
            // div / span

            expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
            console.log(fixture.nativeElement.innerHTML);
            expect(fixture.nativeElement['children']['length']).toEqual(1);
        });
    });
});
