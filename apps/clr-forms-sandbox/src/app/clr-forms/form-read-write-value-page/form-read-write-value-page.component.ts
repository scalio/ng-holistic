import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { TextMask } from '@ng-holistic/clr-controls';
import { ClrFormLayouts, HlcClrFormComponent } from '@ng-holistic/clr-forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DataService } from './data.service';
// This is for the sample info, ignore it
import * as CONSTANTS from './form-read-write-value-page.consts';

const definition: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something'
            },
            validators: [Validators.required]
        },
        {
            id: 'num',
            kind: 'MaskField',
            props: {
                label: 'Number',
                placeholder: '0000000',
                mask: TextMask.int(7),
                unmask: TextMask.unmaskNumber
            }
        }
    ]
};

@Component({
    selector: 'hlc-form-read-write-value-page',
    templateUrl: './form-read-write-value-page.component.html',
    styleUrls: ['./form-read-write-value-page.component.scss']
})
export class FormReadWriteValuePageComponent implements AfterViewInit, OnDestroy {
    private readonly destroy$ = new Subject();

    // This is for the sample info, ignore it
    CONSTANTS = CONSTANTS;
    definition = definition;

    @ViewChild(HlcClrFormComponent, { static: false }) hlcClrForm: HlcClrFormComponent;

    constructor(private readonly dataService: DataService) {}

    ngAfterViewInit(): void {
        //Subscribe to value changes
        this.hlcClrForm.formGroup.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => console.log(JSON.stringify(val, null, 2)));

        this.dataService
            .loadData()
            .pipe(
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe(val => {
                if (val) {
                    this.hlcClrForm.formGroup.setValue(val);
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    onSave(val: any) {
        this.dataService.saveData(val);
    }
}
