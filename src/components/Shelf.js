import React, { Component } from "react";
import ListBooks from "./ListBooks";

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.type}</h2>
        <div className="bookshelf-books">
          <ListBooks
            changeBookStatus={this.props.changeBookStatus}
            books={this.props.books}
          />
        </div>
      </div>
    );
  }
}

export default Shelf;
