"use client";
import Link from 'next/link';
import { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const newsArticles = [
    {
      id: 1,
      title: 'New Municipal Services Announced',
      excerpt: 'The municipality is pleased to announce new services available to residents...',
      author: 'Admin User',
      status: 'Published',
      publishedAt: '2024-01-15',
      image: '/api/placeholder/300/200',
      category: 'Services'
    },
    {
      id: 2,
      title: 'Summer Festival Registration Open',
      excerpt: 'Registration for the annual summer festival is now open...',
      author: 'Admin User',
      status: 'Draft',
      publishedAt: '2024-01-14',
      image: '/api/placeholder/300/200',
      category: 'Events'
    },
    {
      id: 3,
      title: 'Road Maintenance Schedule',
      excerpt: 'Important updates regarding road maintenance in the municipality...',
      author: 'Admin User',
      status: 'Published',
      publishedAt: '2024-01-13',
      image: '/api/placeholder/300/200',
      category: 'Infrastructure'
    },
    {
      id: 4,
      title: 'Community Meeting Announcement',
      excerpt: 'Join us for the monthly community meeting to discuss local issues...',
      author: 'Admin User',
      status: 'Published',
      publishedAt: '2024-01-12',
      image: '/api/placeholder/300/200',
      category: 'Community'
    }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-1">Manage news articles and announcements for the municipality website.</p>
        </div>
        <Link 
          href="/admin/news/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Add News Article
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-black"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* News Articles Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            News Articles ({filteredNews.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Author
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                  Published
                </th>
                <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNews.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-16">
                        <img 
                          className="h-12 w-16 object-cover rounded" 
                          src={article.image} 
                          alt={article.title}
                        />
                      </div>
                      <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{article.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</div>
                        {/* Mobile-only category and status */}
                        <div className="flex gap-2 mt-2 md:hidden">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {article.category}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                            {article.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{article.author}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{article.publishedAt}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1 lg:gap-2">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1" title="View">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 