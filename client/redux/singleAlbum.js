import axios from "axios";

const GET_SINGLE_ALBUM = "GET_SINGLE_ALBUM";

const getSingleAlbum = (singleAlbum) => {
  return {
    type: GET_SINGLE_ALBUM,
    singleAlbum,
  };
};

// thunk
const fetchSingleAlbum = (albumId) => {
  console.log("INSIDE FETCH SINGLE ALBUM");
  return async (dispatch) => {
    try {
      const { data: singleAlbum } = await axios.get(`/api/albums/${albumId}`);
      console.log(singleAlbum)
      dispatch(getSingleAlbum(singleAlbum));
    } catch (error) {
      console.log("fetch single album error", error);
    }
  };
};

const singleAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_ALBUM: {
      return action.singleAlbum;
    }
    default:
      return state;
  }
};

export default singleAlbumReducer;
export { fetchSingleAlbum };
