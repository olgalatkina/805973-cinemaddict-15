import AbstractView from './abstract';

const createLoadingTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

export default class loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
