import FilmView from '../view/film';
import { render, remove, replace, RenderPosition } from '../utils/render';
import { UpdateType, UserAction, Mode } from '../const';

export default class Film {
  constructor(filmsContainer, changeData, changeMode, commentsModel, api) {
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;
    this._api = api;

    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
  }

  init(film) {
    this._film = film;
    // this._api.getComments(this._film).then((comments) => {
    //   console.log('comments: ', comments);
    //   this._commentsModel.setComments(comments);
    // });

    this._filmComponent = new FilmView(film);
    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }
}
