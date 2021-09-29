import React from "react";
import { updateUser } from "../../redux/singleUser";
import { connect } from "react-redux";

class IsAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateUser, isAdmin, userId } = this.props;
    return (
      <div className="isAdmin-container" onClick={() =>updateUser(userId)}>
        {isAdmin ? (
          <React.Fragment>
            <input type="checkbox" checked />
            <label htmlFor="isAdmin">Admin?</label>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input type="checkbox" />
            <label htmlFor="isAdmin">Admin?</label>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (userId) => dispatch(updateUser(userId)),
  };
};

export default connect(null, mapDispatch)(IsAdmin);
