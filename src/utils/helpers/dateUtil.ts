import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Calculates the time difference between the given date and now
 * @param dateString - Date in the format '2024-05-25T15:09:27.776+00:00'
 * @returns A string representing the time difference
 */
export const getTimeDifference = (dateString: string): string => {
  const date = parseISO(dateString);
  let distance = formatDistanceToNow(date, { addSuffix: false });
  if (distance.startsWith('about ')) {
    distance = distance.replace('about ', '');
  }
  return distance
};
