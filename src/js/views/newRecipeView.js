import icons from '../../img/icons.svg';
import view from './view.js';

class AddRecipeView extends view {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe was succesfully added :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._handlerShowWindow();
    this._handleCloseWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _handlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _handleCloseWindow() {
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  handleNewRecipe(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const Resdata = [...new FormData(this)];
      const data = Object.fromEntries(Resdata);

      handler(data);
    });
  }
}

export default new AddRecipeView();
