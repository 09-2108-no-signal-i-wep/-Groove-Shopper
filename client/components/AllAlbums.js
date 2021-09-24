import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../redux/albums";

class AllAlbums extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.getAlbums();
  }

  render() {
    console.log(this.props);
    return (
      <div className="all-albums-container">
        <h1>All Albums</h1>
        <div className="all-albums">
          {this.props.albums.map((album) => {
            return (
              <div key={album.id}>
                <Link to={`/albums/${album.id}`}>
                  <img src={album.cover} className="all-albums-cover" />
                  <p>{album.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ albums: state.albums });

const mapDispatch = (dispatch) => ({
  getAlbums: () => dispatch(fetchAlbums()),
});

export default connect(mapState, mapDispatch)(AllAlbums);
