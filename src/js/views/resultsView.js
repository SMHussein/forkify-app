// import icons from '../../img/icons.svg';
// import view from './view.js';

// class ResultsView extends view {
//   _parentEl = document.querySelector('.results');
//   _errorMessage = 'No results with such name, please try another time';
//   _message = '';

//   _createMarkup() {
//     return this._data.map(res => this._generateMarkup(res)).join('');
//   }

//   _generateMarkup(res) {
//     const id = window.location.hash.slice(1);
//     return `
//     <li class="preview">
//           <a class="preview__link ${
//             id === res.id ? 'preview__link--active' : ''
//           }" href="#${res.id}">
//             <figure class="preview__fig">
//               <img src="${res.imageUrl}" alt="${res.title}" />
//             </figure>
//             <div class="preview__data">
//               <h4 class="preview__title">${res.title}</h4>
//               <p class="preview__publisher">${res.publisher}</p>

//             </div>
//           </a>
//         </li>`;
//   }
// }

// export default new ResultsView();

import previewView from './previewView.js';

class ResultsView extends previewView {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No results with such name, please try another time';
  _message = '';

  _createMarkup() {
    return this._data.map(this._generateMarkup).join('');
  }
}

export default new ResultsView();
