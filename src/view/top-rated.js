import AbstractView from "./abstract";

const createTopRatedTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section>`
);

export default class TopRated extends AbstractView {
  getTemplate() {
    return createTopRatedTemplate();
  }
}
