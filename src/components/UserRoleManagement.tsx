import React, { useState } from 'react';

const UserRoleManagement = () => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personas');

  const personas = [
    {
      id: 1,
      name: 'RM Users',
      description: 'Relationship Managers handling customer accounts',
      activeUsers: 245,
      intents: 45,
      knowledge: 120,
      status: 'active',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Sales',
      description: 'Sales representatives and account executives',
      activeUsers: 156,
      intents: 32,
      knowledge: 89,
      status: 'active',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Travel Agents',
      description: 'Travel booking and customer service agents',
      activeUsers: 78,
      intents: 28,
      knowledge: 67,
      status: 'active',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Retailers',
      description: 'Retail partners and distributors',
      activeUsers: 34,
      intents: 15,
      knowledge: 23,
      status: 'inactive',
      color: 'bg-orange-500'
    }
  ];

  const knowledgeItems = [
    { id: 1, title: 'Account Management Guidelines', type: 'FAQ', persona: 'RM Users', status: 'active' },
    { id: 2, title: 'Product Catalog 2024', type: 'Document', persona: 'Sales', status: 'active' },
    { id: 3, title: 'Travel Booking Process', type: 'Intent', persona: 'Travel Agents', status: 'active' },
    { id: 4, title: 'Pricing Guidelines', type: 'FAQ', persona: 'Retailers', status: 'inactive' }
  ];

  const CreatePersonaModal = () => (
    <>
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Create New Persona</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Persona Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter persona name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select color</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  placeholder="Describe this persona and their role" 
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permissions Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select permissions</option>
                    <option value="basic">Basic Access</option>
                    <option value="advanced">Advanced Access</option>
                    <option value="admin">Admin Access</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="active" className="rounded border-gray-300" />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">Active Status</label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Persona
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Role Management</h1>
          <p className="text-gray-600">Manage personas and role-based knowledge configurations</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <span className="mr-2">👁️</span>
            Test Persona
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <span className="mr-2">➕</span>
            Create Persona
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'personas', label: 'Personas' },
            { id: 'knowledge', label: 'Knowledge Base' },
            { id: 'intents', label: 'Intents & Responses' },
            { id: 'testing', label: 'Role Testing' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'personas' && (
        <div className="space-y-4">
          {/* Personas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personas.map((persona) => (
              <div key={persona.id} className="bg-white rounded-lg shadow border cursor-pointer hover:shadow-lg transition-shadow">
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-4 h-4 rounded-full ${persona.color}`} />
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      persona.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {persona.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{persona.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{persona.description}</p>
                </div>
                <div className="px-4 pb-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Active Users</span>
                      <span className="font-medium">{persona.activeUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Intents</span>
                      <span className="font-medium">{persona.intents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Knowledge Items</span>
                      <span className="font-medium">{persona.knowledge}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      <span className="mr-1">✏️</span>
                      Edit
                    </button>
                    <button className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      <span className="mr-1">⚙️</span>
                      Config
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          {/* Knowledge Base Management */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium">Filters</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-2">By Persona</label>
                  <div className="space-y-2">
                    {personas.map((persona) => (
                      <div key={persona.id} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <div className={`w-3 h-3 rounded-full ${persona.color}`} />
                        <span className="text-sm">{persona.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-2">By Type</label>
                  <div className="space-y-2">
                    {['FAQ', 'Document', 'Intent', 'Policy'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-2">By Status</label>
                  <div className="space-y-2">
                    {['Active', 'Inactive', 'Draft'].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge Items */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center font-medium">
                    <span className="mr-2">📄</span>
                    Knowledge Base Items
                  </h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                      <input 
                        placeholder="Search knowledge..." 
                        className="pl-10 w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Bulk Actions</option>
                      <option value="activate">Activate</option>
                      <option value="deactivate">Deactivate</option>
                      <option value="delete">Delete</option>
                      <option value="export">Export</option>
                    </select>
                    <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <span className="mr-2">➕</span>
                      Add Knowledge
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {knowledgeItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <input type="checkbox" className="mt-1 rounded border-gray-300" />
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{item.title}</h4>
                              <span className="px-2 py-1 text-xs border rounded-full bg-gray-50 text-gray-600">
                                {item.type}
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {item.persona}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {item.type === 'FAQ' ? 'Frequently asked questions and answers for ' : 
                               item.type === 'Document' ? 'Reference document containing ' : 
                               'Intent configuration for '}
                              {item.persona.toLowerCase()} role.
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Updated: 2 days ago</span>
                              <span>85 views this month</span>
                              <span>Last tested: Today</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                          <button className="p-1 text-gray-600 hover:text-gray-900">
                            <span>👁️</span>
                          </button>
                          <button className="p-1 text-gray-600 hover:text-gray-900">
                            <span>✏️</span>
                          </button>
                          <button className="p-1 text-gray-600 hover:text-gray-900">
                            <span>🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'intents' && (
        <div className="space-y-4">
          {/* Intents & Responses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Persona Filter */}
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium">Filter by Persona</h3>
              </div>
              <div className="p-4 space-y-2">
                {personas.map((persona) => (
                  <div key={persona.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${persona.color}`} />
                      <span className="text-sm font-medium">{persona.name}</span>
                    </div>
                    <span className="px-2 py-1 text-xs border rounded-full bg-gray-50 text-gray-600">
                      {persona.intents}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intent List */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center font-medium">
                    <span className="mr-2">💬</span>
                    Intent Configuration
                  </h3>
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <span className="mr-2">➕</span>
                    Add Intent
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {/* Sample Intent Cards */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">RM Users</span>
                        <h4 className="font-medium">Account Balance Inquiry</h4>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <span>✏️</span>
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <span>🗑️</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Sample Phrases:</strong> "Check account balance", "What's my balance", "Account status"</p>
                      <p><strong>Response:</strong> "I can help you check the account balance. Please provide the account number..."</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Sales</span>
                        <h4 className="font-medium">Product Information</h4>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <span>✏️</span>
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <span>🗑️</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Sample Phrases:</strong> "Product details", "Tell me about", "Features and pricing"</p>
                      <p><strong>Response:</strong> "Here are the product details including features, pricing, and availability..."</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Travel Agents</span>
                        <h4 className="font-medium">Booking Assistance</h4>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <span>✏️</span>
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <span>🗑️</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Sample Phrases:</strong> "Book a flight", "Hotel reservation", "Travel package"</p>
                      <p><strong>Response:</strong> "I can help you with travel bookings. What destination and dates are you looking for?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'testing' && (
        <div className="space-y-4">
          {/* Role Testing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Configuration */}
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="flex items-center font-medium">
                  <span className="mr-2">🎯</span>
                  Test Configuration
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Persona</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose persona to test</option>
                    {personas.map((persona) => (
                      <option key={persona.id} value={persona.name}>
                        {persona.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Query</label>
                  <textarea 
                    placeholder="Enter a test query to see how the chatbot responds for this persona..."
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Quick Test Queries</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                      "What's my account balance?"
                    </button>
                    <button className="text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                      "I need help with a product return"
                    </button>
                    <button className="text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                      "Book a flight to Paris"
                    </button>
                    <button className="text-left px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                      "Show me wholesale pricing"
                    </button>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <span className="mr-2">🎯</span>
                  Run Test
                </button>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="flex items-center font-medium">
                  <span className="mr-2">💬</span>
                  Test Results
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {/* Sample Test Result */}
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">RM Users</span>
                      <span className="text-xs text-gray-500">2 seconds ago</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Query: "What's my account balance?"</p>
                        <p className="text-sm text-gray-600 mt-1">Response: "I can help you check your account balance. Please provide your account number or customer ID for verification."</p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Intent Matched</span>
                        <span className="text-gray-500">Confidence: 94%</span>
                        <span className="text-gray-500">Response Time: 1.2s</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Sales</span>
                      <span className="text-xs text-gray-500">1 minute ago</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Query: "Tell me about your premium package"</p>
                        <p className="text-sm text-gray-600 mt-1">Response: "Our premium package includes advanced features like priority support, extended warranty, and exclusive access to new products."</p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Intent Matched</span>
                        <span className="text-gray-500">Confidence: 87%</span>
                        <span className="text-gray-500">Response Time: 0.8s</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Travel Agents</span>
                      <span className="text-xs text-gray-500">3 minutes ago</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Query: "Book a flight to Tokyo"</p>
                        <p className="text-sm text-gray-600 mt-1">Response: "I can help you book a flight to Tokyo. What are your preferred travel dates and departure city?"</p>
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Intent Matched</span>
                        <span className="text-gray-500">Confidence: 92%</span>
                        <span className="text-gray-500">Response Time: 1.0s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CreatePersonaModal />
    </div>
  );
};

export default UserRoleManagement;