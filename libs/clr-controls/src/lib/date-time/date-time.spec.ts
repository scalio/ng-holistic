import { format as formatDate, parse as parseDate } from 'date-fns/esm/fp';

describe('date-time', () => {
    it('date format with date-fns must works', () => {
        const dateStr = '2018-08-25T10:46:00.000Z';
        // tslint:disable-next-line:quotemark
        const formatStr = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
        const date = parseDate(new Date())(formatStr)(dateStr);

        const actual = formatDate(formatStr)(date);

        expect(dateStr).toBe(actual);
    });
});
