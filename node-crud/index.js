const express = require("express");
const cors = require("cors");

const app = new express();
const port = 5000;

app.use(cors());
app.use(express.json());

let counter = 6;
let books = [
  {
    id: 1,
    title: "Isterak",
    author: "Maya",
  },
  {
    id: 2,
    title: "Mahalalel",
    author: "Maya",
  },
  {
    id: 3,
    title: "Yozavad",
    author: "Maya Keinan",
  },
];


app.get("/books", (req, res) => {
  res.send(books);
});


app.get("/books/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) res.send(book);
  else res.status(404).json({ message: "No book with this id" });
});


app.delete("/books/:id", (req, res) => {
  books = books.filter((book) => book.id !== parseInt(req.params.id));
});


app.post("/books", (req, res) => {
  const newBook = {
    id: counter++,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.put("/books/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));

  if (book) {
    book.title = req.body.title;
    book.author = req.body.author;
    res.status(200).json(book);
  } else res.status(404).json({ message: "No book with this id" });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
