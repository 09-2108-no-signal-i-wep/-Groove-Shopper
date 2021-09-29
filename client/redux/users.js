import axios from "axios";

const GET_ALL_USERS = "GET_ALL_USERS";
const DELETE_USER = "DELETE_USER";

const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const removeUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

// thunks
const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data: allUsers } = await axios.get("/api/admin/users");
      console.log("aa;a", allUsers);
      dispatch(getAllUsers(allUsers));
    } catch (error) {
      console.log("get users thunk error", error);
    }
  };
};

const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: oldUser } = await axios.delete("/api/admin/users", {
        data: { id: userId },
      });

      console.log("gone", oldUser);
      dispatch(removeUser(oldUser));
    } catch (error) {
      return `Error ${error.message} || delete User Thunk`;
    }
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};

export { fetchAllUsers, deleteUser };
export default usersReducer;
