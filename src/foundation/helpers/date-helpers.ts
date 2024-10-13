import moment, { type MomentInput } from 'moment';

export const DateHelpers = {
    format(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ') {
        return moment(date).format(format);
    },
    formatWithoutTZ(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSS') {
        return moment.utc(date).format(format);
    },
    parse(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ') {
        return moment(
            date,
            format,
            format !== 'YYYY-MM-DDTHH:mm:ss.SSSZ',
        ).toDate();
    },
    parseUTC(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSS') {
        return moment
            .utc(date, format, format !== 'YYYY-MM-DDTHH:mm:ss.SSS')
            .toDate();
    },
    parseDate(date: MomentInput) {
        return moment.utc(date, 'YYYY-MM-DD', true);
    },
    utcNow() {
        return moment().utc().toDate();
    },
    utcMoment() {
        return moment().utc();
    },
    moment(date: Date | string) {
        return moment(date);
    },
    now() {
        return moment();
    },
};
