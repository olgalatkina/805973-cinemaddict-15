import AbstractView from "./abstract";
import { getYearCreation } from '../utils/date';
import { getFilmDuration } from '../utils/common';

const createFilmTemplate = ({title, totalRairing, releaseDate, runtime, genre, poster, description, comments}) => (
    `<article class="film-card">totalRairing
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRairing}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getYearCreation(releaseDate)}</span>
      <span class="film-card__duration">${getFilmDuration(runtime)}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`
);

export class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._markAsFavoriteClickHandler = this._markAsFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlist = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._addToWatchlistClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatched = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._markAsWatchedClickHandler);
  }

  setMarkAsFavoriteClickHandler(callback) {
    this._callback.markAsFavorite = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._markAsFavoriteClickHandler);
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlist();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.markAsWatched();
  }

  _markAsFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.markAsFavorite();
  }
}
