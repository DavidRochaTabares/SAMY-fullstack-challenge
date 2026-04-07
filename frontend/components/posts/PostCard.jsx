'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '@/store/slices/postsSlice';
import Link from 'next/link';
import ConfirmModal from '@/components/common/ConfirmModal.jsx';

export default function PostCard({ post }) {
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deletePost(post.id));
    setDeleting(false);
    setShowDeleteModal(false);
  };

  return (
    <article className="group backdrop-blur-md bg-white/70 rounded-2xl border border-sky-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <div className="h-2 bg-linear-to-r from-sky-400 via-blue-500 to-sky-400"></div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.content}
        </p>
        
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 pb-4 border-b border-sky-200/40">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-gray-700">
              {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Unknown Author'}
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/posts/${post.id}`}
            className="flex-1 text-center px-4 py-2.5 backdrop-blur-sm bg-white/80 border border-sky-300/50 text-gray-700 rounded-lg text-sm font-medium hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700 transition-all duration-300 shadow-sm"
          >
            View
          </Link>
          <Link
            href={`/posts/${post.id}/edit`}
            className="flex-1 text-center px-4 py-2.5 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Edit
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleting}
      />
    </article>
  );
}
