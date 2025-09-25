import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = 4001;

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', borrowed: true },
  { id: 2, title: '1984', author: 'George Orwell', borrowed: false },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', borrowed: false },
];

// Get all books
app.get('/api/books', (req, res) => {
  if (!books || books.length === 0) {
    return res.status(404).json({ status: 404, message: 'No books found' });
  }
  res.status(200).json({ status: 200, message: 'Books fetched successfully', data: books });
});

// Add a book
app.post('/api/books', (req, res) => {
  const { title, author, borrowed } = req.body;
  const newBook = {
    id: Date.now(),
    title,
    author,
    borrowed,
  };
  books.push(newBook);
  res.status(201).json({ status: 201, message: 'Book added successfully', data: newBook });
});

// Get a book
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(book => book.id === Number(id));
  if (!book) {
    return res.status(404).json({ status: 404, message: 'Book not found' });
  }
  res.status(200).json({ status: 200, message: 'Book fetched successfully', data: book });
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, borrowed } = req.body;
  const book = books.find(book => book.id === Number(id));
  if (!book) {
    return res.status(404).json({ status: 404, message: 'Book not found' });
  }
  book.title = title;
  book.author = author;
  book.borrowed = borrowed;
  res.status(200).json({ status: 200, message: 'Book updated successfully', data: book });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(book => book.id === Number(id));
  if (!book) {
    return res.status(404).json({ status: 404, message: 'Book not found' });
  }
  books = books.filter(book => book.id !== Number(id));
  res.status(200).json({ status: 200, message: 'Book deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
