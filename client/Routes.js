import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllAlbums from "./components/AllAlbums";
import { me } from "./store";

import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation";

import SingleAlbum from "./components/SingleAlbum";
import AdminWelcome from "./components/Admin-Components/AdminWelcome";
import AdminAllAlbums from "./components/Admin-Components/AdminAllAlbums";
import AdminSingleAlbum from "./components/Admin-Components/AdminSingleAlbum";
import AdminAllUsers from "./components/Admin-Components/AdminAllUsers";
import AdminSingleUser from "./components/Admin-Components/AdminSingleUser";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/confirmed/:orderId" component={Confirmation} />
            <Route exact path="/albums" component={AllAlbums} />
            <Route path="/albums/:albumId" component={SingleAlbum} />
            {isAdmin} ? (
            <Route exact path="/admin" component={AdminWelcome} />
            <Route exact path="/admin/albums" component={AdminAllAlbums} />
            <Route
              exact
              path="/admin/albums/:albumId"
              component={AdminSingleAlbum}
            />
            <Route
              exact
              path="/admin/users/:userId"
              component={AdminSingleUser}
            />
            <Route exact path="/admin/users" component={AdminAllUsers} />) : ( )
          </Switch>
        ) : (
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/confirmed/:orderId" component={Confirmation} />
            <Route exact path="/albums" component={AllAlbums} />
            <Route path="/albums/:albumId" component={SingleAlbum} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
