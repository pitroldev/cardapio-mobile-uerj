import moment from 'moment';

const MONTH_MAP = {
  JAN: 0,
  FEV: 1,
  MAR: 2,
  ABR: 3,
  MAI: 4,
  JUN: 5,
  JUL: 6,
  AGO: 7,
  SET: 8,
  OUT: 9,
  NOV: 10,
  DEZ: 11,
};

export function parseMenuDate(text: string): Date {
  const [dayText, monthText] = text.toUpperCase().split(' ');

  const day = parseInt(dayText);
  const month = MONTH_MAP[monthText as keyof typeof MONTH_MAP];
  const date = moment().set('date', day).set('month', month).toDate();

  return date;
}
