import { async, TestBed } from '@angular/core/testing';
import { ClrListsModule } from './clr-lists.module';

describe('ClrListsModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClrListsModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(ClrListsModule).toBeDefined();
    });
});
