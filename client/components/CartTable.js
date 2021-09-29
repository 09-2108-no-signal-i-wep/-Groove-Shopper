import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createAlbum(coverArt, title, artist, price, quantity) {
  return { coverArt, title, artist, price, quantity };
}

const productRows = [
  createAlbum(
    "https://images-na.ssl-images-amazon.com/images/I/71leqXunDtL._SL1050_.jpg",
    "ElectricLarryLand",
    "Butthole Surfers",
    4200,
    1
  ),
  createAlbum(
    "https://e.snmc.io/i/600/s/4dc8715d348ffe9123a338719877be6e/8113804/goose-alive-and-well-cover-art.jpg",
    "Alive and Well",
    "Goose",
    1000,
    3
  ),
];

class CartTable extends Component {
  constructor(props) {
    super(props);
    this.fixPrice = this.fixPrice.bind(this);
  }

  fixPrice(price) {
    return price / 100;
  }
  render() {
    const { fixPrice } = this;
    const { albums, removeAlbum, invoiceTotal } = this.props;

    if (!albums || albums.length === 0) {
      return (
        <>
          <h1 className="cart-title">Shopping Cart</h1>
          <h1>EMPTY</h1>
        </>
      );
    }
    return (
      <TableContainer component={Paper} class="cart-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {albums.map((product) => (
              <TableRow key={product.title}>
                <TableCell component="th" scope="row">
                  <img id="cart-img" src={product.cover} />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                {/* TODO: add artist to product */}
                <TableCell>{product.artist.name}</TableCell>
                {/* <TableCell align="right">{product.quantity}</TableCell> */}
                {/* <TableCell align="right">${this.fixPrice(product.orderAlbum.cost * product.orderAlbum.quantity)}</TableCell> */}
                <TableCell align="right">
                  <button onClick={() => removeAlbum(product.id)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell align="right" colSpan={3}>
                <b>Total</b>
              </TableCell>
              <TableCell align="right">${fixPrice(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CartTable;
