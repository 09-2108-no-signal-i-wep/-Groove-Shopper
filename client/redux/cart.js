import axios from "axios";

const GET_CART = "GET_CART";
const ADD_ALBUMS = "ADD_ALBUMS";
const REMOVE_ALBUMS = "REMOVE_ALBUMS";

export const getCart = cart => ({
  type: GET_CART,
  cart,
});

export const addAlbums = album => ({
  type: ADD_ALBUMS,
  album,
});

export const removeAlbums = album => ({
  type: REMOVE_ALBUMS,
  album
})

export const fetchAlbumsInCart = (userId) => async (dispatch) => {
  try {
    const { data: userAlbums } = await axios.get(`/api/cart/${userId}`);
    dispatch(getCart(userAlbums));
  } catch (error) {
    return `Error: ${error.message} || fetchAlbumsInCart`;
  }
};

export const addAlbumsToCart = (albumId, quantity) => async (dispatch) => {
  try {
    const { data: userAlbums } = await axios.post(`/api/cart/${userId}`, {
      albumId: albumId,
      quantity: quantity
    });
    dispatch(getCart(userAlbums))
  } catch (error) {
    return `Error: ${error.message} || addAlbumsToCart`;
  }
}

export const removeAlbumsFromCart = (albumId) => async (dispatch) => {
  try {
    await axios.delete('/api/cart', { data: { albumId: albumId}});
    dispatch(getCart());
  } catch (error) {
    return `Error: ${error.message} || removeAlbumsFromCart`;
  }
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ALBUMS:
      return [...state, action.album];
    case REMOVE_ALBUMS:
      return {...state, albums: state.filter(album => album.id !== action.albumId)};
    default:
      return state;
  }
}
