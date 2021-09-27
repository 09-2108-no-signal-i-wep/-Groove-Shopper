// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAlbum, fetchAlbums } from "../../redux/albums";

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

  deleteButton(event) {
    console.log(event.target.album)
  }

  // JSX to HTML
  render() {
    const {deleteButton} = this;
    return (
      <div className="all-albums">
        <h1>All Albums</h1>
        {this.props.albums.map((album) => {
          return (
            <div key={album.id}>
              <button type="submit" onClick={deleteButton}>X</button>
              <img src={album.cover} className="all-albums-cover" />
              <p>{album.title}</p>
              <button type="submit">Update...</button>
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
  fetchAlbums: () => dispatch(fetchAlbums()),
  deleteAlbum: (albumId) => dispatch(deleteAlbum(albumId)),
});

export default connect(mapState, mapDispatch)(AdminAllAlbums);
