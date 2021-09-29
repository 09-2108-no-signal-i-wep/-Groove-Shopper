// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { connect } from "react-redux";
import { createAlbum } from "../../redux/albums";

class AddAlbum extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      artistName: "",
      price: "",
      releaseYear: "",
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
      title: "",
      artistName: "",
      price: "",
      releaseYear: "",
    });
  }

  render() {
    const { title, artistName, price, releaseYear } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="add-album-container">
        <h1 className="cart-title">Add New Album</h1>
        <div className="add-album-form">
          <form onSubmit={handleSubmit}>
            <label className="add-album-text" htmlFor="title">
              Album Title
            </label>
            <input
              className="add-album-input"
              onChange={handleChange}
              name="title"
              value={title}
            />

            <label className="add-album-text" htmlFor="artistName">
              Artist
            </label>
            <input
              className="add-album-input"
              onChange={handleChange}
              name="artistName"
              value={artistName}
            />

            <label className="add-album-text" htmlFor="price">
              Price
            </label>
            <input
              className="add-album-input"
              onChange={handleChange}
              name="price"
              value={price}
            />

            <label className="add-album-text" htmlFor="releaseYear">
              Release Year
            </label>
            <input
              className="add-album-input"
              onChange={handleChange}
              name="releaseYear"
              value={releaseYear}
            />

            <button className="add-album-submit" type="submit">
              Add!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createAlbum: (album) => dispatch(createAlbum(album)),
  };
};

export default connect(null, mapDispatch)(AddAlbum);
