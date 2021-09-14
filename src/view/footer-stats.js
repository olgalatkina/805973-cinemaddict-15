import AbstractView from './abstract';

const createFooterStatsTemplate = (movies) => `<p>${movies.length} movies inside</p>`;

export default class FooterStats extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._movies);
  }
}
