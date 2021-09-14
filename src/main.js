import { UpdateType } from './const';
import Api from './api/api';
import MoviesModel from './model/movies';

const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic dHJvbHlhOnF3ZXJUeV8xMjMu';

const api = new Api(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

api.getMovies()
  .then((movies) => {
    console.log(movies);
    moviesModel.setMovies(UpdateType.INIT, movies);
  });
