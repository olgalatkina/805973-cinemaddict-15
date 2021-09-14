import AbstractView from './abstract';
import { getWatchedMovies, getRank } from '../utils/common';

const createProfileTemplate = (movies) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${getRank(getWatchedMovies(movies))}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class Profile extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createProfileTemplate(this._movies);
  }
}
