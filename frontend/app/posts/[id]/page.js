'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, clearCurrentPost } from '@/store/slices/postsSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import Navbar from '@/components/common/Navbar.jsx';
import Loading from '@/components/common/Loading.jsx';
import ErrorMessage from '@/components/common/ErrorMessage.jsx';
import Link from 'next/link';

export default function PostDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { currentPost, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPostById(params.id));
    }
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, params.id]);

  const handleRetry = () => {
    dispatch(fetchPostById(params.id));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-sky-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/70 border border-sky-300/50 text-gray-700 rounded-lg text-sm font-medium hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700 transition-all duration-300 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {loading && <Loading />}
          
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}
          
          {!loading && !error && currentPost && (
            <article className="backdrop-blur-md bg-white/70 rounded-2xl border border-sky-200/60 shadow-xl overflow-hidden">
              <div className="h-2 bg-linear-to-r from-sky-400 via-blue-500 to-sky-400"></div>
              
              <div className="p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                  {currentPost.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-sky-200/40">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                      {currentPost.author?.firstName?.[0]}{currentPost.author?.lastName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {currentPost.author ? `${currentPost.author.firstName} ${currentPost.author.lastName}` : 'Unknown Author'}
                      </p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(currentPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none mb-10">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                    {currentPost.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-sky-200/40">
                  <Link
                    href={`/posts/${currentPost.id}/edit`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Post
                  </Link>
                  <button
                    onClick={() => router.push('/posts')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-sm bg-white/80 border border-sky-300/50 text-gray-700 rounded-lg text-sm font-medium hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700 transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Back to Posts
                  </button>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
