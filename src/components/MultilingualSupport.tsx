import React, { useState } from 'react';

const MultilingualSupport = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const [isAddLanguageModalOpen, setIsAddLanguageModalOpen] = useState(false);
  const [isAddResponseModalOpen, setIsAddResponseModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('google');

  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', status: 'active', users: 1245, accuracy: 98 },
    { code: 'es', name: 'Spanish', nativeName: 'Español', status: 'active', users: 892, accuracy: 95 },
    { code: 'fr', name: 'French', nativeName: 'Français', status: 'active', users: 634, accuracy: 93 },
    { code: 'de', name: 'German', nativeName: 'Deutsch', status: 'active', users: 456, accuracy: 91 },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', status: 'active', users: 324, accuracy: 89 },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', status: 'active', users: 267, accuracy: 87 },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', status: 'inactive', users: 123, accuracy: 82 },
    { code: 'ko', name: 'Korean', nativeName: '한국어', status: 'inactive', users: 89, accuracy: 79 }
  ];

  const translationProviders = [
    { id: 'google', name: 'Google Translate', status: 'active', cost: '$20/month', accuracy: 95 },
    { id: 'azure', name: 'Azure Translator', status: 'active', cost: '$15/month', accuracy: 93 },
    { id: 'deepl', name: 'DeepL', status: 'inactive', cost: '$30/month', accuracy: 97 },
    { id: 'aws', name: 'AWS Translate', status: 'inactive', cost: '$18/month', accuracy: 91 }
  ];

  const customResponses = [
    { id: 1, key: 'greeting', en: 'Hello! How can I help you?', es: '¡Hola! ¿Cómo puedo ayudarte?', fr: 'Bonjour! Comment puis-je vous aider?', de: 'Hallo! Wie kann ich Ihnen helfen?', category: 'General' },
    { id: 2, key: 'goodbye', en: 'Goodbye! Have a great day!', es: '¡Adiós! ¡Que tengas un buen día!', fr: 'Au revoir! Passez une excellente journée!', de: 'Auf Wiedersehen! Haben Sie einen schönen Tag!', category: 'General' },
    { id: 3, key: 'account_balance', en: 'Your account balance is', es: 'Su saldo de cuenta es', fr: 'Votre solde de compte est', de: 'Ihr Kontostand beträgt', category: 'Banking' },
    { id: 4, key: 'error_message', en: 'Sorry, I didn\'t understand that', es: 'Lo siento, no entendí eso', fr: 'Désolé, je n\'ai pas compris', de: 'Entschuldigung, das habe ich nicht verstanden', category: 'Error' }
  ];

  const multilingualDocuments = [
    { id: 1, name: 'Banking FAQ', languages: ['en', 'es', 'fr'], size: '2.4 MB', uploaded: '2 days ago', status: 'processed' },
    { id: 2, name: 'Product Catalog', languages: ['en', 'de', 'it'], size: '5.1 MB', uploaded: '1 week ago', status: 'processing' },
    { id: 3, name: 'Travel Guide', languages: ['en', 'es', 'fr', 'de'], size: '3.8 MB', uploaded: '3 days ago', status: 'processed' },
    { id: 4, name: 'Support Manual', languages: ['en', 'pt'], size: '1.2 MB', uploaded: '5 days ago', status: 'failed' }
  ];

  const AddLanguageModal = () => (
    <>
      {isAddLanguageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Add New Language</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a language</option>
                  <option value="zh">Chinese (Simplified)</option>
                  <option value="ru">Russian</option>
                  <option value="ar">Arabic</option>
                  <option value="hi">Hindi</option>
                  <option value="nl">Dutch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Translation Provider</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="google">Google Translate</option>
                  <option value="azure">Azure Translator</option>
                  <option value="deepl">DeepL</option>
                  <option value="aws">AWS Translate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fallback Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="autoTranslate" className="rounded border-gray-300" />
                <label htmlFor="autoTranslate" className="text-sm font-medium text-gray-700">Enable auto-translation</label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  onClick={() => setIsAddLanguageModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsAddLanguageModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Language
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const AddResponseModal = () => (
    <>
      {isAddResponseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Add Custom Response</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Response Key</label>
                  <input 
                    type="text" 
                    placeholder="e.g., welcome_message" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select category</option>
                    <option value="General">General</option>
                    <option value="Banking">Banking</option>
                    <option value="Travel">Travel</option>
                    <option value="Error">Error</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">English</label>
                  <textarea 
                    placeholder="English response" 
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spanish</label>
                  <textarea 
                    placeholder="Spanish response" 
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">French</label>
                  <textarea 
                    placeholder="French response" 
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">German</label>
                  <textarea 
                    placeholder="German response" 
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  onClick={() => setIsAddResponseModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsAddResponseModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Response
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
          <h1 className="text-2xl font-bold text-gray-900">Multilingual Support</h1>
          <p className="text-gray-600">Comprehensive language management and translation system for global reach</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <span className="mr-2">🧪</span>
            Test Translation
          </button>
          <button 
            onClick={() => setIsAddLanguageModalOpen(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <span className="mr-2">➕</span>
            Add Language
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Active Languages</h3>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-sm text-green-600">+2 this month</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <span className="text-2xl">🌐</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Translation Accuracy</h3>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-green-600">+1.5% this week</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Daily Translations</h3>
              <p className="text-2xl font-bold text-gray-900">12,547</p>
              <p className="text-sm text-green-600">+8.3% today</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <span className="text-2xl">🔄</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Multilingual Users</h3>
              <p className="text-2xl font-bold text-gray-900">3,821</p>
              <p className="text-sm text-green-600">+12.1% this month</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'languages', label: 'Languages', icon: '🌐' },
            { id: 'providers', label: 'Translation Providers', icon: '🔄' },
            { id: 'fallback', label: 'Fallback Settings', icon: '⚙️' },
            { id: 'responses', label: 'Custom Responses', icon: '💬' },
            { id: 'documents', label: 'Multilingual Documents', icon: '📄' },
            { id: 'testing', label: 'Translation Testing', icon: '🧪' }
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
      {activeTab === 'languages' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Supported Languages</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportedLanguages.map((lang) => (
                  <div key={lang.code} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lang.code === 'en' ? '🇺🇸' : lang.code === 'es' ? '🇪🇸' : lang.code === 'fr' ? '🇫🇷' : lang.code === 'de' ? '🇩🇪' : lang.code === 'it' ? '🇮🇹' : lang.code === 'pt' ? '🇵🇹' : lang.code === 'ja' ? '🇯🇵' : '🇰🇷'}</span>
                        <div>
                          <h4 className="font-medium">{lang.name}</h4>
                          <p className="text-sm text-gray-600">{lang.nativeName}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lang.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lang.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Users</span>
                        <span className="font-medium">{lang.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">{lang.accuracy}%</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">✏️</span>
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">⚙️</span>
                        Settings
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Translation Providers</h3>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <span className="mr-2">➕</span>
                  Add Provider
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {translationProviders.map((provider) => (
                  <div key={provider.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{provider.id === 'google' ? '🔍' : provider.id === 'azure' ? '☁️' : provider.id === 'deepl' ? '🧠' : '🌐'}</span>
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.cost}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        provider.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {provider.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">{provider.accuracy}%</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">⚙️</span>
                        Configure
                      </button>
                      <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">🧪</span>
                        Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fallback' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Language Fallback Settings</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Fallback Chain Configuration</h4>
                  <div className="space-y-4">
                    {supportedLanguages.filter(lang => lang.status === 'active').map((lang, index) => (
                      <div key={lang.code} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-sm text-gray-500">Priority: {index + 1}</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Fallback</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Fallback</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Fallback Behavior</h4>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Translation Failure Handling</h5>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="fallback" value="auto" defaultChecked />
                          <span className="text-sm">Auto-fallback to next language</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="fallback" value="prompt" />
                          <span className="text-sm">Prompt user to select language</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="fallback" value="error" />
                          <span className="text-sm">Show error message</span>
                        </label>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Detection Settings</h5>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Auto-detect user language</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Remember user preference</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Force language selection</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'responses' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Custom Multilingual Responses</h3>
                <button 
                  onClick={() => setIsAddResponseModalOpen(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <span className="mr-2">➕</span>
                  Add Response
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {customResponses.map((response) => (
                  <div key={response.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {response.category}
                        </span>
                        <h4 className="font-medium">{response.key}</h4>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🇺🇸 English</label>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{response.en}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🇪🇸 Spanish</label>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{response.es}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🇫🇷 French</label>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{response.fr}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🇩🇪 German</label>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{response.de}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Multilingual Documents</h3>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <span className="mr-2">📤</span>
                  Upload Document
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {multilingualDocuments.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.size} • {doc.uploaded}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'processed' 
                          ? 'bg-green-100 text-green-800' 
                          : doc.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">Languages:</span>
                      {doc.languages.map((lang) => (
                        <span key={lang} className="text-2xl">
                          {lang === 'en' ? '🇺🇸' : lang === 'es' ? '🇪🇸' : lang === 'fr' ? '🇫🇷' : lang === 'de' ? '🇩🇪' : lang === 'it' ? '🇮🇹' : '🇵🇹'}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">👁️</span>
                        View
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">📥</span>
                        Download
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        <span className="mr-1">🔄</span>
                        Reprocess
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'testing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Translation Testing</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Language</label>
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select target language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Translation Provider</label>
                  <select 
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="google">Google Translate</option>
                    <option value="azure">Azure Translator</option>
                    <option value="deepl">DeepL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text to Translate</label>
                  <textarea 
                    placeholder="Enter text to translate..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <span className="mr-2">🔄</span>
                  Translate
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Translation Results</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Original (English)</span>
                      <span className="text-xs text-gray-500">Source</span>
                    </div>
                    <p className="text-sm text-gray-700">Hello! How can I help you today?</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Translation (Spanish)</span>
                      <span className="text-xs text-gray-500">Google Translate • 95% confidence</span>
                    </div>
                    <p className="text-sm text-gray-700">¡Hola! ¿Cómo puedo ayudarte hoy?</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className="text-xs text-green-600">Excellent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span>95%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fluency</span>
                        <span>92%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Context</span>
                        <span>88%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddLanguageModal />
      <AddResponseModal />
    </div>
  );
};

export default MultilingualSupport;