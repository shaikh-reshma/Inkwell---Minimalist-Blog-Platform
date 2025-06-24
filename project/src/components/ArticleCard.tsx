import React from 'react';
import { Heart, Bookmark, Clock, Eye, User } from 'lucide-react';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  onArticleClick: (id: string) => void;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  layout?: 'card' | 'list';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onArticleClick, 
  onLike, 
  onBookmark,
  layout = 'card'
}) => {
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

  if (layout === 'list') {
    return (
      <article className="bg-white border-b border-gray-100 py-8 hover:bg-gray-50/50 transition-colors">
        <div className="flex items-start space-x-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.displayName}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-3 h-3 text-gray-600" />
                </div>
              )}
              <span className="text-sm text-slate-600">{article.author.displayName}</span>
              <span className="text-sm text-slate-400">·</span>
              <span className="text-sm text-slate-400">
                {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
              </span>
            </div>

            <h2 
              className="text-xl font-bold text-slate-900 mb-2 cursor-pointer hover:text-slate-700 transition-colors line-clamp-2"
              onClick={() => onArticleClick(article.id)}
            >
              {article.title}
            </h2>

            <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <div className="flex items-center space-x-1 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onLike(article.id)}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    article.isLiked 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-slate-500 hover:text-red-600'
                  }`}
                >
                  <Heart 
                    className={`w-4 h-4 ${article.isLiked ? 'fill-current' : ''}`} 
                  />
                  <span>{article.likes}</span>
                </button>

                <button
                  onClick={() => onBookmark(article.id)}
                  className={`p-1 transition-colors ${
                    article.isBookmarked 
                      ? 'text-slate-900' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Bookmark 
                    className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} 
                  />
                </button>
              </div>
            </div>
          </div>

          {article.coverImage && (
            <div className="w-32 h-20 flex-shrink-0">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onArticleClick(article.id)}
              />
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      {article.coverImage && (
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
            onClick={() => onArticleClick(article.id)}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          {article.author.avatar ? (
            <img
              src={article.author.avatar}
              alt={article.author.displayName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-slate-900">{article.author.displayName}</p>
            <p className="text-xs text-slate-500">
              {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        <h2 
          className="text-xl font-bold text-slate-900 mb-3 cursor-pointer hover:text-slate-700 transition-colors line-clamp-2 leading-tight"
          onClick={() => onArticleClick(article.id)}
        >
          {article.title}
        </h2>

        <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <div className="flex items-center space-x-1 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onLike(article.id)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                article.isLiked 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-slate-500 hover:text-red-600'
              }`}
            >
              <Heart 
                className={`w-4 h-4 ${article.isLiked ? 'fill-current' : ''}`} 
              />
              <span>{article.likes}</span>
            </button>

            <button
              onClick={() => onBookmark(article.id)}
              className={`p-1 transition-colors ${
                article.isBookmarked 
                  ? 'text-slate-900' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Bookmark 
                className={`w-4 h-4 ${article.isBookmarked ? 'fill-current' : ''}`} 
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;