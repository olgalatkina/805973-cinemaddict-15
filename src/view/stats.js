import AbstractView from './abstract';
import { getRank,
  capitalize,
  getWatchedMovies,
  getTopGenre,
  getTotalDuration } from '../utils/common';

import { StatsFilterType } from '../const';

const createStatsFiltersItemTemplate = (type, currentStatsFilterType) => (
  `<input
    type="radio"
    class="statistic__filters-input visually-hidden"
    name="statistic-filter"
    id="statistic-${type}"
    value="${type}"
    ${type === currentStatsFilterType ? 'checked' : ''}>
  <label for="statistic-${type}" class="statistic__filters-label">${capitalize(type)}</label>`
);


const createStatsTemplate = (movies, currentStatsFilterType) => {
  const watchedMovies = getWatchedMovies(movies);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getRank(watchedMovies)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${Object.keys(StatsFilterType).map((type) => createStatsFiltersItemTemplate(type, currentStatsFilterType)).join('')}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMovies.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getTotalDuration(watchedMovies)} <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getTopGenre(watchedMovies)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
};

export default class Stats extends AbstractView { // TODO: переключение фильтров
  constructor(movies, currentStatsFilterType) {
    super();
    this._movies = movies;
    this._currentStatsFilterType = currentStatsFilterType;
  }

  getTemplate() {
    return createStatsTemplate(this._movies, this._currentStatsFilterType);
  }
}
