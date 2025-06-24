import React from 'react';
import { categories } from '../services/articleService';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const allCategories = [{ name: 'All', slug: 'all', description: 'All stories', color: 'bg-slate-100 text-slate-800' }, ...categories];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {allCategories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.name
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
            {category.name !== 'All' && (
              <span className="ml-2 text-xs opacity-75">
                {(category as any).articlesCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;