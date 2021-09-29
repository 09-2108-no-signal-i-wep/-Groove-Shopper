import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state.auth);
  return {
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    userId: state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
