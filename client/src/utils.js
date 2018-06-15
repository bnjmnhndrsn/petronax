import moment from 'moment';

import { DATE_FORMAT, DATE_MAX, DATE_MIN } from './constants';

const DEFAULT_MAX_ELEMENT_SIZE = 1500000;
const CHROME_MAX_ELEMENT_SIZE = 1.67771e7;

const isBrowser = () => typeof window !== 'undefined';

const isChrome = () => !!window.chrome && !!window.chrome.webstore;

export const getMaxElementSize = () => {
  if (isBrowser()) {
    if (isChrome()) {
      return CHROME_MAX_ELEMENT_SIZE;
    }
  }
  return DEFAULT_MAX_ELEMENT_SIZE;
};

export const randomDate = () => {
    const range = moment(DATE_MAX, DATE_FORMAT).diff(moment(DATE_MIN, DATE_FORMAT), 'years');
    return moment().subtract(Math.floor(Math.random() * range), 'years').format(DATE_FORMAT);
};

export const isValidDate = (date) => {
    const momentObj = moment(date, DATE_FORMAT);
    if (!momentObj.isValid()){
        return false;
    }

    if (momentObj.isBefore(moment(DATE_MIN, DATE_FORMAT), 'days')) {
        return false;
    }

    if (momentObj.isAfter(moment(DATE_MAX, DATE_FORMAT), 'days')) {
        return false;
    }

    return true;
}
