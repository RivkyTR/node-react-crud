import InputBox from "./components/InputBox";
import "./App.css";
import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [updatedBook, setUpdatedBook] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    var data = await fetch("http://localhost:5000/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    var arrayBooks = [];
    data.map((book) => arrayBooks.push(book));
    setBooks(arrayBooks);
  };

  const editBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setUpdatedBook(book);
  };

  const deleteBook = async (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
    var data = await fetch(`http://localhost:5000/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const addbook = async () => {
    const newBook = {
      title: title,
      author: author,
    };

    var response = await fetch(`http://localhost:5000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const newBookFromResponse = await response.json();

    setBooks([...books, newBookFromResponse]);
    resetForm();
  };

  const updateBook = async () => {
    const updatedDeatils = { title: title, author: author };

    const response = await fetch(
      `http://localhost:5000/books/${updatedBook.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDeatils),
      }
    );
    const updatedBookFromResponse = await response.json();
    setBooks(
      books.map((book) =>
        book.id === updatedBook.id ? updatedBookFromResponse : book
      )
    );

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setUpdatedBook(null);
  };

  return (
    <>
      <div>
        <BookForm
          onSubmit={(e) => {
            e.preventDefault();
            updatedBook ? updateBook() : addbook();
          }}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
        />
        <BookList books={books} deleteBook={deleteBook} editBook={editBook} />
      </div>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          updatedBook ? updateBook() : addbook();
        }}
      >
        <InputBox placeholder="title" value={title} onChange={setTitle} />
        <InputBox placeholder="author" value={author} onChange={setAuthor} />
        <Button type="submit" value="Submit" />
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}
              <Button onClick={editBook} variable={book} value="Edit" />
              <Button onClick={deleteBook} variable={book.id} value="Delete" />
            </li>
          ))}
        </ul>
      </form> */}
    </>
  );
}

export default App;
