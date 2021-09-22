import React from 'react'
import { connect } from 'react-redux'
import { fetchAlbums } from '../redux/albums'

// AllAlbums component
export class AllAlbums extends React.Component {
  constructor() {
    super()
  }

  // Mounts to tree, loads data
  componentDidMount() { this.props.getAlbums() }

  // JSX to HTML
  render() {
    return(
      <div className="all-albums">
        <h1>All Albums</h1>
        {this.props.albums.map((album) => (
          <div key={album.id}>
            <img src={album.cover}/>
            <p>{album.name}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => ({ albums: state.albums })

// Dispatch actions
const mapDispatch = (dispatch) => ({ getAlbums: () => dispatch(fetchAlbums()) })

export default connect(mapState, mapDispatch)(AllAlbums)
