"use client";
import Link from 'next/link';
import { 
  NewspaperIcon, 
  CalendarIcon, 
  Cog6ToothIcon, 
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total News Articles', value: '24', icon: NewspaperIcon, href: '/admin/news', color: 'bg-blue-500' },
    { name: 'Upcoming Events', value: '8', icon: CalendarIcon, href: '/admin/events', color: 'bg-green-500' },
    { name: 'Active Services', value: '12', icon: Cog6ToothIcon, href: '/admin/services', color: 'bg-purple-500' },
    { name: 'Published Pages', value: '6', icon: DocumentTextIcon, href: '/admin/pages', color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { type: 'News', title: 'New Municipal Services Announced', time: '2 hours ago', status: 'Published' },
    { type: 'Event', title: 'Summer Festival Registration Open', time: '4 hours ago', status: 'Draft' },
    { type: 'Service', title: 'Online Permit Application Updated', time: '1 day ago', status: 'Published' },
    { type: 'Page', title: 'Contact Information Updated', time: '2 days ago', status: 'Published' },
  ];

  const quickActions = [
    { name: 'Add News Article', href: '/admin/news/new', icon: PlusIcon, color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Create Event', href: '/admin/events/new', icon: PlusIcon, color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Add Service', href: '/admin/services/new', icon: PlusIcon, color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Create Page', href: '/admin/pages/new', icon: PlusIcon, color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your municipality website.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href} className="group">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-2 lg:p-3 rounded-lg ${stat.color} text-white flex-shrink-0 ml-3`}>
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-3 lg:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.type} • {activity.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ml-2 ${
                    activity.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.name} href={action.href} className="group">
                    <div className={`${action.color} text-white p-3 lg:p-4 rounded-lg hover:shadow-md transition-shadow flex items-center gap-3`}>
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm lg:text-base truncate">{action.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
        </div>
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600">Website Online</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600">Database Connected</span>
            </div>
            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600">Backup System Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 