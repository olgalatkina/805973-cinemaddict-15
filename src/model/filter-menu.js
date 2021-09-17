import AbstractObserver from '../utils/abstract-observer';
import { FilterType } from '../const';

export default class FilterMenu extends AbstractObserver {
  constructor() {
    super();
    this._checkedFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._checkedFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._checkedFilter;
  }
}
