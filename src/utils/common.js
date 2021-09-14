import { Rank } from '../const';

const snakeToCamel = (line) => line.replace(/([-_]\w)/g, g => g[1].toUpperCase());
const camelToSnake = (line) => line.split(/(?=[A-Z])/).join('_').toLowerCase();

export const convertSnakeToCamel = (item) => {
  console.log(item.id);
  const result = {};

  Object.entries(item).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      result[snakeToCamel(key)] = convertSnakeToCamel(value);
      return;
    }
    result[snakeToCamel(key)] = value;
  });

  console.log('result: ', result);
  return result;
};

export const convertCamelToSnake = (item) => {
  const result = {};

  Object.entries(item).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      result[camelToSnake(key)] = convertSnakeToCamel(value);
      return;
    }
    result[camelToSnake(key)] = value;
  });

  return result;
};

export const getWatchedMovies = (movies) => movies.filter((film) => film.isWatched);

export const getRank = (movies) => {
  const amount = movies.length;

  switch (amount) {
    case (amount === 0):
      return Rank.NOTHING;
    case (amount > 0 && amount <= 10):
      return Rank.NOVICE;
    case (amount > 10 && amount <= 20):
      return Rank.FAN;
    case (amount > 20):
      return Rank.MUVI_BUFF;
  }

  return Rank.NOTHING;
};

export const getLengthWatchList = (movies) => movies.filter((film) => film.isWatchlist).length;
export const getLengthHistoryList = (movies) => movies.filter((film) => film.isWatched).length;
export const getLengthFavoriteList = (movies) => movies.filter((film) => film.isFavorite).length;

export const getFilmDuration = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const isHours = hours > 0;
  return `${isHours ? hours : ''}${isHours ? 'h' : ''} ${minutes}m`;
};

export const capitalize = (text) => `${text[0].toUpperCase()}${text.substr(1)}`;

export const getTotalDuration = (movies) => getFilmDuration(movies
  .reduce((acc, film) => acc + film.runtime, 0));

const getStatsByGenre = (movies) => {
  const stats = {};
  movies.forEach((film) => film.genre.forEach((genre) => stats[genre] ? stats[genre] += 1 : stats[genre] = 1));

  return stats;
}

const compareByGenre = (itemA, itemB) => itemB[1] - itemA[1];

export const getTopGenre = (movies) => {
  const stats = getStatsByGenre(movies);
  return Object.entries(stats).sort(compareByGenre)[0][0];
}
