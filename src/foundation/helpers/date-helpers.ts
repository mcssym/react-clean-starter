import moment, { type MomentInput } from 'moment';

/**
 * Helper functions for date manipulation using moment.js.
 */
export const DateHelpers = {
    /**
     * Formats a date into a specified format.
     * @param {MomentInput} date - The date to format.
     * @param {string} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - The format to use.
     * @returns {string} The formatted date string.
     */
    format(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'): string {
        return moment(date).format(format);
    },

    /**
     * Formats a date into a specified format without timezone information.
     * @param {MomentInput} date - The date to format.
     * @param {string} [format='YYYY-MM-DDTHH:mm:ss.SSS'] - The format to use.
     * @returns {string} The formatted date string without timezone information.
     */
    formatWithoutTZ(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSS'): string {
        return moment.utc(date).format(format);
    },

    /**
     * Parses a date string into a Date object.
     * @param {MomentInput} date - The date string to parse.
     * @param {string} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - The format of the date string.
     * @returns {Date} The parsed Date object.
     */
    parse(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'): Date {
        return moment(date, format, format !== 'YYYY-MM-DDTHH:mm:ss.SSSZ').toDate();
    },

    /**
     * Parses a date string into a Date object in UTC.
     * @param {MomentInput} date - The date string to parse.
     * @param {string} [format='YYYY-MM-DDTHH:mm:ss.SSS'] - The format of the date string.
     * @returns {Date} The parsed Date object in UTC.
     */
    parseUTC(date: MomentInput, format = 'YYYY-MM-DDTHH:mm:ss.SSS'): Date {
        return moment.utc(date, format, format !== 'YYYY-MM-DDTHH:mm:ss.SSS').toDate();
    },

    /**
     * Parses a date string into a moment object in UTC.
     * @param {MomentInput} date - The date string to parse.
     * @returns {moment.Moment} The parsed moment object in UTC.
     */
    parseDate(date: MomentInput): moment.Moment {
        return moment.utc(date, 'YYYY-MM-DD', true);
    },

    /**
     * Gets the current date and time in UTC.
     * @returns {Date} The current date and time in UTC.
     */
    utcNow(): Date {
        return moment().utc().toDate();
    },

    /**
     * Gets the current moment object in UTC.
     * @returns {moment.Moment} The current moment object in UTC.
     */
    utcMoment(): moment.Moment {
        return moment().utc();
    },

    /**
     * Creates a moment object from a date or string.
     * @param {Date | string} date - The date or string to create the moment object from.
     * @returns {moment.Moment} The created moment object.
     */
    moment(date: Date | string): moment.Moment {
        return moment(date);
    },

    /**
     * Gets the current moment object.
     * @returns {moment.Moment} The current moment object.
     */
    now(): moment.Moment {
        return moment();
    },
};