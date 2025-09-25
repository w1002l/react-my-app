import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks, deleteBook, addBook } from '../api/bookApi';

export const BookList = () => {
  const [newBook, setNewBook] = useState({ title: '', author: '', borrowed: false });
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });
  const books = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const handleDelete = async id => {
    const confirm = window.confirm('Are you sure you want to delete this book?');
    if (!confirm) return;
    await deleteBook(id);
    queryClient.invalidateQueries({ queryKey: ['books'] });
  };

  const handleAddBook = async e => {
    e.preventDefault();
    if (newBook.title === '' || newBook.author === '') {
      alert('Please fill in all fields');
      return;
    }
    await addBook(newBook);
    queryClient.invalidateQueries({ queryKey: ['books'] });
    setNewBook({ title: '', author: '', borrowed: false });
  };
  return (
    <div>
      <h1>Book List</h1>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={e => setNewBook({ ...newBook, author: e.target.value })}
        />
        Borrowed:{' '}
        <input
          type="checkbox"
          name="borrowed"
          checked={newBook.borrowed}
          onChange={e => setNewBook({ ...newBook, borrowed: e.target.checked })}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {books?.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link> - {book.author} -{' '}
            <b style={{ color: book.borrowed ? 'red' : 'green' }}>
              {book.borrowed ? 'Borrowed' : 'Available'}
            </b>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
