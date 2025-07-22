import React, { useState } from 'react';

const Configuration = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAPIKeyModalOpen, setIsAPIKeyModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Mock data for uploaded documents
  const documents = [
    {
      id: 1,
      name: 'Banking Products Guide.pdf',
      size: '2.5 MB',
      uploadDate: '2024-01-07',
      status: 'indexed',
      personas: ['RM Users', 'Sales'],
      languages: ['English', 'Spanish'],
      indexingProgress: 100,
      embeddingStatus: 'completed',
      security: 'encrypted'
    },
    {
      id: 2,
      name: 'Travel Insurance Policies.docx',
      size: '1.8 MB',
      uploadDate: '2024-01-06',
      status: 'processing',
      personas: ['Travel Agents'],
      languages: ['English'],
      indexingProgress: 75,
      embeddingStatus: 'in-progress',
      security: 'encrypted'
    },
    {
      id: 3,
      name: 'Retail Guidelines.txt',
      size: '0.9 MB',
      uploadDate: '2024-01-05',
      status: 'failed',
      personas: ['Retailers'],
      languages: ['English'],
      indexingProgress: 0,
      embeddingStatus: 'failed',
      security: 'encrypted'
    }
  ];

  // Mock data for LLM models
  const llmModels = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', status: 'active', cost: '$$$$' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', provider: 'OpenAI', status: 'available', cost: '$$$' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', status: 'available', cost: '$$$$' },
    { id: 'palm-2', name: 'PaLM 2', provider: 'Google', status: 'available', cost: '$$$' },
    { id: 'llama-2', name: 'Llama 2', provider: 'Meta', status: 'available', cost: '$$' }
  ];

  const UploadModal = () => (
    <>
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Upload Documents</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* File Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
              >
                <div className="space-y-2">
                  <span className="text-4xl">📄</span>
                  <p className="text-lg font-medium">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-600">Supports PDF, DOC, DOCX, TXT files (max 10MB)</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Select Files
                  </button>
                </div>
              </div>

              {/* Document Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Personas</label>
                  <div className="space-y-2">
                    {['All Personas', 'RM Users', 'Sales', 'Travel Agents', 'Retailers'].map((persona) => (
                      <label key={persona} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">{persona}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <div className="space-y-2">
                    {['English', 'Spanish', 'French', 'German', 'Mandarin'].map((language) => (
                      <label key={language} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Settings</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Enable encryption at rest</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Apply role-based access control</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">Enable audit logging</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upload & Process
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const APIKeyModal = () => (
    <>
      {isAPIKeyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Manage API Keys</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Provider</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google</option>
                  <option value="meta">Meta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input 
                  type="password" 
                  placeholder="Enter API key" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Production OpenAI Key" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">🔒 Security:</span> API keys are encrypted and stored securely. Only masked values are displayed.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsAPIKeyModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsAPIKeyModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Key
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
          <h1 className="text-2xl font-bold text-gray-900">Configuration & Settings</h1>
          <p className="text-gray-600">Manage system configuration, models, documents, and general settings</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <span className="mr-2">📥</span>
            Export Config
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <span className="mr-2">💾</span>
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'documents', label: 'Document Upload', icon: '📄' },
            { id: 'models', label: 'Model Settings', icon: '🤖' },
            { id: 'general', label: 'General Settings', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Document Upload Section */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Knowledge Base Documents</h3>
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <span className="mr-2">📤</span>
                  Upload Documents
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded">
                          <span className="text-lg">
                            {doc.name.endsWith('.pdf') ? '📄' : 
                             doc.name.endsWith('.docx') ? '📝' : '📋'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.size} • Uploaded {doc.uploadDate}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              doc.status === 'indexed' ? 'bg-green-100 text-green-800' :
                              doc.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {doc.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              🔒 {doc.security}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                          Edit
                        </button>
                        <button className="px-2 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Indexing Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Indexing Progress</span>
                        <span>{doc.indexingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            doc.status === 'indexed' ? 'bg-green-500' :
                            doc.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${doc.indexingProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-600">Personas: </span>
                        {doc.personas.map((persona, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mr-1">
                            {persona}
                          </span>
                        ))}
                      </div>
                      <div>
                        <span className="text-xs text-gray-600">Languages: </span>
                        {doc.languages.map((language, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full mr-1">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Storage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border text-center">
              <h4 className="font-medium text-gray-900">Total Documents</h4>
              <p className="text-2xl font-bold text-blue-600">127</p>
              <p className="text-sm text-gray-600">+12 this month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border text-center">
              <h4 className="font-medium text-gray-900">Storage Used</h4>
              <p className="text-2xl font-bold text-green-600">2.3 GB</p>
              <p className="text-sm text-gray-600">of 10 GB limit</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border text-center">
              <h4 className="font-medium text-gray-900">Indexed Content</h4>
              <p className="text-2xl font-bold text-purple-600">94%</p>
              <p className="text-sm text-gray-600">Successfully processed</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'models' && (
        <div className="space-y-6">
          {/* LLM Model Selection */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">LLM Backend Configuration</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {llmModels.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{model.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        model.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{model.provider}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cost: {model.cost}</span>
                      <button className={`px-3 py-1 text-sm rounded ${
                        model.status === 'active' 
                          ? 'bg-green-600 text-white' 
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}>
                        {model.status === 'active' ? 'Active' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Model Parameters */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Model Parameters</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    defaultValue="0.7"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 (Conservative)</span>
                    <span>1 (Creative)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Tokens</label>
                  <input 
                    type="number" 
                    defaultValue="4096"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Context Window</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="4096">4K tokens</option>
                    <option value="8192">8K tokens</option>
                    <option value="16384">16K tokens</option>
                    <option value="32768">32K tokens</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Top P</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    defaultValue="0.9"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Templates */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Custom Prompt Templates</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">System Message</label>
                <textarea 
                  rows={4}
                  defaultValue="You are Gyaani, an intelligent assistant for banking and financial services. Provide accurate, helpful, and professional responses."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Query Template</label>
                <textarea 
                  rows={3}
                  defaultValue="User: {query}\nPersona: {persona}\nLanguage: {language}\nContext: {context}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Response Format Template</label>
                <textarea 
                  rows={3}
                  defaultValue="Provide a clear, concise response in {language}. Include relevant examples if helpful. End with a follow-up question if appropriate."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* API Key Management */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">API Key Management</h3>
                <button 
                  onClick={() => setIsAPIKeyModalOpen(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <span className="mr-2">🔑</span>
                  Add API Key
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">OpenAI Production</p>
                    <p className="text-sm text-gray-600">sk-...abc123 (GPT-4)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                    <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Edit</button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Anthropic Claude</p>
                    <p className="text-sm text-gray-600">ant-...xyz789 (Claude 3)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Inactive</span>
                    <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'general' && (
        <div className="space-y-6">
          {/* Bot Appearance */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Bot Appearance & Behavior</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bot Name</label>
                  <input 
                    type="text" 
                    defaultValue="Gyaani"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bot Avatar</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Change Avatar
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
                <textarea 
                  rows={3}
                  defaultValue="Hello! I'm Gyaani, your intelligent assistant for banking and financial services. How can I help you today?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fallback Message</label>
                <textarea 
                  rows={2}
                  defaultValue="I apologize, but I don't understand your question. Could you please rephrase it or ask something else?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Session & Timeout Settings</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="300">5 minutes</option>
                    <option value="600">10 minutes</option>
                    <option value="1800">30 minutes</option>
                    <option value="3600">1 hour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Response Timeout</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="10">10 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="120">2 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Conversation Length</label>
                  <input 
                    type="number" 
                    defaultValue="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum number of messages per conversation</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Concurrent Users Limit</label>
                  <input 
                    type="number" 
                    defaultValue="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications & Alerts */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Notifications & Alerts</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">High Error Rate Alert</p>
                    <p className="text-sm text-gray-600">Notify when error rate exceeds 5%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Low Confidence Responses</p>
                    <p className="text-sm text-gray-600">Alert when confidence drops below 70%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Daily Usage Reports</p>
                    <p className="text-sm text-gray-600">Email daily statistics to administrators</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Model Training Completion</p>
                    <p className="text-sm text-gray-600">Notify when retraining is complete</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email Addresses</label>
                <textarea 
                  rows={2}
                  placeholder="admin@company.com, manager@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* System Maintenance */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">System Maintenance</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="text-center">
                    <span className="text-2xl block mb-2">🔄</span>
                    <p className="font-medium">Clear Cache</p>
                    <p className="text-sm text-gray-600">Reset system cache</p>
                  </div>
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="text-center">
                    <span className="text-2xl block mb-2">💾</span>
                    <p className="font-medium">Backup Data</p>
                    <p className="text-sm text-gray-600">Create system backup</p>
                  </div>
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="text-center">
                    <span className="text-2xl block mb-2">📊</span>
                    <p className="font-medium">Health Check</p>
                    <p className="text-sm text-gray-600">Run system diagnostics</p>
                  </div>
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="text-center">
                    <span className="text-2xl block mb-2">🗑️</span>
                    <p className="font-medium">Clean Logs</p>
                    <p className="text-sm text-gray-600">Remove old log files</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UploadModal />
      <APIKeyModal />
    </div>
  );
};

export default Configuration;