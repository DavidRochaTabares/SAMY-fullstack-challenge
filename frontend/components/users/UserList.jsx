'use client';

import UserCard from './UserCard.jsx';
import Loading from '../common/Loading.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function UserList({ users, loading, error, onRetry, savedUserIds = [] }) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!users || users.length === 0) {
    return <EmptyState message="No users found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          isSaved={savedUserIds.includes(user.id)}
        />
      ))}
    </div>
  );
}
