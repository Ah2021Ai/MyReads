import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./components/ListBooks";
import Shelf from "./components/Shelf";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchTerm: "",
    searchResultBooks: [],
  };

  compareSearchPageBooksWithMainPageBooks = (searchBooks) => {
    const mainBooks = this.state.books;

    const books = searchBooks.map((book) => {
      const bookOnShelf = mainBooks.find((b) => b.id === book.id);
      if (bookOnShelf) {
        book.shelf = bookOnShelf.shelf;
      }
      return book;
    });

    this.setState({
      searchResultBooks: books,
    });
  };
  filterBooks = () => {
    const books = this.state.books;
    this.setState(() => ({
      currentlyReadingBooks: books.filter((b) => {
        return b.shelf === "currentlyReading";
      }),
      wantToReadBooks: books.filter((b) => {
        return b.shelf === "wantToRead";
      }),
      readBooks: books.filter((b) => {
        return b.shelf === "read";
      }),
    }));
  };

  getSearchResults = (query) => {
    try {
      if (query.length > 0) {
        BooksAPI.search(query).then((books) => {
          if (Array.isArray(books))
            this.compareSearchPageBooksWithMainPageBooks(books);
          else this.setState({ searchResultBooks: [] });
        });
      } else {
        this.setState({
          searchResultBooks: [],
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  handleChange = (e) => {
    const query = e.target.value;

    this.getSearchResults(query);

    this.setState({
      searchTerm: query,
    });
  };
  changeBookStatus = (value, book) => {
    switch (value) {
      case "currentlyReading": {
        let books = this.state.books;
        books = books.filter((b) => {
          return b.id !== book.id;
        });
        book.shelf = "currentlyReading";
        books.push(book);
        this.setState(
          {
            books: books,
          },
          () => {
            this.filterBooks();
            BooksAPI.update(
              {
                id: book.id,
              },
              "currentlyReading"
            );
          }
        );
        break;
      }
      case "wantToRead": {
        let books = this.state.books;
        books = books.filter((b) => {
          return b.id !== book.id;
        });
        book.shelf = "wantToRead";
        books.push(book);
        this.setState(
          {
            books: books,
          },
          () => {
            this.filterBooks();
            BooksAPI.update(
              {
                id: book.id,
              },
              "wantToRead"
            );
          }
        );
        break;
      }
      case "read": {
        let books = this.state.books;
        books = books.filter((b) => {
          return b.id !== book.id;
        });
        book.shelf = "read";
        books.push(book);
        this.setState(
          {
            books: books,
          },
          () => {
            this.filterBooks();
            BooksAPI.update(
              {
                id: book.id,
              },
              "read"
            );
          }
        );
        break;
      }
      case "none": {
        this.removeBook(book);
        break;
      }

      default:
        break;
    }
  };
  removeBook = (book) => {
    let books = this.state.books;
    books = books.filter((b) => {
      return b.id !== book.id;
    });
    this.setState(
      {
        books: books,
      },
      () => {
        this.filterBooks();
        BooksAPI.update(
          {
            id: book.id,
          },
          "none"
        );
      }
    );
  };
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        if (Array.isArray(books)) return books;
      })
      .then((books) => {
        this.setState((currentState) => ({
          books: books,
        }));
        this.filterBooks();
      });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
                <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              {Array.isArray(this.state.searchResultBooks) && (
                <ListBooks
                  changeBookStatus={this.changeBookStatus}
                  books={this.state.searchResultBooks}
                />
              )}
            </div>
          </div>
        </Route>
        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  changeBookStatus={this.changeBookStatus}
                  type="Currently Reading"
                  books={this.state.currentlyReadingBooks}
                />
                <Shelf
                  changeBookStatus={this.changeBookStatus}
                  type="Want to Read"
                  books={this.state.wantToReadBooks}
                />
                <Shelf
                  changeBookStatus={this.changeBookStatus}
                  type="Read"
                  books={this.state.readBooks}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
      </div>
    );
  }
}

export default BooksApp;
