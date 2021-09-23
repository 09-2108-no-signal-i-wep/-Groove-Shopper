import axios from 'axios';

// Action types
const GOT_ALL_ALBUMS = 'GOT_ALL_ALBUMS';
const ADD_ALBUM_TO_CART = 'ADD_ALBUM_TO_CART';

// Action creators
export const gotAlbums = (albums) => ({
  type: GOT_ALL_ALBUMS,
  albums,
});

export const addAlbumToCart = (album) => ({
  type: ADD_ALBUM_TO_CART,
  album,
});

// Thunks
export const fetchAlbums = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/albums');
    dispatch(gotAlbums(data));
  } catch (error) {
    return `Error: ${error.message} || fetchAlbums`;
  }
};

export const addAlbumCart = () => async (dispatch) => {
  try {
    let localCart = localStorage.getItem('CART')
    let cartItems = [];
    if (!localCart) {
      localStorage.setItem('CART', cartItems)
    } else {
      let existingCart = JSON.parse(localStorage.getItem('CART'))
      existingCart.push('test 2')
      localStorage.setItem('CART', JSON.stringify(existingCart))
    }
  } catch (error) {
    return `Error: ${error.message} || addAlbumCart`;
  }
}



// FOR LOGGED IN USERS
// const { data } = await axios.post(`/api/cart/${userId}`); // Look back later
// dispatch(addAlbumToCart(data));

// Reducers
export default function albumsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ALL_ALBUMS: return action.albums;
    case ADD_ALBUM_TO_CART: return { state: [...state, action.cart] }; // Look back later
    default: return state;
  }
}
