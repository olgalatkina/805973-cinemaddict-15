import AbstractView from './abstract';
import { FilterType } from '../const';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
}

const createMessageTemplate = (filterType) => {
  const message = NoFilmsTextType[filterType];

  return `<h2 class="films-list__title">${message}</h2>`
}

export default class Message extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  getTemplate() {
    return createMessageTemplate(this._filterType);
  }
}
