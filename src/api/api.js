import { Sourses, Method } from '../const';
import MoviesModel from '../model/movies';

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({
      url: Sourses.MOVIES,
    })
      .then(Api.toJSON)
      .then((films) => films.map(MoviesModel.adaptToClient));
  }

  // getComments() {
  //   return this._load({
  //     url: Sourses.COMMENTS,
  //   })
  //     .then(Api.toJSON);
  // }

  // getData() {
  //   return Promise.all([
  //     this.getMovies(),
  //     this.getComments(),
  //   ])
  //     .catch(Api.catchError);
  // }

  updateMovie(film) {
    return this._load({
      url: `${Sourses.MOVIES}/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  sync(data) {
    return this._load({
      url: `${Sourses.MOVIES}/${Sourses.SYNC}`,
      method: `${Method.POST}`,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  addComment(comment) {
    return this._load({
      url: `${Sourses.COMMENTS}/${comment.id}`,
      method: `${Method.POST}`,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  deleteComment(comment) {
    return this._load({
      url: `${Sourses.COMMENTS}/${comment.id}`,
      method: `${Method.DELETE}`,
    })
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
