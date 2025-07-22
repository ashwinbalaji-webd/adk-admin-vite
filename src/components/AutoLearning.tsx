import React, { useState } from 'react';

const AutoLearning = () => {
  const [activeTab, setActiveTab] = useState('unrecognized');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Mock data for unrecognized questions
  const unrecognizedQuestions = [
    {
      id: 1,
      question: 'How do I update my investment portfolio allocation?',
      count: 23,
      firstSeen: '2024-01-05',
      lastSeen: '2024-01-07',
      suggestedLabels: ['Investment', 'Portfolio Management', 'Account Updates'],
      confidence: 85,
      persona: 'RM Users',
      sentiment: 'neutral',
      status: 'pending'
    },
    {
      id: 2,
      question: 'What are the new crypto trading options available?',
      count: 18,
      firstSeen: '2024-01-04',
      lastSeen: '2024-01-07',
      suggestedLabels: ['Cryptocurrency', 'Trading', 'New Products'],
      confidence: 92,
      persona: 'Sales',
      sentiment: 'positive',
      status: 'pending'
    },
    {
      id: 3,
      question: 'Can I get a refund for my cancelled travel insurance?',
      count: 15,
      firstSeen: '2024-01-03',
      lastSeen: '2024-01-06',
      suggestedLabels: ['Travel Insurance', 'Refund', 'Cancellation'],
      confidence: 78,
      persona: 'Travel Agents',
      sentiment: 'negative',
      status: 'reviewed'
    },
    {
      id: 4,
      question: 'How to integrate third-party payment gateways?',
      count: 12,
      firstSeen: '2024-01-02',
      lastSeen: '2024-01-05',
      suggestedLabels: ['API Integration', 'Payment Systems', 'Technical'],
      confidence: 89,
      persona: 'Retailers',
      sentiment: 'neutral',
      status: 'pending'
    }
  ];

  // Mock data for feedback analysis
  const feedbackData = [
    {
      id: 1,
      feedback: 'The chatbot didn\'t understand my question about loan rates',
      rating: 2,
      user: 'John D.',
      date: '2024-01-07',
      category: 'Understanding',
      originalQuery: 'What are current home loan interest rates?',
      suggestedAction: 'Add intent for loan interest rate inquiries',
      status: 'pending'
    },
    {
      id: 2,
      feedback: 'Response was helpful but took too long',
      rating: 3,
      user: 'Sarah M.',
      date: '2024-01-06',
      category: 'Performance',
      originalQuery: 'Check my account balance',
      suggestedAction: 'Optimize response time for account queries',
      status: 'processed'
    },
    {
      id: 3,
      feedback: 'Perfect! Got exactly what I needed',
      rating: 5,
      user: 'Mike R.',
      date: '2024-01-06',
      category: 'Satisfaction',
      originalQuery: 'How to book a flight ticket?',
      suggestedAction: 'No action required - positive feedback',
      status: 'processed'
    }
  ];

  // Mock data for intent suggestions
  const intentSuggestions = [
    {
      id: 1,
      suggestedIntent: 'Investment Portfolio Management',
      confidence: 94,
      sampleQueries: [
        'How do I rebalance my portfolio?',
        'Update my investment allocation',
        'Change my risk profile'
      ],
      frequency: 45,
      category: 'Investment',
      status: 'new',
      suggestedResponse: 'I can help you manage your investment portfolio. Would you like to rebalance your allocation or update your risk profile?'
    },
    {
      id: 2,
      suggestedIntent: 'Cryptocurrency Trading',
      confidence: 87,
      sampleQueries: [
        'How to trade Bitcoin?',
        'What crypto options do you have?',
        'Start crypto trading'
      ],
      frequency: 32,
      category: 'Trading',
      status: 'new',
      suggestedResponse: 'We offer various cryptocurrency trading options. Let me guide you through the available crypto products and trading features.'
    },
    {
      id: 3,
      suggestedIntent: 'Travel Insurance Claims',
      confidence: 91,
      sampleQueries: [
        'File travel insurance claim',
        'Submit claim for trip cancellation',
        'Insurance claim status'
      ],
      frequency: 28,
      category: 'Insurance',
      status: 'approved',
      suggestedResponse: 'I can help you with your travel insurance claim. Please provide your policy number and details about your claim.'
    }
  ];

  // Mock data for training metrics
  const trainingMetrics = {
    lastTraining: '2024-01-06 14:30:00',
    nextScheduled: '2024-01-14 02:00:00',
    trainingStatus: 'completed',
    modelVersion: 'v2.3.1',
    accuracy: 94.2,
    newIntents: 12,
    updatedResponses: 45,
    trainingDuration: '2h 15m'
  };

  // Mock data for model performance
  const performanceData = [
    { metric: 'Intent Recognition Accuracy', value: 94.2, change: +2.1, trend: 'up' },
    { metric: 'Response Relevance', value: 91.8, change: +1.5, trend: 'up' },
    { metric: 'User Satisfaction', value: 4.3, change: +0.2, trend: 'up' },
    { metric: 'Unrecognized Queries', value: 5.8, change: -1.2, trend: 'down' }
  ];

  const LabelModal = () => (
    <>
      {isLabelModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Label & Categorize Question</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <p className="text-sm bg-gray-50 p-3 rounded">{selectedQuestion.question}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Suggested Labels</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedQuestion.suggestedLabels.map((label, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Labels</label>
                <input 
                  type="text" 
                  placeholder="Add custom labels (comma separated)" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select category</option>
                  <option value="banking">Banking</option>
                  <option value="investment">Investment</option>
                  <option value="travel">Travel</option>
                  <option value="insurance">Insurance</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsLabelModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsLabelModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save & Create Intent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const TrainingModal = () => (
    <>
      {isTrainingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Start Model Retraining</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Training Type</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="trainingType" value="incremental" defaultChecked />
                    <span className="text-sm">Incremental Training (Faster)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="trainingType" value="full" />
                    <span className="text-sm">Full Retraining (Better Results)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Sources</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">New labeled questions (23 items)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">User feedback (45 items)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Conversation logs (156 items)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Training Schedule</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="now">Start Immediately</option>
                  <option value="tonight">Tonight (Low Traffic)</option>
                  <option value="weekend">Next Weekend</option>
                  <option value="custom">Custom Schedule</option>
                </select>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">⚠️ Notice:</span> Training may take 1-3 hours and will temporarily affect response times.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setIsTrainingModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsTrainingModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Start Training
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
          <h1 className="text-2xl font-bold text-gray-900">Auto Learning & Training</h1>
          <p className="text-gray-600">Continuously improve chatbot intelligence through automated learning and feedback</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <span className="mr-2">📊</span>
            View Reports
          </button>
          <button 
            onClick={() => setIsTrainingModalOpen(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <span className="mr-2">🔄</span>
            Start Training
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Pending Questions</h3>
              <p className="text-2xl font-bold text-gray-900">68</p>
              <p className="text-sm text-orange-600">+12 this week</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <span className="text-2xl">❓</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Model Accuracy</h3>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-green-600">+2.1% this month</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Training Status</h3>
              <p className="text-2xl font-bold text-gray-900">Ready</p>
              <p className="text-sm text-blue-600">Last: 2 days ago</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">New Intents</h3>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-purple-600">Suggested</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <span className="text-2xl">💡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'unrecognized', label: 'Unrecognized Questions', icon: '❓' },
            { id: 'feedback', label: 'Feedback Analysis', icon: '📝' },
            { id: 'suggestions', label: 'Intent Suggestions', icon: '💡' },
            { id: 'training', label: 'Training Workflows', icon: '🔄' },
            { id: 'performance', label: 'Performance Monitoring', icon: '📊' }
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
      {activeTab === 'unrecognized' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Unrecognized Questions Bucket</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="processed">Processed</option>
                  </select>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Bulk Process
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {unrecognizedQuestions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <input 
                          type="checkbox" 
                          className="mt-1 rounded border-gray-300"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuestions([...selectedQuestions, question.id]);
                            } else {
                              setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                            }
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-2">{question.question}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span>Asked {question.count} times</span>
                            <span>•</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {question.persona}
                            </span>
                            <span>•</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              question.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                              question.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {question.sentiment === 'positive' ? '😊' : question.sentiment === 'negative' ? '😞' : '😐'}
                            </span>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">AI Suggested Labels ({question.confidence}% confidence):</p>
                            <div className="flex flex-wrap gap-2">
                              {question.suggestedLabels.map((label, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            First seen: {question.firstSeen} | Last seen: {question.lastSeen}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          question.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          question.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {question.status}
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedQuestion(question);
                            setIsLabelModalOpen(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Label & Process
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">User Feedback Analysis</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {feedbackData.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{feedback.user}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{feedback.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{feedback.feedback}</p>
                        <div className="text-xs text-gray-600 mb-2">
                          <span className="font-medium">Original Query:</span> {feedback.originalQuery}
                        </div>
                        <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                          <span className="font-medium">Suggested Action:</span> {feedback.suggestedAction}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          feedback.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {feedback.status}
                        </span>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                          Process
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">AI-Generated Intent Suggestions</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {intentSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-lg">{suggestion.suggestedIntent}</h4>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {suggestion.category}
                          </span>
                          <span className="text-sm text-gray-600">
                            {suggestion.confidence}% confidence
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Found in {suggestion.frequency} conversations
                        </p>
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Sample Queries:</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.sampleQueries.map((query, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                "{query}"
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-sm text-green-800">
                            <span className="font-medium">Suggested Response:</span> {suggestion.suggestedResponse}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          suggestion.status === 'new' ? 'bg-orange-100 text-orange-800' :
                          suggestion.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {suggestion.status}
                        </span>
                        <div className="flex space-x-1">
                          <button className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                            ✓ Approve
                          </button>
                          <button className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                            ✗ Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Training Status</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Current Model Version</p>
                    <p className="text-sm text-gray-600">{trainingMetrics.modelVersion}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Last Training</p>
                    <p className="text-sm text-gray-600">{trainingMetrics.lastTraining}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {trainingMetrics.trainingStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Next Scheduled</p>
                    <p className="text-sm text-gray-600">{trainingMetrics.nextScheduled}</p>
                  </div>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Training Data Summary</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">New Intents</p>
                    <p className="text-sm text-gray-600">Ready for training</p>
                  </div>
                  <span className="font-bold text-blue-600">{trainingMetrics.newIntents}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Updated Responses</p>
                    <p className="text-sm text-gray-600">Modified content</p>
                  </div>
                  <span className="font-bold text-green-600">{trainingMetrics.updatedResponses}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Training Duration</p>
                    <p className="text-sm text-gray-600">Last session</p>
                  </div>
                  <span className="font-bold text-purple-600">{trainingMetrics.trainingDuration}</span>
                </div>
                <button 
                  onClick={() => setIsTrainingModalOpen(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Start Manual Training
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Automated Training Workflows</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Weekly Scheduled Training</h4>
                    <p className="text-sm text-gray-600">Automatically retrain model every Sunday at 2 AM</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Enabled</span>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Threshold-based Training</h4>
                    <p className="text-sm text-gray-600">Trigger training when 50+ new questions are collected</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Performance-based Training</h4>
                    <p className="text-sm text-gray-600">Retrain when accuracy drops below 90%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Disabled</span>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.map((metric, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{metric.metric}</h4>
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? '📈' : '📉'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}{metric.metric.includes('Satisfaction') ? '/5' : '%'}</span>
                  <span className={`text-sm ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Learning Effectiveness Over Time</h3>
            </div>
            <div className="p-4">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="text-4xl block mb-2">📊</span>
                  <p>Performance chart visualization would go here</p>
                  <p className="text-sm">Showing accuracy trends, training impact, and learning curves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LabelModal />
      <TrainingModal />
    </div>
  );
};

export default AutoLearning;