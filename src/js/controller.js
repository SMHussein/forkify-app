import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { CLOSE_WINDOW_SEC } from './confiq.js';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import newRecipeView from './views/newRecipeView';
import { async } from 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result

    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarkView.update(model.state.bookmark);

    // 2) Loading recipe
    await model.getRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const getSearchResults = async function () {
  resultsView.renderSpinner();
  //Get Query
  const query = searchView.getQuery();
  if (!query) return;

  //Get Search Results
  await model.loadSearchResults(query);

  //Render Results
  resultsView.render(model.getSearchResultsPage());

  //Render Pagination
  paginationView.render(model.state.search);
};

const controlPagination = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  //update the state model
  model.updateServings(newServing);

  //update the recipeView
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  //update the bookmark
  bookmarkView.render(model.state.bookmark);
};

const bookmarksHandler = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlNewRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);

    //display recipe
    recipeView.render(model.state.recipe);

    //dipslay success message
    newRecipeView.renderSuccess();

    //render bookmarks
    bookmarkView.render(model.state.bookmark);

    //add the id to the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      newRecipeView.toggleWindow();
    }, CLOSE_WINDOW_SEC * 1000);
  } catch (err) {
    console.error('👙', err);
    newRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.handlerRender(bookmarksHandler);
  recipeView.handlerRender(getRecipe);
  recipeView.handlerUpdateServings(controlServings);
  recipeView.handlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(getSearchResults);
  paginationView.addHandlerClick(controlPagination);
  newRecipeView.handleNewRecipe(controlNewRecipe);
};

init();
