import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTableComponent } from './list-table.component';
import { ListTableModule } from './list-table.module';
import { TableConfig } from './list-table.types';

describe('list-table', () => {
    let fixture: ComponentFixture<ListTableComponent>;
    let comp: ListTableComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [],
            imports: [ListTableModule]
        });

        fixture = TestBed.createComponent(ListTableComponent);
        comp = fixture.componentInstance;
    });

    it('should create', () => {
        expect(comp).toBeDefined();
    });

    describe('when initialized with config of single column ', () => {
        beforeEach(() => {
            const listConfig: TableConfig = {
                cols: [
                    {
                        id: 'id',
                        type: 'Text',
                        title: 'Id'
                    }
                ]
            };

            comp.config = listConfig;
            comp.items = [];
            fixture.detectChanges();
        });

        it('must render table with one column and correct title', () => {
            const cols = fixture.nativeElement.querySelectorAll('clr-dg-column');

            expect(cols.length).toEqual(1);
            expect(cols[0].textContent).toEqual(' Id ');
        });
    });

    describe('when initialized with config of multiple columns', () => {
        beforeEach(() => {
            const listConfig: TableConfig = {
                cols: [
                    {
                        id: 'id',
                        type: 'Text',
                        title: 'Id'
                    },
                    {
                        id: 'id',
                        type: 'Text',
                        title: 'Title'
                    }
                ]
            };

            comp.config = listConfig;
            comp.items = [];
            fixture.detectChanges();
        });

        it('must render table with multiple columns and correct titles', () => {
            const cols = fixture.nativeElement.querySelectorAll('clr-dg-column');

            expect(cols.length).toEqual(2);
            expect(cols[0].textContent).toEqual(' Id ');
            expect(cols[1].textContent).toEqual(' Title ');
        });
    });
});
