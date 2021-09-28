import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../../redux/singleUser";

/// Single User

class AdminSingleUser extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("*** COMPONENT MOUNTING *****");
    console.log(this.props.match.params.userId)
    this.props.fetchSingleUser(this.props.match.params.userId);
  }

  render() {
    console.log(this.props);
    // if (artist === undefined) {
    //   return <h1>LOADING</h1>;
    // } else {
    return (<div className="single-user-container">
      <h2>Name</h2>
    </div>);
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
