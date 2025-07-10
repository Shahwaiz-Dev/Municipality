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
  DocumentTextIcon,
  FolderIcon,
  GlobeAltIcon,
  LockClosedIcon
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
                          <GlobeAltIcon className="w-6 h-6 text-indigo-600" />
                        ) : page.hasChildren ? (
                          <FolderIcon className="w-6 h-6 text-blue-600" />
                        ) : (
                          <DocumentTextIcon className="w-6 h-6 text-gray-600" />
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
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      {!page.isHomepage && (
                        <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                          <TrashIcon className="w-4 h-4" />
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
            <GlobeAltIcon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <span className="text-sm text-gray-600">Homepage</span>
          </div>
          <div className="flex items-center gap-3">
            <FolderIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="text-sm text-gray-600">Parent Pages</span>
          </div>
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm text-gray-600">Content Pages</span>
          </div>
        </div>
      </div>
    </div>
  );
} 