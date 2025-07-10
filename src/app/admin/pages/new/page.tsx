"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  GlobeAltIcon,
  FolderIcon,
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function NewPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    parentPage: '',
    pageType: 'page',
    status: 'draft',
    featuredImage: null as File | null,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    isPublic: true,
    showInMenu: true,
    showInFooter: false,
    template: 'default',
    author: '',
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugPreview, setSlugPreview] = useState('');

  const parentPages = [
    { id: '', title: 'No Parent (Top Level)' },
    { id: 'about', title: 'About Us' },
    { id: 'services', title: 'Services' },
    { id: 'news', title: 'News' },
    { id: 'events', title: 'Events' }
  ];

  const templates = [
    { value: 'default', name: 'Default Template' },
    { value: 'full-width', name: 'Full Width' },
    { value: 'sidebar', name: 'With Sidebar' },
    { value: 'contact', name: 'Contact Page' },
    { value: 'landing', name: 'Landing Page' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
      setSlugPreview(generatedSlug);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, featuredImage: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    // Handle success/redirect
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/pages"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Page</h1>
            <p className="text-gray-600 mt-1">Add a new page to the municipality website.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter page title..."
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      /
                    </span>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="page-slug"
                    />
                  </div>
                  {slugPreview && (
                    <p className="text-sm text-gray-500 mt-1">
                      Preview: <span className="font-mono">/{slugPreview}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Page Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Brief description of the page..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pageType" className="block text-sm font-medium text-gray-700 mb-2">
                      Page Type
                    </label>
                    <select
                      id="pageType"
                      name="pageType"
                      value={formData.pageType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="page">Page</option>
                      <option value="subpage">Subpage</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="parentPage" className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Page
                    </label>
                    <select
                      id="parentPage"
                      name="parentPage"
                      value={formData.parentPage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {parentPages.map((page) => (
                        <option key={page.id} value={page.id}>{page.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Content</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300 bg-gray-50">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DocumentTextIcon className="w-4 h-4" />
                        Rich Text Editor
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                          <span className="text-sm font-bold">B</span>
                        </button>
                        <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                          <span className="text-sm italic">I</span>
                        </button>
                        <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                          <span className="text-sm underline">U</span>
                        </button>
                        <button type="button" className="p-1 text-gray-600 hover:text-gray-800">
                          <span className="text-sm">Link</span>
                        </button>
                      </div>
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={15}
                      className="w-full px-3 py-2 border-0 focus:ring-0 resize-none"
                      placeholder="Write your page content here... You can use HTML tags for formatting."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Media</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="featuredImage" className="cursor-pointer">
                      <span className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Upload an image
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <input
                      id="featuredImage"
                      name="featuredImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
                    Template
                  </label>
                  <select
                    id="template"
                    name="template"
                    value={formData.template}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {templates.map((template) => (
                      <option key={template.value} value={template.value}>{template.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Page author"
                  />
                </div>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Visibility</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EyeIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Public Page</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GlobeAltIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Show in Menu</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="showInMenu"
                      checked={formData.showInMenu}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Show in Footer</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="showInFooter"
                      checked={formData.showInFooter}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="SEO title (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="SEO description..."
                  />
                </div>

                <div>
                  <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex">
                    <TagIcon className="w-5 h-5 text-gray-400 mt-2 mr-2" />
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Link
            href="/admin/pages"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Page...
                </>
              ) : (
                <>
                  <DocumentTextIcon className="w-4 h-4" />
                  Create Page
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 