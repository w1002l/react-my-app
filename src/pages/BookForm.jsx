import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBook, addBook, updateBook } from '../api/bookApi';

export const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: '',
    author: '',
    borrowed: false,
  });

  // 获取书籍详情（编辑模式）
  const { data: existingBook } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
    // 只有id存在时才执行
    // !! 将id转换为布尔值，如果id存在，则返回true，否则返回false
    enabled: !!id,
  });

  // 当existingBook 获取到时，初始化表单
  useEffect(() => {
    if (existingBook) {
      setForm(existingBook.data);
    }
  }, [existingBook]);

  // 新建或更新书籍
  const mutation = useMutation({
    mutationFn: id ? data => updateBook(id, data) : addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate('/books');
    },
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    mutation.mutate(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Book' : 'New Book'}</h2>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <br />
      <input
        type="text"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <br />
      <label>
        Borrowed:{' '}
        <input type="checkbox" name="borrowed" checked={form.borrowed} onChange={handleChange} />
      </label>
      <br />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
      {mutation.isError && <p style={{ color: 'red' }}>Error saving</p>}
    </form>
  );
}
