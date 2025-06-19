'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { InstagramPost } from '@/types';
import { formatTimeAgo, generateRandomEngagement } from '@/lib/mock-instagram-data';

interface SNSCardProps {
  post: InstagramPost;
}

export default function SNSCard({ post }: SNSCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const engagement = generateRandomEngagement();

  const formatCaption = (caption?: string) => {
    if (!caption) return '';
    // Split by hashtags and show first part
    const textPart = caption.split('#')[0].trim();
    return textPart.length > 80 
      ? textPart.substring(0, 80) + '...' 
      : textPart;
  };

  const getHashtags = (caption?: string) => {
    if (!caption) return [];
    const hashtags = caption.match(/#\w+/g);
    return hashtags ? hashtags.slice(0, 3) : [];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 via-purple-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
          {post.username ? post.username[0].toUpperCase() : '?'}
        </div>
        <div className="ml-3 flex-1">
          <p className="font-semibold text-gray-900 text-sm">{post.username}</p>
          <p className="text-xs text-gray-500">{formatTimeAgo(post.timestamp)}</p>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {post.media_type === 'VIDEO' ? (
          <video
            src={post.media_url}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
        ) : (
          <Image
            src={post.media_url}
            alt={post.caption ? formatCaption(post.caption) : 'Instagram post'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Action Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-1 group/like"
            >
              <svg 
                className={`w-6 h-6 transition-colors duration-200 ${
                  isLiked ? 'text-red-500 fill-current' : 'text-gray-700 hover:text-red-500'
                }`}
                fill={isLiked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes count */}
        <p className="font-semibold text-sm text-gray-900 mb-2">
          좋아요 {(engagement.likes + (isLiked ? 1 : 0)).toLocaleString()}개
        </p>

        {/* Caption */}
        {post.caption && (
          <div className="text-sm text-gray-900 mb-2 space-y-1">
            <p>
              <span className="font-semibold mr-2">{post.username}</span>
              {formatCaption(post.caption)}
            </p>
            {/* Hashtags */}
            <div className="flex flex-wrap gap-1">
              {getHashtags(post.caption).map((tag, index) => (
                <span key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments preview */}
        <p className="text-sm text-gray-500 mb-2 cursor-pointer hover:text-gray-700">
          댓글 {engagement.comments}개 모두 보기
        </p>

        {/* View on Instagram */}
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          Instagram에서 보기
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
} 