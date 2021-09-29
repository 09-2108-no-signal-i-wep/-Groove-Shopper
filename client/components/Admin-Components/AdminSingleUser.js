import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../../redux/singleUser";
import IsAdmin from "./IsAdmin";

/// Single User

class AdminSingleUser extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("*** COMPONENT MOUNTING *****");
    this.props.fetchSingleUser(this.props.match.params.userId);
  }

  render() {
    const { firstName, lastName, email, isAdmin, id } = this.props.singleUser;

    return (
      <div className="single-user-container">
        <h2>{`${firstName} ${lastName}`}</h2>
        <img src="https://cdn.w600.comps.canstockphoto.com/user-with-headphone-music-simple-vector-clip-art-vector_csp72867467.jpg" />
        <h3>{email}</h3>
        <IsAdmin isAdmin={isAdmin} userId={id} />
      </div>
    );
    //}
  }
}

const mapState = (state) => {
  return {
    singleUser: state.singleUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleUser: (userId) => dispatch(fetchSingleUser(userId)),
  };
};

export default connect(mapState, mapDispatch)(AdminSingleUser);
