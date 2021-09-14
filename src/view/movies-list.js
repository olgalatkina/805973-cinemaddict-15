import AbstractView from './abstract';

const createMoviesListTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);


export class MoviesList extends AbstractView {
  getTemplate() {
    return createMoviesListTemplate();
  }
}
