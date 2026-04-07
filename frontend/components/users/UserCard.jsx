'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { importUser, fetchSavedUsers } from '@/store/slices/usersSlice';

export default function UserCard({ user, isSaved }) {
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    setSaving(true);
    const result = await dispatch(importUser(user.id));
    if (importUser.fulfilled.match(result)) {
      await dispatch(fetchSavedUsers());
    }
    setSaving(false);
  };

  return (
    <div className="group backdrop-blur-sm bg-white/80 rounded-xl p-6 border border-sky-200/60 shadow-md hover:shadow-xl hover:bg-white/90 transition-all duration-400 hover:scale-[1.02] hover:-translate-y-0.5 animate-fade-in">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-sky-300 to-blue-400 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-400"></div>
          <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-sky-400 via-sky-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user.first_name?.[0]}{user.last_name?.[0]}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-700 transition-colors duration-300">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          {isSaved && (
            <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              ✓ Saved locally
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex gap-3">
        {!isSaved && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-white border border-sky-400/60 text-sky-700 rounded-lg text-sm font-medium hover:bg-sky-50 hover:border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-sky-300 border-t-sky-600 rounded-full animate-spin"></span>
                Saving...
              </span>
            ) : 'Save User'}
          </button>
        )}
        <Link
          href={`/users/${user.id}`}
          className={`${!isSaved ? 'flex-1' : 'w-full'} block text-center px-4 py-2.5 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-all duration-300 shadow-md hover:shadow-lg`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
