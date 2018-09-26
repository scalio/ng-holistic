import { FormFields } from './models';
import { emptyValue } from './form-builder';

describe('form-builder', () => {

    /*
    describe('when build from simple config', () => {
        it('should create valid controls', () => {
            const config: FormFields.FormField[] = [{ kind: 'TextField', id: 'text', label: 'Text' }];
            const actual = buildControlsConfig(config);
            const expected = { text: [null, []] };
            expect(actual).toEqual(expected);
        });
        describe('with required validation', () => {
            it('should create valid controls with validation object', () => {
                const config: FormFields.FormField[] = [
                    { kind: 'TextField', id: 'text', label: 'Text', validators: ['required'] }
                ];
                const actual = buildControlsConfig(config);
                expect(actual.text).toBeDefined();
                expect(actual.text[1]).toBeDefined();
                expect(typeof actual.text[1]).toBe('object');
            });
        });
    });
    describe('when build from complex config', () => {
        it('should create valid controls', () => {
            const config: FormFields.FormField[] = [
                { kind: 'TextField', id: 'text', label: 'Text' },
                { kind: 'DateField', id: 'date', label: 'Date' },
                { kind: 'SelectField', id: 'select', label: 'Select', items: [] }
            ];
            const actual = buildControlsConfig(config);
            const expected = { text: [null, []], date: [null, []], select: [null, []] };
            expect(actual).toEqual(expected);
        });
    });
    */
    describe('when build from empty value from config', () => {
        it('should create correct empty object', () => {
            const config: FormFields.FormField[] = [
                { kind: 'TextField', id: 'text', label: 'Text' },
                { kind: 'DateField', id: 'date', label: 'Date' },
                { kind: 'SelectField', id: 'select', label: 'Select', items: [] }
            ];
            const actual = emptyValue(config);
            const expected = { text: null, date: null, select: null };
            expect(actual).toEqual(expected);
        });
    });
});
