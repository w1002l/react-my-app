import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBook } from '../api/bookApi';

export const BookDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
  });
  const book = data?.data;
  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not Found</p>;

  return (
    <div>
      <h1>Book Detail</h1>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Status: {book.borrowed ? 'Borrowed' : 'Available'}</p>
      <Link to={`/books/${id}/edit`}>Edit</Link>
      <br />
      <Link to="/books">back</Link>
    </div>
  );
}
