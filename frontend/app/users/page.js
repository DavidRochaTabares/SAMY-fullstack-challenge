'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReqresUsers, fetchAllReqresUsers, fetchSavedUsers } from '@/store/slices/usersSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import Navbar from '@/components/common/Navbar.jsx';
import UserList from '@/components/users/UserList.jsx';
import Pagination from '@/components/common/Pagination.jsx';

export default function UsersPage() {
  const dispatch = useDispatch();
  const { reqresUsers, savedUsers, loading, error, pagination } = useSelector(
    (state) => state.users
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchReqresUsers(1));
    dispatch(fetchSavedUsers());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      dispatch(fetchAllReqresUsers());
    } else if (isSearching) {
      setIsSearching(false);
      dispatch(fetchReqresUsers(1));
    }
  }, [searchTerm, dispatch]);

  const handlePageChange = (page) => {
    if (!isSearching) {
      dispatch(fetchReqresUsers(page));
    }
  };

  const handleRetry = () => {
    if (isSearching) {
      dispatch(fetchAllReqresUsers());
    } else {
      dispatch(fetchReqresUsers(pagination.page));
    }
  };

  const filteredUsers = (reqresUsers || []).filter((user) => {
    if (!searchTerm.trim()) return true;
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || email.includes(search);
  });

  const savedUserIds = (savedUsers || []).map(user => user.reqresId || user.id);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-sky-50 relative overflow-hidden">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="mb-8 backdrop-blur-md bg-white/70 rounded-2xl p-6 border border-sky-200/60 shadow-lg flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap">Users</h1>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 backdrop-blur-sm bg-white/80 border border-sky-300/50 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all duration-300 shadow-sm"
            />
          </div>

          <UserList
            users={filteredUsers}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            savedUserIds={savedUserIds}
          />

          {!loading && !error && !isSearching && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          
          {isSearching && filteredUsers.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Showing {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} from all users
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
