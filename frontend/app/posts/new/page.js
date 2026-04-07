'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createPost } from '@/store/slices/postsSlice';
import { fetchSavedUsers } from '@/store/slices/usersSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import Navbar from '@/components/common/Navbar.jsx';
import PostForm from '@/components/posts/PostForm.jsx';

export default function NewPostPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchSavedUsers());
  }, [dispatch]);

  const handleSubmit = async (postData) => {
    const result = await dispatch(createPost(postData));
    if (createPost.fulfilled.match(result)) {
      router.push('/posts');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-sky-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 backdrop-blur-md bg-white/70 rounded-2xl p-6 border border-sky-200/60 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
                <p className="text-sm text-gray-600 mt-0.5">Share your thoughts with the world</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-sky-200/60 shadow-lg p-6 md:p-8">
            <PostForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
