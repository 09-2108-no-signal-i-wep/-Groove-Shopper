import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../redux/albums";

// AllAlbums component
class AllAlbums extends Component {
  constructor(props) {
    super(props);
  }

  // Mounts to tree, loads data
  componentDidMount() {
    if (this.props.getAlbums) {
      // why is this here?
      this.props.getAlbums();
    }
  }

  // JSX to HTML
  render() {
    console.log(this.props);
    return (
      <div className="all-albums">
        <h1>All Albums</h1>
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
    );
  }
}

const mapState = (state) => ({ albums: state.albums });

// Dispatch actions
const mapDispatch = (dispatch) => ({
  getAlbums: () => dispatch(fetchAlbums()),
});

export default connect(mapState, mapDispatch)(AllAlbums);
