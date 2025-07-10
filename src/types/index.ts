export interface User {
  id: string;
  email: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  language: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  imageUrl?: string;
  language: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content?: string;
  language: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
} 