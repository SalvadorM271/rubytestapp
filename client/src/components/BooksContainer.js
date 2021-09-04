import React, { Component } from "react";
import axios from "axios";
import Book from "./Book";
import NewBookForm from "./NewBookForm";
import EditBookForm from "./EditBookForm";
export default class BooksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      editingBookId: null,
    };
    this.addNewBook = this.addNewBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.editingBook = this.editingBook.bind(this);
    this.editBook = this.editBook.bind(this);
  }

  componentDidMount() {
    axios
      .get("api/v1/books.json")
      .then((response) => {
        console.log(response);
        this.setState({
          books: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  addNewBook(title, author, genre) {
    axios
      .post("/api/v1/books", { book: { title, author, genre } })
      .then((response) => {
        console.log(response);
        const books = [...this.state.books, response.data];
        this.setState({ books });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeBook(id) {
    axios
      .delete("/api/v1/books/" + id)
      .then((response) => {
        const books = this.state.books.filter((book) => book.id !== id);
        this.setState({ books });
      })
      .catch((error) => console.log(error));
  }

  editingBook(id) {
    this.setState({
      editingBookId: id,
    });
  }

  editBook(id, title, author, genre) {
    axios
      .put("/api/v1/books/" + id, {
        book: {
          title,
          author,
          genre,
        },
      })
      .then((response) => {
        console.log(response);
        const books = this.state.books;
        books[id - 1] = { id, title, author, genre };
        this.setState(() => ({
          books,
          editingBookId: null,
        }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.books.map((book) => {
          if (this.state.editingBookId === book.id) {
            return (
              <EditBookForm
                book={book}
                key={book.id}
                editBook={this.editBook}
              />
            );
          } else {
            return (
              <Book
                book={book}
                key={book.id}
                onRemoveBook={this.removeBook}
                editingBook={this.editingBook}
              />
            );
          }
        })}
        <NewBookForm onNewBook={this.addNewBook} />
      </div>
    );
  }
}
