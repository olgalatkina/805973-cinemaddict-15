import { UpdateType } from './const';
import { render, RenderPosition, remove } from './utils/render';
import Api from './api/api';
import MoviesModel from './model/movies';
import CommentsModel from './model/comments';
import Cinema from './presenter/cinema';

const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic dHJvbHlhOnF3ZXJUeV8xMjMu';

const api = new Api(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const EntryNodes = {
  HEADER: document.querySelector('.header'),
  MAIN: document.querySelector('.main'),
  FOOTER: document.querySelector('.footer__statistics'),
}

const cinemaPresenter = new Cinema(EntryNodes, moviesModel, commentsModel, api);

api.getMovies()
  .then((movies) => {
    console.log('main: ', movies);
    moviesModel.setMovies(UpdateType.INIT, movies);
    cinemaPresenter.init();
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

// cinemaPresenter.init();
