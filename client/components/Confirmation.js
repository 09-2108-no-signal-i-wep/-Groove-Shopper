import React, { Component } from "react";
import CartTable from "./CartTable";

class Confirmation extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="confirmation-container">
        <div className="order-info">
          <h1>Purchase Complete!</h1>
          <h3>Order Number: 001 </h3>
          <h3>Estimated Shipping: Its Already There!</h3>
          <h3>Thanks for support a fake business!!</h3>
        </div>
        <div className="small-cart-table">
          <h2>Your Order:</h2>
          {/* <CartTable /> */}
          <h2>Total: $Money Doesn't Exist</h2>
        </div>
      </div>
    );
  }
}

export default Confirmation;
