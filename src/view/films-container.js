import AbstractView from "./abstract";

const createFilmsContainerTemplate = () => '<div class="films-list__container"></div>';

export class FilmsContainer extends AbstractView {
  getTemplate() {
    return createMoviesContainerTemplate();
  }
}
