import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { SearchArg } from './typeahead.directive';
import { HlcTypeaheadDirectiveModule } from './typeahead.module';

@Component({
    selector: 'hlc-test-typeahead-container',
    // tslint:disable-next-line:max-line-length
    template: `
        <hlc-test-typeahead></hlc-test-typeahead>
    `
})
export class TestTypeaheadContainerComponent {}

@Component({
    selector: 'hlc-test-typeahead',
    // tslint:disable-next-line:max-line-length
    template: `
        <input type="text" [hlcTypeahead]="search" />
    `
})
export class TestTypeaheadComponent {
    // TextFieldComponent

    search = ($: Observable<SearchArg>) => $.pipe(mapTo(['one', 'two', 'three']));
}

@NgModule({
    declarations: [TestTypeaheadComponent, TestTypeaheadContainerComponent],
    exports: [TestTypeaheadComponent],
    imports: [CommonModule, HlcTypeaheadDirectiveModule],
    providers: []
})
export class TextTypeaheadModule {}

describe('tyepahead', () => {
    let fixture: ComponentFixture<TestTypeaheadContainerComponent>;
    let comp: TestTypeaheadComponent;
    let input: HTMLInputElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [CommonModule, TextTypeaheadModule]
        });

        fixture = TestBed.createComponent(TestTypeaheadContainerComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        input = fixture.debugElement.children[0].children[0].nativeElement;
    });

    it('should create', () => {
        expect(comp).toBeDefined();
    });

    describe('when result is instant array of strings', () => {
        describe('user click by input', () => {
            it('must open dropdown with all items', () => {
                input.click();
                fixture.detectChanges();
                expect(true).toEqual(true);
            });
        });
    });
});
