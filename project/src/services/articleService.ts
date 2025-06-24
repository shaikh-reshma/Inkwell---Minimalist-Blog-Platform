import { Article, User, Category } from '../types';

const mockUsers: User[] = [
  {
    id: '1',
    username: 'alexandrasmith',
    displayName: 'Alexandra Smith',
    email: 'alexandra@example.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Travel writer and photographer exploring hidden gems around the world',
    location: 'Barcelona, Spain',
    website: 'https://alexandrasmith.com',
    joinedAt: new Date('2023-02-10'),
    followersCount: 2847,
    followingCount: 156,
    articlesCount: 47,
  },
  {
    id: '2',
    username: 'marcuschen',
    displayName: 'Marcus Chen',
    email: 'marcus@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Tech entrepreneur and minimalist living advocate',
    location: 'Tokyo, Japan',
    joinedAt: new Date('2023-01-05'),
    followersCount: 1923,
    followingCount: 203,
    articlesCount: 31,
  },
  {
    id: '3',
    username: 'sophiawilson',
    displayName: 'Sophia Wilson',
    email: 'sophia@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Food critic and culinary storyteller',
    location: 'Paris, France',
    joinedAt: new Date('2023-03-15'),
    followersCount: 3421,
    followingCount: 89,
    articlesCount: 52,
  },
];

export const categories: Category[] = [
  { id: '1', name: 'Travel', slug: 'travel', description: 'Adventures and journeys', color: 'bg-emerald-100 text-emerald-800', articlesCount: 24 },
  { id: '2', name: 'Technology', slug: 'technology', description: 'Innovation and digital life', color: 'bg-blue-100 text-blue-800', articlesCount: 18 },
  { id: '3', name: 'Food', slug: 'food', description: 'Culinary experiences', color: 'bg-orange-100 text-orange-800', articlesCount: 31 },
  { id: '4', name: 'Lifestyle', slug: 'lifestyle', description: 'Living well and mindfully', color: 'bg-purple-100 text-purple-800', articlesCount: 27 },
  { id: '5', name: 'Art', slug: 'art', description: 'Creative expressions', color: 'bg-pink-100 text-pink-800', articlesCount: 15 },
];

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Hidden Cafés of Barcelona: A Local\'s Guide',
    content: `
      <p>Barcelona is renowned for its vibrant café culture, but beyond the tourist hotspots lie hidden gems that locals have cherished for generations. These intimate spaces tell stories of the city's rich history and evolving identity.</p>
      
      <h2>Café Central: Where Time Stands Still</h2>
      <p>Tucked away in the narrow streets of El Born, Café Central has been serving the perfect cortado since 1876. The original marble tables and vintage espresso machine create an atmosphere that transports you to another era.</p>
      
      <h2>La Biblioteca: Books and Brews</h2>
      <p>This unique café combines literature with exceptional coffee. Floor-to-ceiling bookshelves surround cozy reading nooks, making it the perfect spot for writers and dreamers alike.</p>
      
      <h2>Espai Joliu: The Artist's Haven</h2>
      <p>Located in Gràcia, this café doubles as an art gallery, showcasing local artists' work. The owner, Maria, personally selects each piece and can tell you the story behind every painting on the walls.</p>
      
      <p>These cafés represent more than just places to drink coffee—they're cultural institutions that preserve the soul of Barcelona's neighborhoods.</p>
    `,
    excerpt: 'Discover the intimate café culture of Barcelona through the eyes of a local, exploring hidden gems that tell the story of the city\'s rich heritage.',
    author: mockUsers[0],
    publishedAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    category: 'Travel',
    tags: ['Barcelona', 'Coffee', 'Local Culture', 'Hidden Gems'],
    likes: 127,
    bookmarks: 43,
    views: 892,
    coverImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 6,
    status: 'published',
  },
  {
    id: '2',
    title: 'Minimalism in the Digital Age: Finding Balance',
    content: `
      <p>In our hyperconnected world, the principles of minimalism offer a path to clarity and intentional living. But how do we apply these concepts to our digital lives?</p>
      
      <h2>Digital Decluttering</h2>
      <p>Start by auditing your digital spaces. Unsubscribe from newsletters that no longer serve you, organize your files, and delete apps that consume time without adding value.</p>
      
      <h2>Mindful Consumption</h2>
      <p>Before downloading a new app or subscribing to another service, ask yourself: "Does this align with my values and goals?" Quality over quantity applies to digital tools as much as physical possessions.</p>
      
      <h2>Creating Digital Boundaries</h2>
      <p>Establish specific times for checking emails and social media. Use your phone's do-not-disturb features intentionally, creating space for deep work and genuine connection.</p>
      
      <p>Minimalism isn't about having less—it's about making room for what matters most.</p>
    `,
    excerpt: 'Explore how minimalist principles can transform your relationship with technology and create space for what truly matters.',
    author: mockUsers[1],
    publishedAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    category: 'Lifestyle',
    tags: ['Minimalism', 'Digital Wellness', 'Productivity', 'Mindfulness'],
    likes: 89,
    bookmarks: 67,
    views: 654,
    coverImage: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 5,
    status: 'published',
  },
  {
    id: '3',
    title: 'The Art of French Pastry: Lessons from a Parisian Kitchen',
    content: `
      <p>There's something magical about stepping into a traditional Parisian pâtisserie at dawn. The aroma of butter, vanilla, and freshly baked bread creates an sensory symphony that speaks to the soul.</p>
      
      <h2>The Foundation: Understanding Ingredients</h2>
      <p>French pastry is built on the quality of its ingredients. European butter with its higher fat content, Madagascar vanilla, and flour milled to precise specifications—each component plays a crucial role.</p>
      
      <h2>Technique Over Speed</h2>
      <p>In our fast-paced world, French pastry teaches us the value of patience. Laminated dough for croissants requires time and temperature control that cannot be rushed.</p>
      
      <h2>The Philosophy of Perfection</h2>
      <p>Every fold, every measurement, every moment of timing contributes to the final result. It's a meditation on precision and respect for tradition.</p>
      
      <p>Learning French pastry isn't just about acquiring skills—it's about embracing a philosophy that values craftsmanship and the pursuit of excellence.</p>
    `,
    excerpt: 'Step into the world of French pastry and discover the philosophy of craftsmanship that transforms simple ingredients into edible art.',
    author: mockUsers[2],
    publishedAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    category: 'Food',
    tags: ['French Cuisine', 'Pastry', 'Craftsmanship', 'Paris'],
    likes: 156,
    bookmarks: 89,
    views: 1247,
    coverImage: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 7,
    status: 'published',
  },
];

export const articleService = {
  async getAllArticles(): Promise<Article[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockArticles;
  },

  async getArticleById(id: string): Promise<Article | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockArticles.find(article => article.id === id) || null;
  },

  async getArticlesByCategory(category: string): Promise<Article[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockArticles.filter(article => article.category.toLowerCase() === category.toLowerCase());
  },

  async createArticle(article: Omit<Article, 'id' | 'publishedAt' | 'updatedAt' | 'likes' | 'bookmarks' | 'views'>): Promise<Article> {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      publishedAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      bookmarks: 0,
      views: 0,
    };
    mockArticles.unshift(newArticle);
    return newArticle;
  },

  async likeArticle(articleId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
      article.likes += article.isLiked ? -1 : 1;
      article.isLiked = !article.isLiked;
    }
  },

  async bookmarkArticle(articleId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
      article.bookmarks += article.isBookmarked ? -1 : 1;
      article.isBookmarked = !article.isBookmarked;
    }
  },
};