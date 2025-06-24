import React, { useState } from 'react';
import { X, Save, Eye, Image } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { articleService, categories } from '../services/articleService';

interface ArticleEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleCreated: () => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ isOpen, onClose, onArticleCreated }) => {
  const { authState } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Lifestyle');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authState.user || loading) return;

    setLoading(true);
    try {
      const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const wordCount = content.split(' ').length;
      const readTime = Math.ceil(wordCount / 200);

      await articleService.createArticle({
        title,
        content: content.replace(/\n/g, '<br>'),
        excerpt: content.slice(0, 200) + '...',
        author: authState.user,
        category,
        tags: tagList,
        coverImage: coverImage || 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=800',
        readTime,
        status: 'published',
      });

      // Reset form
      setTitle('');
      setContent('');
      setCategory('Lifestyle');
      setTags('');
      setCoverImage('');
      setPreview(false);
      
      onArticleCreated();
      onClose();
    } catch (error) {
      console.error('Error creating article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden mx-4 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-slate-900">Write your story</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              <span>{preview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!preview ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full text-3xl font-bold text-slate-900 placeholder-slate-400 border-none outline-none resize-none bg-transparent"
                  placeholder="Tell your story..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 bg-gray-50"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 bg-gray-50"
                    placeholder="travel, adventure, culture"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cover Image URL (optional)
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 bg-gray-50"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 resize-none text-slate-700 leading-relaxed bg-gray-50"
                  placeholder="Share your thoughts, experiences, and insights..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Publishing...' : 'Publish Story'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="prose prose-lg prose-slate max-w-none">
              <h1 className="text-4xl font-bold text-slate-900 mb-6">{title || 'Your Story Title'}</h1>
              {coverImage && (
                <img src={coverImage} alt="Cover" className="w-full h-64 object-cover rounded-2xl mb-8" />
              )}
              <div 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} 
              />
              {tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
                  {tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;