import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class Cart extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    //

    console.log(this)

    let cart
    if(this.prop.userId) { cart = this.props.cart }
    else {
      let localCart = localStorage.getItem('CART')
      cart = JSON.parse(localCart)
    }

    let total
    if(cart) {
      total = (
        cart
        .reduce((accumulate, cartItem) => accumulate + cartItem.product.price * cartItem.quantity, 0) / 100)
        .toFixed(2)
    } else { total = 0 }

    //

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
          <TableRow>

          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

const mapState = (state) => ({ albums: state.albums });

const mapDispatch = (dispatch) => ({
  getAlbums: () => dispatch(fetchAlbums())
});

export default connect(mapState, mapDispatch)(Cart);
