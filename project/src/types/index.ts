export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: Date;
  followersCount: number;
  followingCount: number;
  articlesCount: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  publishedAt: Date;
  updatedAt: Date;
  category: string;
  tags: string[];
  likes: number;
  bookmarks: number;
  views: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  coverImage?: string;
  readTime: number;
  status: 'draft' | 'published';
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  articleId: string;
  parentId?: string;
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  articlesCount: number;
}