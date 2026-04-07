'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, updatePost, clearCurrentPost } from '@/store/slices/postsSlice';
import { fetchReqresUsers } from '@/store/slices/usersSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import Navbar from '@/components/common/Navbar.jsx';
import PostForm from '@/components/posts/PostForm.jsx';
import Loading from '@/components/common/Loading.jsx';
import ErrorMessage from '@/components/common/ErrorMessage.jsx';

export default function EditPostPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { currentPost, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPostById(params.id));
    }
    dispatch(fetchReqresUsers(1));
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, params.id]);

  const handleSubmit = async (postData) => {
    const result = await dispatch(updatePost({ id: params.id, data: postData }));
    if (updatePost.fulfilled.match(result)) {
      router.push(`/posts/${params.id}`);
    }
  };

  const handleRetry = () => {
    dispatch(fetchPostById(params.id));
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
                <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
                <p className="text-sm text-gray-600 mt-0.5">Update your post details</p>
              </div>
            </div>
          </div>

          {loading && <Loading />}
          
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}
          
          {!loading && !error && currentPost && (
            <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-sky-200/60 shadow-lg p-6 md:p-8">
              <PostForm
                initialData={currentPost}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
