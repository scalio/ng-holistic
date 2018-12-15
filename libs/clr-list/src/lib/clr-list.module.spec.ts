import { async, TestBed } from '@angular/core/testing';
import { ClrListModule } from './clr-list.module';

describe('ClrListModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClrListModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(ClrListModule).toBeDefined();
    });
});
