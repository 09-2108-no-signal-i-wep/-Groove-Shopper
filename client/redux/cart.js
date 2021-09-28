import axios from "axios";

const GET_CART = "GET_CART";
const ADD_ALBUMS = "ADD_ALBUMS";
const REMOVE_ALBUMS = "REMOVE_ALBUMS";

export const getCart = cart => ({
  type: GET_CART,
  cart,
});

export const addAlbums = albums => ({
  type: ADD_ALBUMS,
  albums,
});

export const removeAlbums = album => ({
  type: REMOVE_ALBUMS,
  album
})

export const fetchAlbumsInCart = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart/user/${userId}`);
    dispatch(getCart(data));
  } catch (error) {
    return `Error: ${error.message} || fetchAlbumsInCart`;
  }
};

export const addAlbumsToCart = (album) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/cart/add`, {
      albumId: album.id,
      quantity: album.quantity,
      cost: album.cost,
      userId: album.userId
    });
    dispatch(addAlbums(data))
  } catch (error) {
    return `Error: ${error.message} || addAlbumsToCart`;
  }
}

export const removeAlbumsFromCart = (albumId) => async (dispatch) => {
  try {
    await axios.delete(`/api/cart/remove/${albumId}`);
    dispatch(removeAlbums());
  } catch (error) {
    return `Error: ${error.message} || removeAlbumsFromCart`;
  }
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ALBUMS:
      return action.albums;
    case REMOVE_ALBUMS:
      return {...state, albums: state.filter(album => album.id !== action.albumId)};
    default:
      return state;
  }
}
