import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import albumsReducer from '../redux/albums';
import singleAlbumReducer from '../redux/singleAlbum';
import cartReducer from '../redux/cart';

const reducer = combineReducers({
  auth,
  albums: albumsReducer,
  singleAlbum: singleAlbumReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
