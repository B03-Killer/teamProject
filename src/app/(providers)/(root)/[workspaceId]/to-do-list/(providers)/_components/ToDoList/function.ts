import dayjs, { Dayjs } from 'dayjs';

const changeDateStr = (start: string, end: string): string => {
  const startTime = dayjs(start).format('HH:mm');
  const endTime = dayjs(end).format('HH:mm');

  return `${startTime} ~ ${endTime}`;
};

const isDateSelected = (start: string, end: string, selectedDate: Dayjs): boolean => {
  const startDate = dayjs(start).format('YYYY-MM-DD');
  const endDate = dayjs(end).format('YYYY-MM-DD');
  const selectedDateForm = selectedDate.format('YYYY-MM-DD');

  return startDate === selectedDateForm && endDate === selectedDateForm;
};

export { changeDateStr, isDateSelected };
