'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/store/slices/postsSlice';
import { fetchSavedUsers } from '@/store/slices/usersSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import Navbar from '@/components/common/Navbar.jsx';
import PostCard from '@/components/posts/PostCard.jsx';
import Loading from '@/components/common/Loading.jsx';
import ErrorMessage from '@/components/common/ErrorMessage.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import Pagination from '@/components/common/Pagination.jsx';
import Link from 'next/link';

export default function PostsPage() {
  const dispatch = useDispatch();
  const { posts, loading, error, pagination } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1 }));
    dispatch(fetchSavedUsers());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(fetchPosts({ page }));
  };

  const handleRetry = () => {
    dispatch(fetchPosts({ page: pagination.page }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-sky-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 backdrop-blur-md bg-white/70 rounded-2xl p-6 border border-sky-200/60 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
                <p className="text-sm text-gray-600 mt-0.5">Share your thoughts</p>
              </div>
            </div>
            <Link
              href="/posts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Post
            </Link>
          </div>

          {loading && <Loading />}
          
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}
          
          {!loading && !error && posts.length === 0 && (
            <EmptyState
              message="No posts yet"
              actionLabel="Create your first post"
              onAction={() => window.location.href = '/posts/new'}
            />
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
