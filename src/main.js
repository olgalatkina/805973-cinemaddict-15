import Api from './api/api';

const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic dHJvbHlhOnF3ZXJUeV8xMjMu';

const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies()
  .then((films) => console.log(films));
