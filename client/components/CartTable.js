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

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Shopping Cart</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Qty</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productRows.map((product) => (
              <TableRow
                key={product.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img id='cart-img' src={product.coverArt} />
                </TableCell>
                <TableCell alight="right">{product.title}</TableCell>
                <TableCell alight="right">{product.artist}</TableCell>
                <TableCell alight="right">${fixPrice(product.price)}</TableCell>
                <TableCell alight="right">{product.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CartTable;
