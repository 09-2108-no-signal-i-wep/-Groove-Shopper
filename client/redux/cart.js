import axios from "axios";

const GET_ALBUMS_IN_CART = "GET_ALBUM_IN_CART";

export const getAlbumsInCart = (albums) => ({
  type: GET_ALBUMS_IN_CART,
  albums,
});

export const fetchUserAlbumsInCart = (userId) => async (dispatch) => {
  try {
    const { data: userAlbums } = await axios.get(`/api/cart/${userId}`);
    dispatch(getAlbumsInCart(userAlbums));
  } catch (error) {
    return `Error: ${error.message} || fetchAlbumsInCart`;
  }
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GET_ALBUMS_IN_CART:
      return action.cart;
    default:
      return state;
  }
}
