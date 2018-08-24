import { async, TestBed } from '@angular/core/testing';
import { ClrLayoutModule } from './clr-layout.module';

describe('ClrLayoutModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClrLayoutModule]
        }).compileComponents();
    }));

    it('should create', () => {
        expect(ClrLayoutModule).toBeDefined();
    });
});
