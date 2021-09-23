import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleAlbum } from "../redux/singleAlbum";

/// Single Album

class SingleAlbum extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.props.fetchSingleAlbum(albumId);
  }

  render() {
    console.log('proppy', this.props);
    const {cover, price, releaseYear, title, artist} = this.props.singleAlbum;
    return (
      <div className="single-album-container">
        <div id = 'album-artwork-container'>
          <img src={cover} className='single-album-artwork'/>
          <h5>Released: {releaseYear}</h5>
        </div>
        <div className='single-album-info'>
          <h3>{title}</h3>
          <h4>{price}</h4>

        </div>
      </div>
    );
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
