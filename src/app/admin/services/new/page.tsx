"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  Cog6ToothIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function NewService() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    icon: 'Cog6ToothIcon',
    status: 'active',
    contactInfo: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    operatingHours: '',
    processingTime: '',
    requirements: '',
    fees: '',
    features: [] as string[],
    documents: [] as string[],
    featuredImage: null as File | null,
    tags: '',
    metaDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newDocument, setNewDocument] = useState('');

  const availableFeatures = [
    'Online Application',
    'Document Upload',
    'Status Tracking',
    'Payment Processing',
    'Appointment Booking',
    'Live Chat Support',
    'Mobile App',
    'Email Notifications',
    'SMS Notifications',
    'Multi-language Support'
  ];

  const availableDocuments = [
    'ID Card',
    'Passport',
    'Proof of Address',
    'Income Certificate',
    'Business License',
    'Property Deed',
    'Medical Certificate',
    'Educational Certificate',
    'Marriage Certificate',
    'Birth Certificate'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, featuredImage: file }));
  };

  const addFeature = () => {
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData(prev => ({ ...prev, features: [...prev.features, newFeature] }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter(f => f !== feature) }));
  };

  const addDocument = () => {
    if (newDocument && !formData.documents.includes(newDocument)) {
      setFormData(prev => ({ ...prev, documents: [...prev.documents, newDocument] }));
      setNewDocument('');
    }
  };

  const removeDocument = (document: string) => {
    setFormData(prev => ({ ...prev, documents: prev.documents.filter(d => d !== document) }));
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
            href="/admin/services"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
            <p className="text-gray-600 mt-1">Add a new municipal service or online application.</p>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="Enter service title..."
                  />
                </div>

                <div>
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="Brief description for listings..."
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="Detailed service description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    >
                      <option value="">Select category</option>
                      <option value="Permits">Permits</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Business">Business</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Housing">Housing</option>
                      <option value="Social Services">Social Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Icon
                    </label>
                    <select
                      id="icon"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    >
                      <option value="Cog6ToothIcon">Settings</option>
                      <option value="DocumentTextIcon">Document</option>
                      <option value="PhoneIcon">Phone</option>
                      <option value="GlobeAltIcon">Website</option>
                      <option value="UserGroupIcon">Users</option>
                      <option value="ClockIcon">Clock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="processingTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Processing Time
                    </label>
                    <input
                      type="text"
                      id="processingTime"
                      name="processingTime"
                      value={formData.processingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                      placeholder="e.g., 5-7 business days"
                    />
                  </div>

                  <div>
                    <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-2">
                      Fees
                    </label>
                    <input
                      type="text"
                      id="fees"
                      name="fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                      placeholder="e.g., €25.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="List any prerequisites or requirements..."
                  />
                </div>

                <div>
                  <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Hours
                  </label>
                  <textarea
                    id="operatingHours"
                    name="operatingHours"
                    value={formData.operatingHours}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="e.g., Monday-Friday 8:00 AM - 5:00 PM"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Features</h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableFeatures.map((feature) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => {
                        if (!formData.features.includes(feature)) {
                          setFormData(prev => ({ ...prev, features: [...prev.features, feature] }));
                        }
                      }}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        formData.features.includes(feature)
                          ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Selected Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full flex items-center gap-1"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Add a document type..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={addDocument}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableDocuments.map((document) => (
                    <button
                      key={document}
                      type="button"
                      onClick={() => {
                        if (!formData.documents.includes(document)) {
                          setFormData(prev => ({ ...prev, documents: [...prev.documents, document] }));
                        }
                      }}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        formData.documents.includes(document)
                          ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {document}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Required Documents:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.documents.map((document) => (
                      <span
                        key={document}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full flex items-center gap-1"
                      >
                        {document}
                        <button
                          type="button"
                          onClick={() => removeDocument(document)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Media</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                  {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" /> */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information
                  </label>
                  <textarea
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="General contact information..."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="service@municipality.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex">
                    <PhoneIcon className="w-5 h-5 text-gray-400 mt-2 mr-2" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                      placeholder="+357 22 123456"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="flex">
                    <GlobeAltIcon className="w-5 h-5 text-gray-400 mt-2 mr-2" />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Office Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="Service office address..."
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex">
                    {/* <TagIcon className="w-5 h-5 text-gray-400 mt-2 mr-2" /> */}
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="SEO description..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Link
            href="/admin/services"
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
                  Creating Service...
                </>
              ) : (
                <>
                  <Cog6ToothIcon className="w-4 h-4" />
                  Create Service
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 