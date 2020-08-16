import { combineReducers } from 'redux';
import locationReducer from './location';
import favoritesReducer from './favorites';
import resultsReducer from './searchResults';
import myListSearchReducer from './mylistResults';

export default combineReducers({
  location: locationReducer,
  favorites: favoritesReducer,
  search: resultsReducer,
  mylist: myListSearchReducer,
})