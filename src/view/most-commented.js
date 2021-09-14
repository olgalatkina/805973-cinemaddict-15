import AbstractView from './abstract';

const createMostCommentedTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class MostCommented extends AbstractView {
  getTemplate() {
    return createMostCommentedTemplate();
  }
}
