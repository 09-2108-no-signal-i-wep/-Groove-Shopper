import React, { Component } from "react";

class AdminWelcome extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="admin-page-container">
        <h1>Welcome Admin!</h1>
        <div className="admin-page-nav-buttons">
          <button type="submit">View All Products</button>
          <button type="submit">View All Users</button>
        </div>
      </div>
    );
  }
}

export default AdminWelcome;
