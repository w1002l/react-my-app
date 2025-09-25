import api from '../utils/request';

export const getBooks = async () => {
  const res = await api.get(`/api/books`);
  return res.data;
};

export const addBook = async (book) => {
  const res = await api.post(`/api/books`, book);
  return res.data;
};

export const getBook = async (id) => {
  const res = await api.get(`/api/books/${id}`);
  return res.data;
};

export const updateBook = async (id, book) => {
  const res = await api.put(`/api/books/${id}`, book);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await api.delete(`/api/books/${id}`);
  return res.data;
};