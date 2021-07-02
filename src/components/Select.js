import React, { Component } from "react";

export default class Select extends Component {
  render() {
    const { book, value, changeBookStatus } = this.props;
    return (
      <select
        id="select"
        value={value}
        onChange={(e) => {
          document
            .getElementById("select")
            .setAttribute("value", e.target.value);
          changeBookStatus(e.target.value, book);
        }}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}
