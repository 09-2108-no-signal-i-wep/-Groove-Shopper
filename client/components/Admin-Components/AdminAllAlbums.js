// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAlbum, fetchAlbums } from "../../redux/albums";
import AddAlbum from "./AddAlbum";
import { Link } from "react-router-dom";

// AllAlbums component
class AdminAllAlbums extends Component {
  constructor(props) {
    super(props);
    this.deleteButton = this.deleteButton.bind(this);
  }

  // Mounts to tree, loads data
  componentDidMount() {
    this.props.fetchAlbums();
  }

  deleteButton(albumId) {
    this.props.deleteAlbum(albumId);
  }

  // JSX to HTML
  render() {
    const { deleteButton } = this;
    return (
      <React.Fragment>
        <AddAlbum />
        <div className="all-albums">
          <h1>All Albums</h1>
          {this.props.albums.map((album) => {
            return (
              <div key={album.id}>
                <button type="submit" onClick={() => deleteButton(album.id)}>
                  X
                </button>
                <Link to={`/admin/albums/${album.id}`}>
                  <img src={album.cover} className="all-albums-cover" />
                  <p>{album.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({ albums: state.albums });

// Dispatch actions
const mapDispatch = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbums()),
  deleteAlbum: (albumId) => dispatch(deleteAlbum(albumId)),
});

export default connect(mapState, mapDispatch)(AdminAllAlbums);
