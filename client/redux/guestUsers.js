import axios from "axios";

const GET_ALL_EMAILS = "GET_ALL_EMAILS";

const getAllEmails = (emails) => {
  return {
    type: GET_ALL_EMAILS,
    emails,
  };
};

// thunks
const fetchAllEmails = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/guestusers/emails");
      dispatch(getAllEmails(data));
    } catch (error) {
      console.log("get users thunk error", error);
    }
  };
};

const guestUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_EMAILS:
      return action.emails;
    default:
      return state;
  }
};

export { fetchAllEmails };
export default guestUsersReducer;
