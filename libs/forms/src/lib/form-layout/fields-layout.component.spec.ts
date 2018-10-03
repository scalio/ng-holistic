import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewContainerRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLayoutComponent } from './form-layout.component';
import { FormLayoutModule } from './form-layout.module';

@Component({
    selector: 'hlc-div-group',
    template: `<div><ng-container #vc></ng-container></div>`
})
export class DivGroupComponent {
    constructor() {}

    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;
}

@Component({
    selector: 'hlc-p-group',
    template: `<p><ng-container #vc></ng-container></p>`
})
export class PGroupComponent {
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;
}

@Component({
    selector: 'hlc-span-group',
    template: `<span><ng-container #vc></ng-container></span>`
})
export class SpanGroupComponent {
    @ViewChild('vc', { read: ViewContainerRef })
    vc: ViewContainerRef;
}

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

    describe('generate layouts', () => {
        beforeEach(() => {});

        it(' div[span]', () => {
            // div / span
            comp.group = {
                kind: 'div',
                $content: [{ kind: 'span', $content: [] }]
            };

            fixture.detectChanges();

            expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
            expect(fixture.nativeElement.children[0].outerHTML).toEqual(
                '<hlc-div-group><div><!----><hlc-span-group><span><!----></span></hlc-span-group></div></hlc-div-group>'
            );
            expect(fixture.nativeElement['children']['length']).toEqual(1);
        });

        it(' div[span,span]', () => {
            comp.group = {
                kind: 'div',
                $content: [{ kind: 'span', $content: [] }, { kind: 'span', $content: [] }]
            };

            fixture.detectChanges();

            expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
            const expected = `
            <hlc-div-group><div><!---->
                <hlc-span-group>
                    <span><!----></span>
                </hlc-span-group>
                <hlc-span-group>
                    <span><!----></span>
                </hlc-span-group>
            </div></hlc-div-group>`.replace(/\s+/g, '');
            expect(fixture.nativeElement.children[0].outerHTML).toEqual(expected);
            expect(fixture.nativeElement['children']['length']).toEqual(1);
        });

        it(' div[p[span,span],span[p,div]]', () => {
            comp.group = {
                kind: 'div',
                $content: [
                    {
                        kind: 'p',
                        $content: [{ kind: 'span', $content: [] }, { kind: 'span', $content: [] }]
                    },
                    {
                        kind: 'span',
                        $content: [{ kind: 'p', $content: [] }, { kind: 'div', $content: [] }]
                    }
                ]
            };

            fixture.detectChanges();

            expect(fixture.nativeElement instanceof HTMLDivElement).toEqual(true);
            const expected = `
                <hlc-div-group><div><!---->
                    <hlc-p-group><p><!---->
                        <hlc-span-group><span><!----></span></hlc-span-group>
                        <hlc-span-group><span><!----></span></hlc-span-group>
                    </p></hlc-p-group>
                    <hlc-span-group><span><!---->
                        <hlc-p-group><p><!----></p></hlc-p-group>
                        <hlc-div-group><div><!----></div></hlc-div-group>
                    </span></hlc-span-group>
                </div></hlc-div-group>`.replace(/\s+/g, '');
            expect(fixture.nativeElement.children[0].outerHTML).toEqual(expected);
            expect(fixture.nativeElement['children']['length']).toEqual(1);
        });
    });
});
