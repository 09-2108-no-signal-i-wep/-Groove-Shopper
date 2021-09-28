import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleAlbum } from "../redux/singleAlbum";
import { addAlbumsToCart } from "../redux/cart";

/// Single Album

class SingleAlbum extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.adjustPrice = this.adjustPrice.bind(this);
  }

  componentDidMount() {
    console.log("*** COMPONENT MOUNTING *****");
    const albumId = this.props.match.params.albumId;
    this.props.fetchSingleAlbum(albumId);
    console.log("*** COMPONENT MOUNTED *****");
  }

  adjustPrice(price) {
    return price / 100;
  }

  handleQuantity = event => {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    this.setState({ quantity: value });
  }

  addToGuestCart(albumId, quantity) {
    const guestCart = window.localStorage;
    const newAlbum = {...this.props.singleAlbum, quantity: quantity};

    if (guestCart.length === 0) {
      guestCart.setItem('CART', JSON.stringify([newAlbum]));
      console.log('Created localstorage cart', JSON.parse(guestCart.getItem('CART')));
    } else {
      const guestCartAlbums = JSON.parse(guestCart.getItem('CART'));
      const existingAlbum = guestCartAlbums.filter(album => album.id === albumId);

      if (existingAlbum.length === 0) {
        guestCart.setItem('CART', JSON.stringify([...guestCartAlbums, newAlbum]));
        console.log('Updated localstorage cart with a new album', JSON.parse(guestCart.getItem('CART')));
      }
    }
  }

  handleAdd = () => {
    const newAlbum = {
      id: this.props.singleAlbum.id,
      quantity: this.state.quantity,
      cost: this.props.singleAlbum.price
    }

    if (this.props.isLoggedIn) {
      this.props.addAlbums({ ...newAlbum, userId: this.props.userId });
    } else {
      this.addToGuestCart(this.props.singleAlbum.id, this.state.quantity)
    }
  }

  render() {
    const { cover, price, releaseYear, title } = this.props.singleAlbum;
    const artist = this.props.singleAlbum.artist;
    const { adjustPrice } = this;

    if (artist === undefined) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <div className="single-album-container">
          <div id="album-artwork-container">
            <img src={cover} className="single-album-artwork" />
            <h5>Released: {releaseYear}</h5>
          </div>
          <div className="single-album-info">
            <h2>{title}</h2>
            <h2>{artist.name}</h2>
            <h3>{`$ ${adjustPrice(price)}`}</h3>
            <div className="qty-box">
              <input
                id="single-album-quantity"
                type="number"
                name="qty"
                value={this.state.quantity}
                onChange={this.handleQuantity}
                min="1"
                max="5"
              />
            </div>
            <button type="submit" id="add-to-cart"
            onClick={() => this.handleAdd()}>
              Add To Cart!
            </button>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  console.log(state)
  return {
    singleAlbum: state.singleAlbum,
    userId: state.auth.id,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleAlbum: (albumId) => dispatch(fetchSingleAlbum(albumId)),
    addAlbums: (albumId, quantity) => dispatch(addAlbumsToCart(albumId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleAlbum);
