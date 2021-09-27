import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAlbum, fetchAlbums } from "../../redux/albums";
import AddAlbum from "./AddAlbum";

// AllAlbums component
class AdminAllProducts extends Component {
  constructor(props) {
    super(props);
    this.deleteButton = this.deleteButton.bind(this);
  }

  // Mounts to tree, loads data
  componentDidMount() {
    console.log("mounting...");
    this.props.fetchAlbums();
  }

  deleteButton(albumId) {
    console.log(albumId);
    this.props.deleteAlbum(albumId);
  }

  // JSX to HTML
  render() {
    const { deleteButton } = this;
    console.log(this.props.albums);
    return (
      <div>
        {/* <AddAlbum /> */}
        <div className="all-albums">
          <h1>All Albums</h1>
          {this.props.albums.map((album) => {
            return (
              <div key={album.id}>
                <button type="submit" onClick={() => deleteButton(album.id)}>
                  X
                </button>
                <img src={album.cover} className="all-albums-cover" />
                <p>{album.title}</p>
                <button type="submit">Update...</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ albums: state.albums });

// Dispatch actions
const mapDispatch = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbums()),
  deleteAlbum: (albumId) => dispatch(deleteAlbum(albumId)),
});

export default connect(mapState, mapDispatch)(AdminAllProducts);
