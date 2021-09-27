import axios from "axios";

// Action types
const GOT_ALL_ALBUMS = "GOT_ALL_ALBUMS";
const REMOVE_ALBUM = "REMOVE_ALBUM";

// Action creators
export const gotAlbums = (albums) => ({
  type: GOT_ALL_ALBUMS,
  albums,
});

const removeAlbum = (album) => {
  console.log("ashshsh", album);
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

// Reducers
export default function albumsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ALL_ALBUMS:
      return action.albums;
    case REMOVE_ALBUM: {
      return state.filter((oldAlbum) => oldAlbum.id !== action.album.id);
    }
    default:
      return state;
  }
}
