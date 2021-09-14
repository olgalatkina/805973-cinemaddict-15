import AbstractView from './abstract';
import { SortType } from '../const';

const createSortItemTemplate = (type, currentSortType) => (
  `<li><a
    href="#"
    class="sort__button ${type === currentSortType ? 'sort__button--active' : ''}"
    data-sort-type=${type}
    >${type}</a>
  </li>`
);

const createSortTemplate = (currentSortType = SortType.DEFAULT) => (
  `<ul class="sort">
    ${Object.values(SortType).map((type) => createSortItemTemplate(type, currentSortType)).join('')}
  </ul>`
);

export default class Sort extends AbstractView { // TODO: проверить длинные строки в data-
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._setActiveSortType(evt.target);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  _setActiveSortType(sortItem) {
    const items = this.getElement().querySelectorAll('.sort__button');
    items.forEach((item) => item.classList.remove('sort__button--active'));
    sortItem.classList.add('sort__button--active');
  }
}
