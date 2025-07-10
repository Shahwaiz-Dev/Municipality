import { Post, Event, Page, User, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'An error occurred' };
      }

      return { data };
    } catch {
      return { error: 'Network error' };
    }
  }

  // Public API endpoints
  async getPosts(): Promise<ApiResponse<Post[]>> {
    return this.request<Post[]>('/api/posts');
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    return this.request<Post>(`/api/posts/${id}`);
  }

  async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.request<Event[]>('/api/events');
  }

  async getEvent(id: string): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/api/events/${id}`);
  }

  async getPage(slug: string): Promise<ApiResponse<Page>> {
    return this.request<Page>(`/api/pages/${slug}`);
  }

  // Admin API endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request<{ token: string; user: User }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    return this.request<{ token: string; user: User }>('/admin/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser(token: string): Promise<ApiResponse<User>> {
    return this.request<User>('/admin/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Admin CRUD operations (protected)
  async createPost(post: Partial<Post>, token: string): Promise<ApiResponse<Post>> {
    return this.request<Post>('/admin/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  }

  async updatePost(id: string, post: Partial<Post>, token: string): Promise<ApiResponse<Post>> {
    return this.request<Post>(`/admin/posts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  }

  async deletePost(id: string, token: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/admin/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 