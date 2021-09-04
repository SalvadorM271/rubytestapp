import React from "react";

const Book = ({ book, onRemoveBook = (f) => f, editingBook = (f) => f }) => (
  <div className="book-container" key={book.id}>
    <p>
      <b>{book.title}</b> by {book.author}
      <br />
      Genre: {book.genre}
    </p>
    <div className="buttons">
      <button onClick={() => onRemoveBook(book.id)}>Delete</button>
      <button onClick={() => editingBook(book.id)}>Edit</button>
    </div>
  </div>
);

export default Book;
