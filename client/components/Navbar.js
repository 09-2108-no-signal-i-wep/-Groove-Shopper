import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <header className="header">
      <h1 className="logo">
        <Link to="/">Groovy Shopper</Link>
      </h1>


      <nav className="main-nav">
        {isLoggedIn ? (
          <>
            <a className="nav-links" href="#" onClick={handleClick}>
              Logout
            </a>
          </>
        ) : (
          <>


            <Link className="nav-links" to="/login">
              Login
            </Link>

          </>
        )}
        <Link className="nav-links" to="/albums">
          Albums
        </Link>
        <Link className="nav-links" to="/cart">
          Cart
        </Link>
      </nav>
    </header>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
