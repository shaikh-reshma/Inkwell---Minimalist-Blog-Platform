import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import AuthModal from './components/AuthModal';
import ArticleEditor from './components/ArticleEditor';
import CategoryFilter from './components/CategoryFilter';
import AuthProvider from './components/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { Article } from './types';
import { articleService } from './services/articleService';

const AppContent: React.FC = () => {
  const { authState } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showArticleEditor, setShowArticleEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [searchQuery, articles, selectedCategory]);

  const loadArticles = async () => {
    try {
      const articlesData = await articleService.getAllArticles();
      setArticles(articlesData);
      setFilteredArticles(articlesData);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
  };

  const handleBackToFeed = () => {
    setSelectedArticleId(null);
  };

  const handleLike = async (articleId: string) => {
    if (!authState.isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      await articleService.likeArticle(articleId);
      setArticles(prev => 
        prev.map(article => 
          article.id === articleId 
            ? {
                ...article,
                likes: article.likes + (article.isLiked ? -1 : 1),
                isLiked: !article.isLiked,
              }
            : article
        )
      );
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleBookmark = async (articleId: string) => {
    if (!authState.isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      await articleService.bookmarkArticle(articleId);
      setArticles(prev => 
        prev.map(article => 
          article.id === articleId 
            ? {
                ...article,
                bookmarks: article.bookmarks + (article.isBookmarked ? -1 : 1),
                isBookmarked: !article.isBookmarked,
              }
            : article
        )
      );
    } catch (error) {
      console.error('Error bookmarking article:', error);
    }
  };

  const handleCreateArticle = () => {
    if (!authState.isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowArticleEditor(true);
  };

  const handleArticleCreated = () => {
    loadArticles();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="w-32 h-20 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearchChange={setSearchQuery}
        onCreateArticle={handleCreateArticle}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {selectedArticleId ? (
          <ArticleDetail
            articleId={selectedArticleId}
            onBack={handleBackToFeed}
          />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {searchQuery 
                  ? `Search results for "${searchQuery}"` 
                  : selectedCategory === 'All' 
                    ? 'Latest Stories' 
                    : `${selectedCategory} Stories`
                }
              </h1>
              <p className="text-slate-600 text-lg">
                {searchQuery 
                  ? `Found ${filteredArticles.length} stories`
                  : 'Discover thoughtful stories from our community of writers'
                }
              </p>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-600 text-lg">
                  {searchQuery ? 'No stories found matching your search.' : 'No stories available in this category.'}
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onArticleClick={handleArticleClick}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    layout={viewMode}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <ArticleEditor
        isOpen={showArticleEditor}
        onClose={() => setShowArticleEditor(false)}
        onArticleCreated={handleArticleCreated}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;