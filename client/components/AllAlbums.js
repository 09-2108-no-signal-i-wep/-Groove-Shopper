import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAlbums } from "../redux/albums";

class AllAlbums extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.getAlbums();
  }

  render() {
    return (
      <div className="all-albums">
        <h1>All Albums</h1>
        {this.props.albums.map((album) => {
          return (
            <div key={album.id}>
              <img src={album.cover} className='all-albums-cover' />
              <p>{album.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => ({ albums: state.albums });

const mapDispatch = (dispatch) => ({
  getAlbums: () => dispatch(fetchAlbums()),
});

export default connect(mapState, mapDispatch)(AllAlbums);
