import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, Clock, Eye, User, ArrowLeft, Share2, MapPin, Globe } from 'lucide-react';
import { Article, Comment } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { articleService } from '../services/articleService';
import { commentService } from '../services/commentService';
import CommentSection from './CommentSection';

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBack }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const [articleData, commentsData] = await Promise.all([
          articleService.getArticleById(articleId),
          commentService.getCommentsByArticleId(articleId),
        ]);
        setArticle(articleData);
        setComments(commentsData);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const handleLike = async () => {
    if (!article) return;
    
    try {
      await articleService.likeArticle(article.id);
      setArticle(prev => prev ? {
        ...prev,
        likes: prev.likes + (prev.isLiked ? -1 : 1),
        isLiked: !prev.isLiked,
      } : null);
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleBookmark = async () => {
    if (!article) return;
    
    try {
      await articleService.bookmarkArticle(article.id);
      setArticle(prev => prev ? {
        ...prev,
        bookmarks: prev.bookmarks + (prev.isBookmarked ? -1 : 1),
        isBookmarked: !prev.isBookmarked,
      } : null);
    } catch (error) {
      console.error('Error bookmarking article:', error);
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [newComment, ...prev]);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Travel': 'bg-emerald-100 text-emerald-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Food': 'bg-orange-100 text-orange-800',
      'Lifestyle': 'bg-purple-100 text-purple-800',
      'Art': 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6 w-32"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Story not found</h2>
          <button
            onClick={onBack}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            ← Back to stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to stories</span>
      </button>

      <article className="bg-white">
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <div className="flex items-center space-x-1 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900">{article.author.displayName}</p>
                <div className="flex items-center space-x-3 text-sm text-slate-500">
                  <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
                  {article.author.location && (
                    <>
                      <span>·</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{article.author.location}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  article.isLiked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 ${article.isLiked ? 'fill-current' : ''}`} 
                />
                <span>{article.likes}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  article.isBookmarked 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                }`}
              >
                <Bookmark 
                  className={`w-5 h-5 ${article.isBookmarked ? 'fill-current' : ''}`} 
                />
              </button>

              <button className="p-2 bg-gray-50 text-slate-600 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {article.coverImage && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl mb-12">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg prose-slate max-w-none mb-16 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="border-t border-gray-100 pt-8 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  article.isLiked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 ${article.isLiked ? 'fill-current' : ''}`} 
                />
                <span>{article.likes}</span>
              </button>

              <div className="flex items-center space-x-2 text-slate-600">
                <Eye className="w-5 h-5" />
                <span>{article.views}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  article.isBookmarked 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                }`}
              >
                <Bookmark 
                  className={`w-5 h-5 ${article.isBookmarked ? 'fill-current' : ''}`} 
                />
              </button>

              <button className="p-2 bg-gray-50 text-slate-600 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <CommentSection
          articleId={article.id}
          comments={comments}
          onCommentAdded={handleCommentAdded}
        />
      </article>
    </div>
  );
};

export default ArticleDetail;