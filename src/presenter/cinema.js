import ProfileView from '../view/profile';
import MenuView from '../view/menu';
import SortView from '../view/sort';
import MoviesListView from '../view/movies-list';
import FilmsContainerView from '../view/films-container';
import ShowMoreBtnView from '../view/show-more-btn';
import MessageView from '../view/message';
import MostCommentedView from '../view/most-commented';
import TopRatedView from '../view/top-rated';
import FooterStatsView from '../view/footer-stats';
import FilmPresenter from '../presenter/film';
import { remove, render, RenderPosition } from '../utils/render';
import { UpdateType , FilterType, SortType } from '../const';

export default class Cinema {
  constructor(EntryNodes, moviesModel, commentsModel, api) {
    this._headerContainer = EntryNodes.HEADER;
    this._mainContainer = EntryNodes.MAIN;
    this._footerContainer = EntryNodes.FOOTER;
    this._api = api;

    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;
    this._moviesPresenters = new Map();

    this._movieListComponent = new MoviesListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._profileComponent = null;
    this._messageComponent = null;
    this._sortComponent = null;

    this._menuComponent = new MenuView();
    this._showMoreBtnComponent = new ShowMoreBtnView();
    this._mostCommentedComponent = new MostCommentedView();
    this._topRatedComponent = new TopRatedView();
  }

  init() {
    render(this._mainContainer, this._movieListComponent, RenderPosition.BEFOREEND);
    render(this._movieListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);

    this._renderCinema();
    this._renderFooterStats();
  }

  _getMovies() {
    const movies = this._moviesModel.getMovies();
    console.log('_getMovies from presenter');
    return movies;
  }

  _renderCinema() {
    if (!this._getMovies().length) {
      this._renderMessage();
      return;
    }

    this._renderProfile();
    this._renderSort();
    this._renderMovies();
  }

  _renderProfile() {
    if (this._profileComponent !== null) {
      this._profileComponent === null;
    }

    const movies = this._getMovies();

    this._profileComponent = new ProfileView(movies);
    render(this._headerContainer, this._profileComponent, RenderPosition.BEFOREEND);
  }

  // _renderMenu() {
  //   render(this._mainContainer, )
  // }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent === null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieListComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(
      this._filmsContainerComponent,
      this._handleViewAction,
      this._handleModeChange,
      this._commentsModel,
      this._api
    );

    filmPresenter.init(film);
    this._moviesPresenters.set(film.id, filmPresenter);
  }

  _renderMovies() {
    this._getMovies().forEach((film) => this._renderFilm(film));
  }

  _renderMessage() {
    this._messageComponent = new MessageView(this._filterType);
    render(this._movieListComponent, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreBtn() {

  }

  _renderMostCommented() {

  }

  _renderTopRated() {

  }

  _renderFooterStats() {
    const movies = this._getMovies();
    render(this._footerContainer, new FooterStatsView(movies), RenderPosition.AFTERBEGIN);
  }

  _clearCinema({resetSortType = false} = {}) {
    if (resetSortType) {
      remove(this._messageComponent);
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
      case UpdateType.INIT:
       this._renderCinema();
       break;
    }
  }
}
