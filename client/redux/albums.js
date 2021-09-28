import axios from "axios";

// Action types
const GOT_ALL_ALBUMS = "GOT_ALL_ALBUMS";
const ADD_ALBUM_TO_CART = "ADD_ALBUM_TO_CART";
const CREATE_ALBUM = "CREATE_ALBUM";
const REMOVE_ALBUM = "REMOVE_ALBUM";

// Action creators
export const gotAlbums = (albums) => ({
  type: GOT_ALL_ALBUMS,
  albums,
});

export const addAlbumToCart = (album) => ({
  type: ADD_ALBUM_TO_CART,
  album,
});

export const addAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    album,
  };
};

export const removeAlbum = (album) => {
  return {
    type: REMOVE_ALBUM,
    album,
  };
};

// Thunks
export const fetchAlbums = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/albums");
    dispatch(gotAlbums(data));
  } catch (error) {
    return `Error: ${error.message} || fetchAlbums`;
  }
};

export const addAlbumCart = () => async (dispatch) => {
  try {
    let localCart = localStorage.getItem("CART");
    let cartItems = [];
    if (!localCart) {
      localStorage.setItem("CART", cartItems);
    } else {
      let existingCart = JSON.parse(localStorage.getItem("CART"));
      existingCart.push("test 2");
      localStorage.setItem("CART", JSON.stringify(existingCart));
    }
  } catch (error) {
    return `Error: ${error.message} || addAlbumCart`;
  }
};

export const createAlbum = (album) => {
  return async (dispatch) => {
    try {
      const { data: newAlbum } = await axios.post("/api/albums", album);
      dispatch(addAlbum(newAlbum));
    } catch (error) {
      console.log("ADD album thunk error", error);
    }
  };
};

export const deleteAlbum = (albumId) => {
  return async (dispatch) => {
    try {
      const { data: toBeDeletedAlbum } = await axios.delete("/api/albums", {
        data: { id: albumId }, // might need ot check this line
      });

      dispatch(removeAlbum(toBeDeletedAlbum));
    } catch (error) {
      console.log("delete album thunk error", error);
    }
  };
};

// FOR LOGGED IN USERS
// const { data } = await axios.post(`/api/cart/${userId}`); // Look back later
// dispatch(addAlbumToCart(data));

// Reducers
export default function albumsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ALL_ALBUMS:
      return action.albums;
    case CREATE_ALBUM:
      return [...state, action.album];
    case ADD_ALBUM_TO_CART:
      return { state: [...state, action.cart] }; // Look back later
    case REMOVE_ALBUM:
      return state.filter((album) => album.id !== action.album.id);
    default:
      return state;
  }
}
