import express from "express";

const app = express();

var books = ["math", "geography", "computer"];

app.use(express.urlencoded({ extended: true }));

app.get("/book", (req, res) => {
  res.status(200).send(books);
});

app.post("/book", (req, res) => {
  const { book } = req.body;
  console.log(book);
  books.push(book);
  res.status(201).send(book);
});

app.put("/book/:index", (req, res) => {
  const { index } = req.params;
  const updatedBook = req.body.book;

  if (index >= 0 && index < books.length) {
    books[index] = updatedBook;
    res.status(200).send(`Book at index ${index} updated to: ${updatedBook}`);
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/book/:index", (req, res) => {
  const { index } = req.params;

  if (index >= 0 && index < books.length) {
    const deletedBook = books.splice(index, 1);
    res.status(200).send(`Deleted book at index ${index}: ${deletedBook}`);
  } else {
    res.status(404).send("Book not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
