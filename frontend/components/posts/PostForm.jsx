'use client';
 
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function PostForm({ initialData, onSubmit, loading }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [authorUserId, setAuthorUserId] = useState(initialData?.author_user_id || '');
  const [errors, setErrors] = useState({});

  const { reqresUsers } = useSelector((state) => state.users);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setAuthorUserId(initialData.author_user_id || '');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!title || title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!content || content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    if (!authorUserId && !initialData) {
      newErrors.authorUserId = 'Please select an author';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        authorUserId: parseInt(authorUserId),
      };
      onSubmit(postData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Write your post content here..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      {!initialData && (
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <select
            id="author"
            value={authorUserId}
            onChange={(e) => setAuthorUserId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select an author</option>
            {(reqresUsers || []).map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name} ({user.email})
              </option>
            ))}
          </select>
          {(!reqresUsers || reqresUsers.length === 0) && (
            <p className="mt-1 text-sm text-blue-600">Loading users...</p>
          )}
          {errors.authorUserId && (
            <p className="mt-1 text-sm text-red-600">{errors.authorUserId}</p>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
