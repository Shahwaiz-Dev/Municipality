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
  MapPinIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function EventsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const events = [
    {
      id: 1,
      title: 'Summer Festival 2024',
      description: 'Annual summer festival with live music, food, and activities for the whole family.',
      date: '2024-07-15',
      time: '18:00',
      location: 'Central Park',
      status: 'Upcoming',
      attendees: 150,
      image: '/api/placeholder/400/250',
      category: 'Festival'
    },
    {
      id: 2,
      title: 'Community Meeting',
      description: 'Monthly community meeting to discuss local issues and upcoming projects.',
      date: '2024-01-25',
      time: '19:00',
      location: 'Town Hall',
      status: 'Upcoming',
      attendees: 45,
      image: '/api/placeholder/400/250',
      category: 'Meeting'
    },
    {
      id: 3,
      title: 'Road Maintenance Workshop',
      description: 'Workshop on upcoming road maintenance projects and traffic management.',
      date: '2024-01-20',
      time: '14:00',
      location: 'Municipal Office',
      status: 'Completed',
      attendees: 30,
      image: '/api/placeholder/400/250',
      category: 'Workshop'
    },
    {
      id: 4,
      title: 'Youth Sports Tournament',
      description: 'Annual youth sports tournament featuring football, basketball, and volleyball.',
      date: '2024-06-10',
      time: '09:00',
      location: 'Sports Complex',
      status: 'Upcoming',
      attendees: 200,
      image: '/api/placeholder/400/250',
      category: 'Sports'
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600 mt-1">Manage events, workshops, and community activities.</p>
        </div>
        <Link 
          href="/admin/events/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Add Event
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
                placeholder="Search events..."
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
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'} rounded-l-lg transition-colors`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'} rounded-r-lg transition-colors`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-40 lg:h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                    {event.category}
                  </span>
                </div>
                
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserGroupIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Events ({filteredEvents.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Date & Time
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                    Location
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-16">
                          <img 
                            className="h-12 w-16 object-cover rounded" 
                            src={event.image} 
                            alt={event.title}
                          />
                        </div>
                        <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{event.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{event.description}</div>
                          {/* Mobile-only category and status */}
                          <div className="flex gap-2 mt-2 md:hidden">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              {event.category}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                      <div className="text-sm text-gray-900 truncate">{event.location}</div>
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
      )}
    </div>
  );
} 