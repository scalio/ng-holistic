import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormFooterDataAccess } from '@ng-holistic/clr-common';
import { TextMask } from '@ng-holistic/clr-controls';
import { ClrFormLayouts, HlcClrFormComponent } from '@ng-holistic/clr-forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DataService } from './data.service';
// This is for the sample info, ignore it
import * as CONSTANTS from './form-footer-page.consts';

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
    selector: 'hlc-form-footer-page',
    templateUrl: './form-footer-page.component.html',
    styleUrls: ['./form-footer-page.component.scss']
})
export class FormFooterPageComponent implements AfterViewInit, OnDestroy {
    private readonly destroy$ = new Subject();

    // This is for the sample info, ignore it
    readonly CONSTANTS = CONSTANTS;
    readonly definition = definition;
    readonly dataAccess: FormFooterDataAccess;

    @ViewChild(HlcClrFormComponent, { static: false }) hlcClrForm: HlcClrFormComponent;

    constructor(private readonly dataService: DataService) {
        this.dataAccess = {
            update(data: any) {
                return dataService.saveData(data);
            }
        };
    }

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
}
