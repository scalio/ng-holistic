import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cold } from 'jasmine-marbles';
import { FormFields } from './models';
import { controlValueDependentChanges, createDepFieldsMapFromValidation } from './form-dep-fields';

describe('form-dep-fields', () => {
    describe('when config contains compare validation', () => {
        it('valid depenedncy map should be created', () => {
            const config: FormFields.FormField[] = [
                { kind: 'DateTimeField', id: 'from', label: 'Date From' },
                {
                    id: 'to',
                    kind: 'DateTimeField',
                    label: 'Date To',
                    validators: [
                        'required',
                        {
                            kind: 'CompareDateValidation',
                            compareField: 'from',
                            oper: 'lt',
                            error: 'From date must be greater than To date'
                        }
                    ]
                }
            ];
            const actual = createDepFieldsMapFromValidation(config);
            const expected = { from: ['to'] };
            expect(actual).toEqual(expected);
        });
    });
    describe('when config contains validations which not create dependency map', () => {
        it('no depenedncy map should be created', () => {
            const config: FormFields.FormField[] = [
                { kind: 'DateTimeField', id: 'from', label: 'Date From', validators: ['required'] },
                {
                    id: 'to',
                    kind: 'DateTimeField',
                    label: 'Date To',
                    validators: ['required']
                }
            ];
            const actual = createDepFieldsMapFromValidation(config);
            const expected = {};
            expect(actual).toEqual(expected);
        });
    });
    describe('when parent control value changed', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReactiveFormsModule, FormsModule]
            });
        });

        it('stream must emit correct value with [parent, [dependent]]', () => {
            const config: FormFields.FormField[] = [
                { kind: 'DateTimeField', id: 'from', label: 'Date From' },
                {
                    id: 'to',
                    kind: 'DateTimeField',
                    label: 'Date To',
                    validators: [
                        {
                            kind: 'CompareDateValidation',
                            compareField: 'from',
                            oper: 'lt',
                            error: 'From date must be greater than To date'
                        }
                    ]
                }
            ];
            const form = {
                controls: {
                    from: { key: 'from', valueChanges: cold('x-|') },
                    to: { key: 'to', valueChanges: cold('|') }
                }
            };

            const dep = createDepFieldsMapFromValidation(config);

            const changes$ = controlValueDependentChanges(dep, form as any);

            expect(changes$).toBeObservable(cold('a-|', { a: [form.controls.from, [form.controls.to]] }));
        });
    });
});
