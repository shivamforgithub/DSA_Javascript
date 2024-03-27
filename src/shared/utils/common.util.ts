// tslint:disable-next-line: no-var-requires
// const CronJob = require('cron').CronJob;

export const getDateInYYYYMMDDFormat = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getUTCDate = () => {
  return new Date(new Date().toUTCString().slice(0, -3));
};

export const isValidCronExpression = (cronExpression: string) => {
  try {
    // const job = new CronJob({
    //   cronTime: cronExpression,
    //   onTick: () => null,
    // });
    return true;
  } catch (err) {
    return false;
  }
};

export function parseJwt(token) {
  const parsedJwt = token
    ? JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    : null;
  return parsedJwt;
}

export const extractPostalCode = (address: string) => {
  // Regular expression pattern to match the PIN code
  const postalCodePattern = /\b\d{6}\b/;
  const postalCodeCodeMatch = address.match(postalCodePattern);

  return postalCodeCodeMatch ? Number(postalCodeCodeMatch[0]) : null;
};
