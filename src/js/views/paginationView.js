import icons from '../../img/icons.svg';
import view from './view.js';

class PaginationView extends view {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(hanlder) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      hanlder(+btn.dataset.goto);
    });
  }

  _createMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.recipes.length / this._data.resultsPerPage
    );
    //First page and others
    if (curPage === 1 && curPage < numPages)
      return this._createNextMarkup(curPage);
    //last Page
    if (curPage === numPages && numPages > 1) {
      return this._createPrevMarkup(curPage);
    }
    //Between First and Last
    if (curPage > 1 && curPage < numPages)
      return this._createPrevMarkup(curPage) + this._createNextMarkup(curPage);
    //First Page and not others
    return;
  }

  _createNextMarkup(curPage) {
    return `<button class="btn--inline pagination__btn--next" data-goto="${
      curPage + 1
    }">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>`;
  }

  _createPrevMarkup(curPage) {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto="${
      curPage - 1
    }">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>`;
  }
}

export default new PaginationView();
