// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

class AdminWelcome extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="admin-page-container">
        <h1>Welcome Admin!</h1>
        <div className="admin-page-nav-buttons">
          <Link to="/admin/albums">
            <button type="submit">View All Products</button>
          </Link>
          <Link to="/admin/users">
            <button type="submit">View All Users</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AdminWelcome;
