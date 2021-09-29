import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName, lastName, userId, auth } = props;

  return (
    <div>
      <h3>Welcome</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log(state.auth);
  return {
    firstName: state.auth.firstname,
    lastName: state.auth.lastname,
    userId: state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
