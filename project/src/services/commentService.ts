import { Comment, User } from '../types';

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This is exactly what I needed! I\'ve been looking for authentic local spots in Barcelona. Thank you for sharing these hidden gems.',
    author: {
      id: '4',
      username: 'davidmiller',
      displayName: 'David Miller',
      email: 'david@example.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      joinedAt: new Date('2023-04-20'),
      followersCount: 234,
      followingCount: 67,
      articlesCount: 8,
    },
    articleId: '1',
    createdAt: new Date('2024-01-19'),
    likes: 12,
    isLiked: false,
  },
  {
    id: '2',
    content: 'Café Central sounds amazing! I\'ll definitely visit next time I\'m in Barcelona. Do they have any vegetarian pastries?',
    author: {
      id: '5',
      username: 'emmagreen',
      displayName: 'Emma Green',
      email: 'emma@example.com',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      joinedAt: new Date('2023-05-10'),
      followersCount: 156,
      followingCount: 89,
      articlesCount: 12,
    },
    articleId: '1',
    createdAt: new Date('2024-01-19'),
    likes: 8,
    isLiked: false,
  },
];

export const commentService = {
  async getCommentsByArticleId(articleId: string): Promise<Comment[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const comments = mockComments.filter(comment => comment.articleId === articleId);
    
    const topLevelComments = comments.filter(comment => !comment.parentId);
    const organizedComments = topLevelComments.map(comment => ({
      ...comment,
      replies: comments.filter(reply => reply.parentId === comment.id),
    }));
    
    return organizedComments;
  },

  async createComment(comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'isLiked'>): Promise<Comment> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
    };
    mockComments.push(newComment);
    return newComment;
  },

  async likeComment(commentId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const comment = mockComments.find(c => c.id === commentId);
    if (comment) {
      comment.likes += comment.isLiked ? -1 : 1;
      comment.isLiked = !comment.isLiked;
    }
  },
};