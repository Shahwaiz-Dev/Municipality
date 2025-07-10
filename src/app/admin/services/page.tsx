"use client";
import Link from 'next/link';
import { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function ServicesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const services = [
    {
      id: 1,
      title: 'Building Permits',
      description: 'Apply for building permits and construction licenses for residential and commercial projects.',
      category: 'Permits',
      status: 'Active',
      icon: 'DocumentTextIcon',
      contactInfo: '+357 22 123456',
      website: 'https://permits.example.com',
      image: '/api/placeholder/400/250',
      features: ['Online Application', 'Document Upload', 'Status Tracking', 'Payment Processing']
    },
    {
      id: 2,
      title: 'Waste Collection',
      description: 'Schedule waste collection services and learn about recycling programs.',
      category: 'Utilities',
      status: 'Active',
      icon: 'Cog6ToothIcon',
      contactInfo: '+357 22 123457',
      website: 'https://waste.example.com',
      image: '/api/placeholder/400/250',
      features: ['Schedule Pickup', 'Recycling Guide', 'Special Waste', 'Complaint System']
    },
    {
      id: 3,
      title: 'Business Registration',
      description: 'Register new businesses and obtain business licenses and permits.',
      category: 'Business',
      status: 'Active',
      icon: 'DocumentTextIcon',
      contactInfo: '+357 22 123458',
      website: 'https://business.example.com',
      image: '/api/placeholder/400/250',
      features: ['Online Registration', 'Document Verification', 'License Issuance', 'Renewal Reminders']
    },
    {
      id: 4,
      title: 'Public Transportation',
      description: 'Information about bus routes, schedules, and public transportation services.',
      category: 'Transportation',
      status: 'Active',
      icon: 'Cog6ToothIcon',
      contactInfo: '+357 22 123459',
      website: 'https://transport.example.com',
      image: '/api/placeholder/400/250',
      features: ['Route Planning', 'Real-time Updates', 'Ticket Purchase', 'Lost & Found']
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category.toLowerCase() === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Permits':
        return 'bg-blue-100 text-blue-800';
      case 'Utilities':
        return 'bg-green-100 text-green-800';
      case 'Business':
        return 'bg-purple-100 text-purple-800';
      case 'Transportation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage municipal services and online applications.</p>
        </div>
        <Link 
          href="/admin/services/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Add Service
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
                placeholder="Search services..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-black"
              >
                <option value="all">All Categories</option>
                <option value="permits">Permits</option>
                <option value="utilities">Utilities</option>
                <option value="business">Business</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-black"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-40 lg:h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(service.category)}`}>
                    {service.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 flex-shrink-0" />
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 line-clamp-1">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="truncate">{service.contactInfo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="truncate">{service.website}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="text-indigo-600 hover:text-indigo-900 p-1" title="View">
                      <span className="w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644l1.757-3.516a.5.5 0 01.42-.24H21a.5.5 0 01.42.24l1.757 3.516a1.012 1.012 0 010 .644l-1.757 3.516a.5.5 0 01-.42.24H4.467a.5.5 0 01-.42-.24L2.036 12.322z" />
                        </svg>
                      </span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 p-1" title="Edit">
                      <span className="w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.58 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </span>
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                      <span className="w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9 0a3 3 0 11-6 0 3 3 0 016 0zm-12 0a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 