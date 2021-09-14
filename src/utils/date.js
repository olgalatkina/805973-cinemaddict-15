import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getYearCreation = (releaseDate) => dayjs(releaseDate).format(YYYY);
