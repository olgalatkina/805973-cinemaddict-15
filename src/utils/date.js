import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getYearCreation = (releaseDate) => dayjs(releaseDate).format('YYYY');
export const humanizeDate = (releaseDate) => dayjs(releaseDate).format('D MMMM YYYY');
export const humanizeDateForComment = (date) => dayjs(date).format('YYYY/MM/D HH:mm'); // TODO: дописать 2 days ago/today/...
