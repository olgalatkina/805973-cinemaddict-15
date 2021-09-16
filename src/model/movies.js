import AbstractObserver from '../utils/abstract-observer';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = [...movies];
    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateFilm(updateType, update) {
    const index =  this._movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = {
      ...film,
      actors: film.film_info.actors,
      ageRating: film.film_info.age_rating,
      alternativeTitle: film.film_info.alternative_title,
      description: film.film_info.description,
      director: film.film_info.director,
      genre: film.film_info.genre,
      poster: film.film_info.poster,
      releaseDate: film.film_info.release.date,
      country: film.film_info.release.release_country,
      runtime: film.film_info.runtime,
      title: film.film_info.title,
      rating: film.film_info.total_rating,
      writers: film.film_info.writers,
      isWatched: film.user_details.already_watched,
      isFavorite: film.user_details.favorite,
      watchingDate: film.user_details.watching_date,
      isWatchlist: film.user_details.watchlist
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'actors': film.actors,
        'age_rating': film.ageRating,
        'alternative_title': film.alternativeTitle,
        'description': film.description,
        'director': film.director,
        'genre': film.genre,
        'poster': film.poster,
        'release': {
          'date': film.releaseDate,
          'release_country': film.country,
        },
        'runtime': film.runtime,
        'title': film.title,
        'total_rating': film.rating,
        'writers': film.writers,
      },
      'user_details': {
        'already_watched': film.isWatched,
        'favorite': film.isFavorite,
        'watching_date': film.watchingDate,
        'watchlist': film.watchlist,
      },
    }
  }
}
