"use client";
import Link from 'next/link';
import { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function PagesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const pages = [
    {
      id: 1,
      title: 'Home',
      slug: '/',
      description: 'Main homepage of the municipality website',
      status: 'Published',
      type: 'Page',
      lastModified: '2024-01-15',
      author: 'Admin User',
      isHomepage: true,
      hasChildren: false
    },
    {
      id: 2,
      title: 'About Us',
      slug: '/about',
      description: 'Information about the municipality and its history',
      status: 'Published',
      type: 'Page',
      lastModified: '2024-01-14',
      author: 'Admin User',
      isHomepage: false,
      hasChildren: true
    },
    {
      id: 3,
      title: 'Services',
      slug: '/services',
      description: 'Overview of municipal services and applications',
      status: 'Published',
      type: 'Page',
      lastModified: '2024-01-13',
      author: 'Admin User',
      isHomepage: false,
      hasChildren: true
    },
    {
      id: 4,
      title: 'Contact',
      slug: '/contact',
      description: 'Contact information and office locations',
      status: 'Published',
      type: 'Page',
      lastModified: '2024-01-12',
      author: 'Admin User',
      isHomepage: false,
      hasChildren: false
    },
    {
      id: 5,
      title: 'Municipality History',
      slug: '/about/history',
      description: 'Detailed history of the municipality',
      status: 'Draft',
      type: 'Subpage',
      lastModified: '2024-01-11',
      author: 'Admin User',
      isHomepage: false,
      hasChildren: false
    },
    {
      id: 6,
      title: 'Online Services',
      slug: '/services/online',
      description: 'Digital services and online applications',
      status: 'Published',
      type: 'Subpage',
      lastModified: '2024-01-10',
      author: 'Admin User',
      isHomepage: false,
      hasChildren: false
    }
  ];

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status.toLowerCase() === statusFilter;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Page':
        return 'bg-blue-100 text-blue-800';
      case 'Subpage':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Pages Management</h1>
          <p className="text-gray-600 mt-1">Manage website pages and content structure.</p>
        </div>
        <Link 
          href="/admin/pages/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Add Page
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
                placeholder="Search pages..."
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

      {/* Pages Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Pages ({filteredPages.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Type
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Last Modified
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                  Author
                </th>
                <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {page.isHomepage ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.25-8.25-3.75 3.75M21.75 12l-8.25 8.25-3.75-3.75" />
                          </svg>
                        ) : page.hasChildren ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6V4.5A2.25 2.25 0 016 2.25h1.5m0 0H21A2.25 2.25 0 0123.25 4.5v1.5m0 0H6m18 0V19.5A2.25 2.25 0 0121 21.75H19.5m0 0h-18M21 19.5V12" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H6A2.25 2.25 0 003.75 4.5v1.5m18 0V19.5A2.25 2.25 0 0121 21.75H19.5" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="text-sm font-medium text-gray-900 truncate">{page.title}</div>
                          {page.isHomepage && (
                            <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full flex-shrink-0">
                              Homepage
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{page.slug}</div>
                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">{page.description}</div>
                        {/* Mobile-only type and status */}
                        <div className="flex gap-2 mt-2 md:hidden">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(page.type)}`}>
                            {page.type}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                            {page.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(page.type)}`}>
                      {page.type}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                    <div className="text-sm text-gray-900">{page.lastModified}</div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{page.author}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1 lg:gap-2">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1" title="View">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.678.07.207.106.43.107.639V11a1.5 1.5 0 01-3 0V5.834c0-.08-.01-.16-.03-.238A9.004 9.004 0 0012 2.25c-1.797 0-3.55.575-5 1.555V11a1.5 1.5 0 01-3 0v5.166z" />
                        </svg>
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.58 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      {!page.isHomepage && (
                        <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13a2 2 0 002 2h12a2 2 0 002-2z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Hierarchy Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Structure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.25-8.25-3.75 3.75M21.75 12l-8.25 8.25-3.75-3.75" />
            </svg>
            <span className="text-sm text-gray-600">Homepage</span>
          </div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6V4.5A2.25 2.25 0 016 2.25h1.5m0 0H21A2.25 2.25 0 0123.25 4.5v1.5m0 0H6m18 0V19.5A2.25 2.25 0 0121 21.75H19.5m0 0h-18M21 19.5V12" />
            </svg>
            <span className="text-sm text-gray-600">Parent Pages</span>
          </div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H6A2.25 2.25 0 003.75 4.5v1.5m18 0V19.5A2.25 2.25 0 0121 21.75H19.5" />
            </svg>
            <span className="text-sm text-gray-600">Content Pages</span>
          </div>
        </div>
      </div>
    </div>
  );
} 