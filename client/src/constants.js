import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_MIN = '1800-01-01';
export const DATE_MAX = moment().format(DATE_FORMAT);
