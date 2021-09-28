import axios from "axios";

const GET_SINGLE_USER = "GET_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";

const getSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

const updateSingleUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

// thunks

const fetchSingleUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: singleUser } = await axios.get(
        `/api/admin/users/${userId}`
      );

      dispatch(getSingleUser(singleUser));
    } catch (error) {
      return `Error ${error.message}|| fetch single user`;
    }
  };
};

const updateUser = (userId) => {
  return async (dispatch) => {
    try {
      const user = await axios.put(`/api/admin/users/${userId}`, {
        isAdmin: !user.isAdmin,
      });
      dispatch(updateSingleUser(user));
    } catch (error) {
      return `Error ${error.message}`;
    }
  };
};

const singleUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};

export { fetchSingleUser, updateUser };
export default singleUserReducer;
