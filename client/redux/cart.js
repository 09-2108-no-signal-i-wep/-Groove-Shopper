import axios from "axios";

// setting common token in axios
const token = window.localStorage.getItem("token");
//axios.defaults.headers.common["Authorization"] = token;

// actions
const GET_CART = "GET_CART";
const ADD_ALBUMS = "ADD_ALBUMS";
const REMOVE_ALBUMS = "REMOVE_ALBUMS";

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const addAlbums = (albums) => ({
  type: ADD_ALBUMS,
  albums,
});

export const removeAlbums = (album) => ({
  type: REMOVE_ALBUMS,
  album,
});

export const fetchAlbumsInCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cart/user`, {
      headers: {
        authorization: token,
      },
    });
    // need to pass headers here
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
      userId: album.userId,
    });
    dispatch(addAlbums(data));
  } catch (error) {
    return `Error: ${error.message} || addAlbumsToCart`;
  }
};

export const removeAlbumsFromCart = (albumId) => async (dispatch) => {
  try {
    const { data: toBeDeleted } = await axios.delete(`/api/cart/remove`, {
      data: { id: albumId },
    });

    dispatch(removeAlbums(toBeDeleted));
  } catch (error) {
    return `Error: ${error.message} || removeAlbumsFromCart`;
  }
};
//
export const checkout = () => {
  return async () => {
    try {
      const { data: checkoutCart } = await axios.put("/api/cart/checkout");
    } catch (error) {
      return `Error ${error.message}`;
    }
  };
};

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ALBUMS:
      return action.albums;
    case REMOVE_ALBUMS:
      return state.filter((album) => album.id !== action.album.id);
    default:
      return state;
  }
}
