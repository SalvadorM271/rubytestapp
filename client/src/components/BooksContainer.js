import React, { Component } from "react";
import axios from "axios";
export default class BooksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
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
  render() {
    return (
      <div className="books-container">
        {this.state.books.map((book) => {
          return (
            <div className="single-book" key={book.id}>
              <h4>{book.title}</h4>
              <p>{book.excerpt}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
