'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchReqresUserById, clearCurrentUser } from '@/store/slices/usersSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import Navbar from '@/components/common/Navbar.jsx';
import Loading from '@/components/common/Loading.jsx';
import ErrorMessage from '@/components/common/ErrorMessage.jsx';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchReqresUserById(id));
    }
  }, [dispatch, id]);

  const handleRetry = () => {
    dispatch(fetchReqresUserById(id));
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
            Back to Users
          </button>

          {loading && <Loading />}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {!loading && !error && currentUser && (
            <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-sky-200/60 shadow-xl overflow-hidden">
              <div className="bg-linear-to-r from-sky-400 to-blue-500 px-6 py-8 md:px-8 md:py-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-lg"></div>
                    <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white flex items-center justify-center text-sky-600 text-3xl font-bold shadow-lg">
                      {currentUser.first_name?.[0]}{currentUser.last_name?.[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                      {currentUser.first_name} {currentUser.last_name}
                    </h1>
                    <p className="text-white/90 mt-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-8 md:px-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  User Information
                </h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-sm bg-sky-50/50 rounded-xl p-4 border border-sky-200/40">
                    <dt className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      User ID
                    </dt>
                    <dd className="mt-2 text-lg font-semibold text-gray-800">{currentUser.id}</dd>
                  </div>
                  <div className="backdrop-blur-sm bg-sky-50/50 rounded-xl p-4 border border-sky-200/40">
                    <dt className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      First Name
                    </dt>
                    <dd className="mt-2 text-lg font-semibold text-gray-800">{currentUser.first_name}</dd>
                  </div>
                  <div className="backdrop-blur-sm bg-sky-50/50 rounded-xl p-4 border border-sky-200/40">
                    <dt className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Last Name
                    </dt>
                    <dd className="mt-2 text-lg font-semibold text-gray-800">{currentUser.last_name}</dd>
                  </div>
                  <div className="backdrop-blur-sm bg-sky-50/50 rounded-xl p-4 border border-sky-200/40">
                    <dt className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </dt>
                    <dd className="mt-2 text-lg font-semibold text-gray-800">{currentUser.email}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
