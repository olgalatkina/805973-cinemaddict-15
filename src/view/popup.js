import he from 'he';
import SmartView from './smart';
import { EmojiList } from '../const';
import { humanizeDate, humanizeDateForComment } from '../utils/date';
import { getFilmDuration } from '../utils/common';

const createGenresTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const createCommentsTemplate = (COMMENTS, isDeleting) => {
  return COMMENTS.map(({id, author, comment, date, emotion}) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDateForComment(date)}</span>
          <button
            class="film-details__comment-delete"
            data-comment-id="${id}">${isDeleting ? 'Deliting' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  )).join('');
};

const createEmojiListTemplate = (isDisabled) => {
  return Object.values(EmojiList).map((emotion) => (
    `<input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emotion}"
      value="${emotion}"
      ${isDisabled ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`
  )).join('');
};

const createPopupTemplate = ({
  id,
  comments,
  actors,
  ageRating,
  alternativeTitle,
  description,
  director,
  genre,
  poster,
  releaseDate,
  country,
  runtime,
  title,
  rating,
  writers,
  isWatched,
  isFavorite,
  watchingDate,
  isWatchlist,
  isDeleting,
  isDisabled,
  emoji}, COMMENTS) => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${alternativeTitle}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDate(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFilmDuration(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">${genre.map(createGenresTemplate).join('')}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button
            type="button"
            class="film-details__control-button
            ${isWatchlist ? 'film-details__control-button--active' : ''}
              film-details__control-button--watchlist"
            id="watchlist"
            name="watchlist">Add to watchlist</button>
          <button
            type="button"
            class="film-details__control-button
              ${isWatched ? 'film-details__control-button--active' : ''}
              film-details__control-button--watched"
            id="watched"
            name="watched">Already watched</button>
          <button
            type="button"
            class="film-details__control-button
              ${isFavorite ? 'film-details__control-button--active' : ''}
              film-details__control-button--favorite"
            id="favorite"
            name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments
            <span class="film-details__comments-count">${comments.length}</span>
          </h3>

          <ul class="film-details__comments-list">
            ${createCommentsTemplate(COMMENTS, isDeleting)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea
                class="film-details__comment-input"
                placeholder="Select reaction below and write comment here"
                name="comment"
                value="${he.encode(newComment)}">${newComment ? newComment : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              ${createEmojiListTemplate(isDisabled)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
);

export default class Popup extends SmartView {
  constructor(film, COMMENTS) {
    super();
    this._film = Popup.parseFilmToState(film);
    this._comments = COMMENTS;

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._film, this._comments);
  }

  reset(film) {
    this.updateState(Popup.parseFilmToState(film));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseBtnClickHandler();
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closePopup = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeBtnClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('#watchlist').addEventListener('click', this._addToWatchlistClickHandler);
    this.getElement().querySelector('#watched').addEventListener('click', this._alreadyWatchedClickHandler);
    this.getElement().querySelector('#favorite').addEventListener('click', this._addToFavoriteClickHandler);
    this.getElement().querySelector('.film-details__comments-list')
      .addEventListener('clisk', this._deleteCommentClickHandler);
    this.getElement().querySelector('.film-details__emoji-list')
      .addEventListener('click', this._selectEmojiClickHandler);
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
    this.getElement().querySelector('form').addEventListener('keydown', this._addCommentHandler);
  }

  _closeBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopup();
  }

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();
    const {commentId} = Number(evt.target.dataset);
    this.updateState({comments: [...this._film.comments.filter((comment) => comment !== commentId)]});
  }

  _addCommentHandler(evt) {
    evt.preventDefault();
    if (evt.key === 'Enter' && (evt.metakey === true || evt.ctrlKey === true)) {
      // TODO: вынести отдельно обработку comments?
    }
    this.updateState({});
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this.updateState({isWatchlist: !isWatchlist});
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this.updateState({isWatched: !isWatched});
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateState({isFavorite: !isFavorite});
  }

  _selectEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateState({emoji: evt.target.value});
  }

  _commentInputHandler(evt) { // TODO: вынести отдельно обработку comments?
    evt.preventDefault();
    this.updateState({newComment: evt.target.value}, true);
  }

  static parseFilmToState(film) {
    return {
      ...film,
      isDeleting: false,
      isDisabled,
      emoji: '',
      newComment: '',
    }
  }

  static parseStateToFilm(state) {
    state = {...state};
    delete state.isDeleting;
    delete state.isDisabled;
    delete state.newComment;
    delete state.emoji;

    return state;
  }
}
