import React, { useState } from 'react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPersona, setSelectedPersona] = useState('all');

  // Mock data for analytics
  const overviewStats = {
    totalUsers: 24847,
    userGrowth: 12.5,
    activeUsers: 18453,
    activeGrowth: 8.3,
    totalQueries: 156789,
    queryGrowth: 15.2,
    satisfaction: 4.2,
    satisfactionGrowth: 2.1
  };

  const usageData = [
    { date: '2024-01-01', users: 1200, queries: 4500, satisfaction: 4.1 },
    { date: '2024-01-02', users: 1350, queries: 4800, satisfaction: 4.2 },
    { date: '2024-01-03', users: 1280, queries: 4650, satisfaction: 4.0 },
    { date: '2024-01-04', users: 1420, queries: 5100, satisfaction: 4.3 },
    { date: '2024-01-05', users: 1380, queries: 4950, satisfaction: 4.1 },
    { date: '2024-01-06', users: 1500, queries: 5300, satisfaction: 4.4 },
    { date: '2024-01-07', users: 1600, queries: 5800, satisfaction: 4.5 }
  ];

  const personaMetrics = [
    { name: 'RM Users', users: 8450, queries: 45230, satisfaction: 4.3, growth: 15.2 },
    { name: 'Sales', users: 5670, queries: 32180, satisfaction: 4.1, growth: 12.8 },
    { name: 'Travel Agents', users: 3240, queries: 18950, satisfaction: 4.4, growth: 18.5 },
    { name: 'Retailers', users: 1093, queries: 7890, satisfaction: 3.9, growth: 8.3 }
  ];

  const languageStats = [
    { language: 'English', code: 'en', users: 12450, queries: 67890, accuracy: 95.2, flag: '🇺🇸' },
    { language: 'Spanish', code: 'es', users: 6780, queries: 34250, accuracy: 92.8, flag: '🇪🇸' },
    { language: 'French', code: 'fr', users: 3210, queries: 18960, accuracy: 89.5, flag: '🇫🇷' },
    { language: 'German', code: 'de', users: 2407, queries: 14680, accuracy: 87.3, flag: '🇩🇪' }
  ];

  const intentMetrics = [
    { intent: 'Account Balance', success: 96.5, attempts: 8950, category: 'Banking' },
    { intent: 'Product Information', success: 92.3, attempts: 7840, category: 'Sales' },
    { intent: 'Travel Booking', success: 89.7, attempts: 6230, category: 'Travel' },
    { intent: 'Support Request', success: 94.1, attempts: 5670, category: 'General' },
    { intent: 'Password Reset', success: 98.2, attempts: 4320, category: 'Technical' }
  ];

  const feedbackData = [
    { id: 1, user: 'John D.', rating: 5, comment: 'Very helpful and quick responses', date: '2 hours ago', persona: 'RM Users' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good but could be more detailed', date: '4 hours ago', persona: 'Sales' },
    { id: 3, user: 'Mike R.', rating: 5, comment: 'Excellent service, solved my issue quickly', date: '6 hours ago', persona: 'Travel Agents' },
    { id: 4, user: 'Lisa K.', rating: 3, comment: 'Response was okay but took some time', date: '8 hours ago', persona: 'Retailers' }
  ];

  const unansweredQueries = [
    { query: 'How to update my investment portfolio?', count: 45, category: 'Investment', lastAsked: '2 hours ago' },
    { query: 'What are the new travel insurance options?', count: 32, category: 'Travel', lastAsked: '4 hours ago' },
    { query: 'Can I get a refund for cancelled service?', count: 28, category: 'Support', lastAsked: '1 hour ago' },
    { query: 'How to integrate with third-party APIs?', count: 19, category: 'Technical', lastAsked: '6 hours ago' }
  ];

  const auditLogs = [
    { id: 1, user: 'Admin User', action: 'Updated RM Users persona configuration', timestamp: '2024-01-07 14:30:25', type: 'Configuration' },
    { id: 2, user: 'John Smith', action: 'Added new French language responses', timestamp: '2024-01-07 13:15:10', type: 'Content' },
    { id: 3, user: 'Sarah Johnson', action: 'Modified intent recognition settings', timestamp: '2024-01-07 12:45:33', type: 'Model' },
    { id: 4, user: 'Mike Wilson', action: 'Uploaded new training document', timestamp: '2024-01-07 11:20:18', type: 'Training' }
  ];

  const SimpleChart = ({ data, type = 'line' }) => {
    const maxValue = Math.max(...data.map(d => d.users || d.queries || d.satisfaction));
    
    return (
      <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div 
              className="w-8 bg-blue-500 rounded-t"
              style={{ 
                height: `${((item.users || item.queries || item.satisfaction) / maxValue) * 200}px` 
              }}
            ></div>
            <span className="text-xs text-gray-600 transform -rotate-45 origin-center">
              {new Date(item.date).getDate()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into chatbot performance and user engagement</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <span className="mr-2">📊</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{overviewStats.userGrowth}%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Active Users</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.activeUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{overviewStats.activeGrowth}%</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Total Queries</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalQueries.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{overviewStats.queryGrowth}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Satisfaction</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.satisfaction}/5</p>
              <p className="text-sm text-green-600">+{overviewStats.satisfactionGrowth}%</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'usage', label: 'Usage Analytics', icon: '📈' },
            { id: 'language', label: 'Language Analytics', icon: '🌐' },
            { id: 'intents', label: 'Intent Analytics', icon: '🎯' },
            { id: 'feedback', label: 'User Feedback', icon: '⭐' },
            { id: 'queries', label: 'Query Analysis', icon: '🔍' },
            { id: 'audit', label: 'Audit Logs', icon: '📋' }
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Daily Active Users Trend</h3>
            </div>
            <div className="p-4">
              <SimpleChart data={usageData} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Persona Performance</h3>
            </div>
            <div className="p-4 space-y-4">
              {personaMetrics.map((persona, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{persona.name}</h4>
                    <p className="text-sm text-gray-600">{persona.users.toLocaleString()} users</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{persona.satisfaction}/5</span>
                    <p className="text-xs text-green-600">+{persona.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Usage Analytics</h3>
                <select 
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Personas</option>
                  <option value="rm">RM Users</option>
                  <option value="sales">Sales</option>
                  <option value="travel">Travel Agents</option>
                  <option value="retail">Retailers</option>
                </select>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-medium mb-4">User Activity Over Time</h4>
                  <SimpleChart data={usageData} />
                </div>
                <div>
                  <h4 className="font-medium mb-4">Persona Breakdown</h4>
                  <div className="space-y-3">
                    {personaMetrics.map((persona, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{persona.name}</span>
                          <span className="text-sm text-gray-600">{((persona.users / personaMetrics.reduce((sum, p) => sum + p.users, 0)) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Users</span>
                            <span>{persona.users.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Queries</span>
                            <span>{persona.queries.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'language' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Language Usage & Performance</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {languageStats.map((lang, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium">{lang.language}</span>
                      </div>
                      <span className="text-sm text-gray-600">{lang.accuracy}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Users</span>
                        <span>{lang.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Queries</span>
                        <span>{lang.queries.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${lang.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'intents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Intent Recognition Performance</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {intentMetrics.map((intent, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{intent.intent}</h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {intent.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-green-600">{intent.success}%</span>
                        <p className="text-sm text-gray-600">{intent.attempts.toLocaleString()} attempts</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${intent.success}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Rating Distribution</h3>
              </div>
              <div className="p-4 space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm w-8">{rating} ⭐</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${rating === 5 ? 45 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 7 : 3}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{rating === 5 ? 45 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 7 : 3}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Recent Feedback</h3>
              </div>
              <div className="p-4 space-y-4">
                {feedbackData.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{feedback.user}</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {feedback.persona}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'queries' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Unanswered Questions</h3>
              </div>
              <div className="p-4 space-y-4">
                {unansweredQueries.map((query, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{query.query}</p>
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 inline-block mt-1">
                          {query.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-red-600">{query.count}</span>
                        <p className="text-xs text-gray-500">times asked</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Last asked: {query.lastAsked}</p>
                    <div className="flex space-x-2 mt-2">
                      <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        Create Response
                      </button>
                      <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                        Add to Training
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Popular Query Heatmap</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { query: 'Account Balance', heat: 90 },
                    { query: 'Password Reset', heat: 85 },
                    { query: 'Transfer Money', heat: 80 },
                    { query: 'Product Info', heat: 75 },
                    { query: 'Travel Booking', heat: 70 },
                    { query: 'Support Request', heat: 65 },
                    { query: 'Account History', heat: 60 },
                    { query: 'Interest Rates', heat: 55 },
                    { query: 'Branch Locator', heat: 50 },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded text-xs text-center ${
                        item.heat >= 80 ? 'bg-red-500 text-white' :
                        item.heat >= 60 ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}
                    >
                      <div className="font-medium">{item.query}</div>
                      <div className="text-xs opacity-75">{item.heat}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span>Low Activity</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                  </div>
                  <span>High Activity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">System Audit Logs</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Actions</option>
                    <option value="configuration">Configuration</option>
                    <option value="content">Content</option>
                    <option value="model">Model</option>
                    <option value="training">Training</option>
                  </select>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Export Logs
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{log.action}</h4>
                        <p className="text-sm text-gray-600">by {log.user}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          log.type === 'Configuration' ? 'bg-blue-100 text-blue-800' :
                          log.type === 'Content' ? 'bg-green-100 text-green-800' :
                          log.type === 'Model' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {log.type}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;