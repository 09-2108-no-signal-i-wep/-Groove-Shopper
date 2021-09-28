import React, { Component } from "react";

class UpdateAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      artistName: this.props.artistName,
      price: this.props.price,
      releaseYear: this.props.releaseYear,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createAlbum({ ...this.state });
    this.setState({
      title: this.props.title,
      artistName: this.props.artistName,
      price: this.props.price,
      releaseYear: this.props.releaseYear,
    });
  }

  render() {
    const { title, artistName, price, releaseYear } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="update-album-container">
        <h1>Update Album...</h1>
        <div className="update-album-form">
          <form onSubmit={handleSubmit}>
            <label className="update-album-text" htmlFor="title">
              Album Title
            </label>
            <input
              className="update-album-input"
              onChange={handleChange}
              name="title"
              value={title}
            />

            <label className="update-album-text" htmlFor="artistName">
              Artist
            </label>
            <input
              className="update-album-input"
              onChange={handleChange}
              name="artistName"
              value={artistName}
            />

            <label className="update-album-text" htmlFor="price">
              Price
            </label>
            <input
              className="update-album-input"
              onChange={handleChange}
              name="price"
              value={price}
            />

            <label className="update-album-text" htmlFor="releaseYear">
              Release Year
            </label>
            <input
              className="update-album-input"
              onChange={handleChange}
              name="releaseYear"
              value={releaseYear}
            />

            <button className="update-album-submit" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateAlbum;
