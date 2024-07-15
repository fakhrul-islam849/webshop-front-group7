import { format } from 'date-fns-tz';

export const stringToParam = (string: any) => {
  return string.replace(/\s/g, '-');
};
export const paramToString = (string: any) => {
  return string.replace(/[^a-zA-Z0-9]/g, ' ');
};

export const formatTime = (
  time: string | Date | undefined = new Date(),
  formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
  let newDate: string | Date = new Date();
  if (typeof time !== undefined) {
    // eslint-disable-next-line no-param-reassign
    newDate = time;
  }
  if (typeof time !== 'string') {
    return format(newDate, formatPattern);
  }
  return format(new Date(newDate), formatPattern);
};
