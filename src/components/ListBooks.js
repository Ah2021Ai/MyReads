import React, { Component } from "react";
import Book from "./Book";
class ListBooks extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book, index) => (
          <li key={index}>
            <Book changeBookStatus={this.props.changeBookStatus} book={book} />
          </li>
        ))}
      </ol>
    );
  }
}

export default ListBooks;
