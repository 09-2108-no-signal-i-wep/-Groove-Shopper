import axios from 'axios';

// Action types
const GOT_ALL_ALBUMS = 'GOT_ALL_ALBUMS';

// Action creators
export const gotAlbums = (albums) => ({
  type: GOT_ALL_ALBUMS,
  albums,
});

// Thunks
export const fetchAlbums = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/albums");
    dispatch(gotAlbums(data));
  } catch(error) {
    return `Error: ${error.message} || fetchAlbums`
  }
}

// Reducers
export default function albumsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ALL_ALBUMS:
      return action.albums;
      default: return state;
  }
}
