import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleAlbum } from "../redux/singleAlbum";

/// Single Album

class SingleAlbum extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.adjustPrice = this.adjustPrice.bind(this);
  }

  componentDidMount() {
    console.log("*** COMPONENT MOUNTING *****");
    const albumId = this.props.match.params.albumId;
    this.setState({
      loading: false,
    });
    this.props.fetchSingleAlbum(albumId);
    console.log("*** COMPONENT MOUNTED *****");
  }

  adjustPrice(price) {
    return price / 100;
  }

  render() {
    //console.log("artist", this.props.singleAlbum.artist.name);
    console.log("props.singleAlbum", this.props.singleAlbum);
    const { cover, price, releaseYear, title } = this.props.singleAlbum;
    const artist = this.props.singleAlbum.artist;
    console.log("ARTIST", artist);
    const { loading } = this.state;
    // console.log('load', loading)
    const { adjustPrice } = this;

    if (loading) {
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
            {/* <h2>{artist.name}</h2> */}
            <h3>{`$ ${adjustPrice(price)}`}</h3>
            <button type='submit' id='add-to-cart'>Add To Cart!</button>
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    singleAlbum: state.singleAlbum,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleAlbum: (albumId) => dispatch(fetchSingleAlbum(albumId)),
  };
};

export default connect(mapState, mapDispatch)(SingleAlbum);
