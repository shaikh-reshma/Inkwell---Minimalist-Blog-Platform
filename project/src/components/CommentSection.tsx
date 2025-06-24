import React, { useState } from 'react';
import { Heart, MessageCircle, User, Send } from 'lucide-react';
import { Comment } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { commentService } from '../services/commentService';
import { useAuth } from '../hooks/useAuth';

interface CommentSectionProps {
  articleId: string;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  articleId, 
  comments, 
  onCommentAdded 
}) => {
  const { authState } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !authState.user || submitting) return;

    setSubmitting(true);
    try {
      const comment = await commentService.createComment({
        content: newComment,
        author: authState.user,
        articleId,
      });
      onCommentAdded(comment);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !authState.user || submitting) return;

    setSubmitting(true);
    try {
      const reply = await commentService.createComment({
        content: replyContent,
        author: authState.user,
        articleId,
        parentId,
      });
      onCommentAdded(reply);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await commentService.likeComment(commentId);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="border-t border-gray-100 pt-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">
        Responses ({comments.length})
      </h3>

      {/* New Comment Form */}
      {authState.isAuthenticated ? (
        <div className="mb-12">
          <div className="flex space-x-4">
            {authState.user?.avatar ? (
              <img
                src={authState.user.avatar}
                alt={authState.user.displayName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 resize-none text-slate-700"
                rows={4}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || submitting}
                  className="flex items-center space-x-2 px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Posting...' : 'Respond'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-12 p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-slate-600">Sign in to join the conversation</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-50 pb-8 last:border-b-0">
            <div className="flex items-start space-x-4">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.displayName}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-semibold text-slate-900">{comment.author.displayName}</span>
                  <span className="text-sm text-slate-500">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-slate-700 mb-4 leading-relaxed">{comment.content}</p>
                
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center space-x-2 text-sm transition-colors ${
                      comment.isLiked 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-slate-500 hover:text-red-600'
                    }`}
                  >
                    <Heart 
                      className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} 
                    />
                    <span>{comment.likes}</span>
                  </button>
                  
                  {authState.isAuthenticated && (
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-100">
                    <div className="flex space-x-3">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 resize-none text-sm"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end mt-2 space-x-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim() || submitting}
                        className="px-4 py-1 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-6 pl-4 border-l-2 border-gray-100 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        {reply.author.avatar ? (
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.displayName}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-semibold text-slate-900">{reply.author.displayName}</span>
                            <span className="text-xs text-slate-500">
                              {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 mb-2 leading-relaxed">{reply.content}</p>
                          <button
                            onClick={() => handleLikeComment(reply.id)}
                            className={`flex items-center space-x-1 text-xs transition-colors ${
                              reply.isLiked 
                                ? 'text-red-600 hover:text-red-700' 
                                : 'text-slate-500 hover:text-red-600'
                            }`}
                          >
                            <Heart 
                              className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} 
                            />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;