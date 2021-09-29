// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { deleteUser, fetchAllUsers } from "../../redux/users";

// AllAlbums component
class AdminAllUsers extends Component {
  constructor(props) {
    super(props);
    this.deleteButton = this.deleteButton.bind(this);
  }

  // Mounts to tree, loads data
  componentDidMount() {
    this.props.fetchUsers();
  }

  deleteButton(userId) {
    this.props.deleteUser(userId);
  }

  // JSX to HTML
  render() {
    const { deleteButton } = this;
    const { users } = this.props;
    console.log("thispo", this.props.users);
    return (
      <React.Fragment>
        <div className="allUsers-container">
          <h1>Active Accounts</h1>

          {users.map((user) => {
            return (
              <div key={user.id}>
                <button type="submit" onClick={() => deleteButton(user.id)}>
                  X
                </button>
                <Link to={`/admin/users/${user.id}`}>
                  <img
                    id="userImage"
                    src="https://cdn.w600.comps.canstockphoto.com/user-with-headphone-music-simple-vector-clip-art-vector_csp72867467.jpg"
                  />
                  <h3>{`${user.firstName} ${user.lastName}`}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({ users: state.users });

// Dispatch actions
const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchAllUsers()),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapState, mapDispatch)(AdminAllUsers);
