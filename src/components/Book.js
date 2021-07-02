import React, { Component } from "react";
import Select from "./Select";

class Book extends Component {
  render() {
    const { book, changeBookStatus } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              })`,
            }}
          />
          <div className="book-shelf-changer">
            {book.shelf && (
              <Select
                book={book}
                value={book.shelf}
                changeBookStatus={changeBookStatus}
              />
            )}
            {!book.shelf && (
              <Select
                book={book}
                value="none"
                changeBookStatus={changeBookStatus}
              />
            )}
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors : ""}</div>
      </div>
    );
  }
}

export default Book;
