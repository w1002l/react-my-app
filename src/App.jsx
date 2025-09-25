import { Routes, Route, Navigate } from 'react-router-dom';
import { BookList } from './pages/BookList';
import { BookDetail } from './pages/BookDetail';
import { BookForm } from './pages/BookForm';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/:id/edit" element={<BookForm />} />
      </Routes>
    </div>
  );
};

export default App;
