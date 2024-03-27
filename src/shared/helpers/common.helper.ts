import moment = require('moment');
import * as stringSimilarity from 'string-similarity';
import { IDENTIFIER_TYPE } from '../../domain/enums/common.enums';
import { ENV_PARAMS } from '../../../config/default';

export const isDateExpired = (
  date: string,
  format: string = 'YYYY-MM-DD',
): boolean => {
  const currentDate = moment().startOf('day');
  const inputDate = moment(date, format).startOf('day');

  return !currentDate.isSameOrBefore(inputDate);
};

export const splitUserName = (name) => {
  if (!name) {
    return {};
  }

  const nameParts = name.split(' ');

  if (nameParts.length === 1) {
    return {
      firstName: nameParts[0],
      middleName: '',
      lastName: '',
    };
  }

  if (nameParts.length === 2) {
    return {
      firstName: nameParts[0],
      middleName: '',
      lastName: nameParts[1],
    };
  }

  return {
    firstName: nameParts[0],
    middleName: nameParts.slice(1, -1).join(' '),
    lastName: nameParts.slice(-1).join(' '),
  };
};

export const getSplitName = (fullName: string) => {
  let firstName = '';
  let middleName = '';
  let lastName = '';
  if (fullName) {
    fullName = fullName.trim().replace('.', ' ');
    const nameSplitArray = fullName.split(' ');
    firstName = nameSplitArray[0].trim();
    if (nameSplitArray.length > 1) {
      lastName = nameSplitArray[nameSplitArray.length - 1].trim();
    }

    nameSplitArray.pop();
    nameSplitArray.shift();
    middleName = nameSplitArray.join(' ').split(',').join(' ').trim() as string;
  }
  return {
    firstName,
    lastName,
    middleName,
  };
};

export const getFullName = (
  firstName: string,
  middleName: string = '',
  lastName: string = '',
) => {
  let fullName = firstName;

  if (middleName) {
    fullName = `${fullName} ${middleName}`;
  }

  if (lastName) {
    fullName = `${fullName} ${lastName}`;
  }

  return fullName;
};

export const getLogNameSpace = (className) => `Service.${className.name}`;

export const formatLogNameSpace = (data: string[]) => {
  let log = '';
  data.forEach((el, index) => {
    log += index === data.length - 1 ? el : el + '.';
  });
  return log;
};

export const getCurrentFinancialYear = (): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Financial year starts from April (month index 3)
  let startYear;
  let endYear;
  if (currentMonth >= 3) {
    // If current month is April or later, financial year has already started
    startYear = currentYear;
    endYear = currentYear + 1;
  } else {
    // If current month is before April, financial year starts from previous year
    startYear = currentYear - 1;
    endYear = currentYear;
  }

  // Format financial year as "YYYY-YYYY" (e.g., "2022-2023")
  return `${startYear}-${endYear}`;
};

export const isInCurrentFinancialYear = (date: Date): boolean => {
  const currentYear = new Date().getFullYear();
  const financialYearStart = new Date(currentYear, 3, 1);
  const financialYearEnd = new Date(currentYear + 1, 2, 31);

  return date >= financialYearStart && date <= financialYearEnd;
};

export const addMonthsInGivenDate = (date, months) => {
  date.setMonth(date.getMonth() + months);
  return date;
};

export const addMonthsAndDaysInGivenDate = (date, months, days) => {
  date.setMonth(date.getMonth() + months);
  date.setDate(date.getDate() + days);
  return date;
};

export const getLastDateOfPreviousMonth = (): Date => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const lastDateOfPreviousMonth = new Date(currentYear, currentMonth, 0);

  return lastDateOfPreviousMonth;
};

export const addDaysInGivenDate = (date, days): Date => {
  date.setDate(date.getDate() + days);
  return date;
};

export const minusDaysInGivenDate = (date, days): Date => {
  date.setDate(date.getDate() - days);
  return date;
};

export const addHoursInGivenDate = (date, hours): Date => {
  date.setHours(date.getHours() + hours);
  return date;
};

export const getTomorrowMidnightDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  return tomorrowDate;
};

export const getTodaysDates = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(Date.now());
  return { todayStart, todayEnd };
};

export const getTodaysDatesV2 = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(Date.now());
  todayEnd.setHours(23, 59, 59, 999);

  return { todayStart, todayEnd };
};

export const getYesterdayDates = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  todayStart.setDate(todayStart.getDate() - 1);

  const todayEnd = new Date(Date.now());
  todayEnd.setHours(23, 59, 59, 999);
  todayEnd.setDate(todayEnd.getDate() - 1);

  return { yesterdayStart: todayStart, yesterdayEnd: todayEnd };
};

export const createDateFromArray = ([year, month, day]) => {
  if (year && month && day) {
    return new Date(year, month - 1, day);
  } else {
    throw new Error('Invalid date array');
  }
};

export const addYears = (date, years) => {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + years);
  return newDate;
};

export const getKeyFromValue = (obj, value) => {
  const keyArray = Object.keys(obj);
  const foundKey = keyArray.find((key) => obj[key] === value);
  return foundKey || null; // Return null if the value is not found in the object
};

export const isValidPanNumber = (panNumber) => {
  const panPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
  return panPattern.test(panNumber);
};

export const getClosestMatch = (input: string, list: string[]) => {
  const matches = stringSimilarity.findBestMatch(input, list);
  const bestMatch = matches.bestMatch.target;
  return bestMatch;
};

export const getPanIdentifier = (identifiers) => {
  return identifiers.find(
    (identifier) => identifier.type === IDENTIFIER_TYPE.PAN,
  );
};

export const getDinIdentifier = (identifiers) => {
  return identifiers.find(
    (identifier) => identifier.type === IDENTIFIER_TYPE.DIN,
  );
};

export const getIstTimeWithAmPmFormat = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
};

export const generateRandomAlphanumeric = (length) => {
  const alphanumericCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(
      Math.random() * alphanumericCharacters.length,
    );
    result += alphanumericCharacters.charAt(randomIndex);
  }
  return result;
};


export const getPartnerAndCustomerIdsFromExternalId = (externalId: string) => {
  const [partnerId = '', ...rest] = externalId.split('_');
  return {
    partnerId,
    customerId: rest.length > 0 ? rest.join('_') : '',
  };
};

