import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchUserAlbumsInCart } from "../redux/cart"; // added import of thunk
import CartTable from "./CartTable";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAlbums(this.props.match.params.userId); // added component did mount function
  }

  render() {
    //
    console.log("props", this.props);

    // let cart;
    // if (this.prop.userId) {
    //   cart = this.props.cart;
    // } else {
    //   let localCart = localStorage.getItem("CART");
    //   cart = JSON.parse(localCart);
    // }

    // let total;
    // if (cart) {
    //   total = (
    //     cart.reduce(
    //       (accumulate, cartItem) =>
    //         accumulate + cartItem.product.price * cartItem.quantity,
    //       0
    //     ) / 100
    //   ).toFixed(2);
    // } else {
    //   total = 0;
    // }

    //

    return (
      <CartTable/>
    );
  }
}

const mapState = (state) => ({ albums: state.albums });

const mapDispatch = (dispatch) => ({
  fetchAlbums: (userId) => dispatch(fetchUserAlbumsInCart(userId)), // edited this
});

export default connect(mapState, mapDispatch)(Cart);
