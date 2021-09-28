import axios from "axios";

const GET_SINGLE_ALBUM = "GET_SINGLE_ALBUM";
const UPDATE_ALBUM = "UPDATE_ALBUM";

const getSingleAlbum = (singleAlbum) => {
  return {
    type: GET_SINGLE_ALBUM,
    singleAlbum,
  };
};

const updateAlbum = (singleAlbum) => {
  return {
    type: UPDATE_ALBUM,
    singleAlbum,
  };
};

// thunk
const fetchSingleAlbum = (albumId) => {
  console.log("INSIDE FETCH SINGLE ALBUM");
  return async (dispatch) => {
    try {
      const { data: singleAlbum } = await axios.get(`/api/albums/${albumId}`);
      console.log(singleAlbum);
      dispatch(getSingleAlbum(singleAlbum));
    } catch (error) {
      console.log("fetch single album error", error);
    }
  };
};

const updateSingleAlbum = (album, albumId) => {
  return async (dispatch) => {
    try {
      console.log('aslbums thunk', album)
      const { data: updatedAlbum } = await axios.put(
        `/api/albums/${albumId}`,
        album
      );
      dispatch(updateAlbum(updatedAlbum));
    } catch (error) {
      `Error ${error.message} || update album thunk`;
    }
  };
};

const singleAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ALBUM: {
      return action.singleAlbum;
    }
    case UPDATE_ALBUM: {
      return action.singleAlbum;
    }
    default:
      return state;
  }
};

export default singleAlbumReducer;
export { fetchSingleAlbum, updateSingleAlbum };
