import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import albumsReducer from "../redux/albums";
import singleAlbumReducer from "../redux/singleAlbum";
import cartReducer from "../redux/cart";
import usersReducer from "../redux/users";
import singleUserReducer from "../redux/singleUser";
import guestUsersReducer from "../redux/guestUsers";

const reducer = combineReducers({
  auth,
  albums: albumsReducer,
  singleAlbum: singleAlbumReducer,
  cart: cartReducer,
  users: usersReducer,
  emails: guestUsersReducer,
  singleUser: singleUserReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
