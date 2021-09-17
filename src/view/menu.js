import AbstractView from './abstract';
import { MenuItem } from '../const';
import { getLengthWatchList, getLengthHistoryList, getLengthFavoriteList } from '../utils/common';

const createMenuTemplate = (movies) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">${MenuItem.ALL}</a>
      <a href="#watchlist" class="main-navigation__item">${MenuItem.WATCHLIST}&nbsp;<span class="main-navigation__item-count">${getLengthWatchList(movies)}</span></a>
      <a href="#history" class="main-navigation__item">${MenuItem.HISTORY}<span class="main-navigation__item-count">${getLengthHistoryList(movies)}</span></a>&nbsp;
      <a href="#favorites" class="main-navigation__item">${MenuItem.FAVORITES}&nbsp;<span class="main-navigation__item-count">${getLengthFavoriteList(movies)}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">${MenuItem.STATS}</a>
  </nav>`
);

export default class Menu extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._movies);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._setActiveMenuItem(evt.target);
    this._callback.menuClick(evt.target); // TODO: дописать по id|dataset.value
  }

  _setActiveMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('.main-navigation__item');
    items.forEach((item) => item.classList.remove('main-navigation__item--active'));
    menuItem.classList.add('main-navigation__item--active');
  }
}
