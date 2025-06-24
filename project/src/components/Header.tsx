import React, { useState } from 'react';
import { Search, Bookmark, User, LogOut, Settings, Edit3, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onCreateArticle: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchChange, 
  onCreateArticle, 
  selectedCategory, 
  onCategoryChange 
}) => {
  const { authState, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const categories = ['All', 'Travel', 'Technology', 'Food', 'Lifestyle', 'Art'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inkwell</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'text-slate-900 border-b-2 border-slate-900 pb-1'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 bg-gray-50"
              />
            </div>

            {authState.isAuthenticated ? (
              <>
                <button
                  onClick={onCreateArticle}
                  className="hidden sm:flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Write</span>
                </button>
                
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    {authState.user?.avatar ? (
                      <img
                        src={authState.user.avatar}
                        alt={authState.user.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600" />
                      </div>
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-slate-900">{authState.user?.displayName}</p>
                        <p className="text-xs text-slate-500">@{authState.user?.username}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center space-x-3">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">
                  Sign in
                </button>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors text-sm font-medium">
                  Get started
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 bg-gray-50"
                />
              </div>

              {/* Mobile Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      setShowMobileMenu(false);
                    }}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      selectedCategory === category
                        ? 'bg-slate-900 text-white'
                        : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {authState.isAuthenticated && (
                <button
                  onClick={() => {
                    onCreateArticle();
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-full hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Write a story</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;