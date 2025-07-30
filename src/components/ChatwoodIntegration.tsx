import React, { useEffect, useState } from "react";
import {
  useLazyGetGroupWiseUsersQuery,
  useLazyGetInvocationsQuery,
} from "../services/Analytics/Analytics";
import type { GroupWiseUsersData } from "../services/Analytics/Analytics.d";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatwoodIntegration = () => {
  const [activeTab, setActiveTab] = useState("conversations");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [groupWiseUsers, setGroupWiseUsers] = useState<
    GroupWiseUsersData | undefined
  >(undefined);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [getGroupWiseUsersService, groupWiseUsersResponse] =
    useLazyGetGroupWiseUsersQuery();

  const [getUserInvocationsService] = useLazyGetInvocationsQuery();

  useEffect(() => {
    getGroupWiseUsersService({ active: "true" });
  }, [getGroupWiseUsersService]);

  useEffect(() => {
    if (
      groupWiseUsersResponse?.data &&
      groupWiseUsersResponse?.data?.response_code === 0 &&
      groupWiseUsersResponse?.data?.response?.data
    ) {
      const data = groupWiseUsersResponse?.data?.response?.data;
      setSelectedGroup(data?.group_wise[0]);
      setGroupWiseUsers(data);
    }
  }, [groupWiseUsersResponse]);

  // Mock data for agents
  const agents = [
    {
      id: 1,
      name: "Sarah Wilson",
      status: "online",
      avatar: "SW",
      activeChats: 3,
      maxChats: 5,
      responseTime: "2 min",
      satisfaction: 4.8,
      specialties: ["Banking", "Support"],
    },
    {
      id: 2,
      name: "Mike Johnson",
      status: "online",
      avatar: "MJ",
      activeChats: 2,
      maxChats: 4,
      responseTime: "1 min",
      satisfaction: 4.6,
      specialties: ["Sales", "Travel"],
    },
    {
      id: 3,
      name: "Emily Davis",
      status: "away",
      avatar: "ED",
      activeChats: 1,
      maxChats: 3,
      responseTime: "5 min",
      satisfaction: 4.9,
      specialties: ["Technical", "Escalations"],
    },
    {
      id: 4,
      name: "James Brown",
      status: "offline",
      avatar: "JB",
      activeChats: 0,
      maxChats: 5,
      responseTime: "N/A",
      satisfaction: 4.7,
      specialties: ["General", "Training"],
    },
  ];

  // Mock data for predefined responses
  const responseTemplates = [
    {
      id: 1,
      title: "Welcome Message",
      content: "Hello! Thank you for contacting us. How can I help you today?",
      category: "Greeting",
      usage: 245,
      personas: ["All"],
    },
    {
      id: 2,
      title: "Account Balance Inquiry",
      content:
        "I can help you check your account balance. Please provide your account number for verification.",
      category: "Banking",
      usage: 189,
      personas: ["RM Users"],
    },
    {
      id: 3,
      title: "Travel Booking Assistance",
      content:
        "I'd be happy to help you with your travel booking. What destination and dates are you looking for?",
      category: "Travel",
      usage: 156,
      personas: ["Travel Agents"],
    },
    {
      id: 4,
      title: "Escalation Notice",
      content:
        "I understand your concern. Let me escalate this to our specialist team who can better assist you.",
      category: "Escalation",
      usage: 67,
      personas: ["All"],
    },
  ];

  // Mock conversation history
  const conversationHistory = [
    {
      id: 1,
      sender: "customer",
      message: "Hi, I need help with my account balance",
      timestamp: "10:15 AM",
      sentiment: "neutral",
    },
    {
      id: 2,
      sender: "agent",
      message:
        "Hello! I'd be happy to help you check your account balance. For security purposes, could you please provide me with your account number?",
      timestamp: "10:16 AM",
      sentiment: "positive",
    },
    {
      id: 3,
      sender: "customer",
      message: "Sure, it's 123456789",
      timestamp: "10:17 AM",
      sentiment: "neutral",
    },
    {
      id: 4,
      sender: "agent",
      message:
        "Thank you. I can see your account now. Your current balance is $2,450.75. Is there anything else I can help you with?",
      timestamp: "10:18 AM",
      sentiment: "positive",
    },
  ];

  const AssignAgentModal = () => (
    <>
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Assign Agent</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Agent
                </label>
                <div className="space-y-2">
                  {agents
                    .filter((agent) => agent.status === "online")
                    .map((agent) => (
                      <label
                        key={agent.id}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name="agent"
                          value={agent.id}
                          onChange={(e) => setSelectedAgent(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-medium">
                              {agent.avatar}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-gray-600">
                              {agent.activeChats}/{agent.maxChats} active chats
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {agent.satisfaction}/5
                          </p>
                          <p className="text-xs text-gray-500">
                            {agent.responseTime}
                          </p>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Note
                </label>
                <textarea
                  placeholder="Add a note for the assigned agent..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Assign Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const TemplateModal = () => (
    <>
      {isTemplateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Add Response Template</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter template title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select category</option>
                    <option value="greeting">Greeting</option>
                    <option value="banking">Banking</option>
                    <option value="travel">Travel</option>
                    <option value="escalation">Escalation</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Content
                </label>
                <textarea
                  placeholder="Enter your response template..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available for Personas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "All",
                    "RM Users",
                    "Sales",
                    "Travel Agents",
                    "Retailers",
                  ].map((persona) => (
                    <label
                      key={persona}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{persona}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  console.log("--->selectedGroup", selectedGroup);

  const handleGroupChange = (group_id: number) => {
    setSelectedGroup(
      groupWiseUsers?.group_wise.find((group) => group.group_id == group_id)
    );
    setSelectedConversation(null);
  };

  const handleConvChange = async (group, user) => {
    if (!group.group_id || !user.user_id) {
      console.error("Invalid group_id or user_id", {
        group_id: group.group_id,
        user_id: user.user_id,
      });
      return;
    }
    const invocations = await getUserInvocationsService({
      groupId: group.group_id,
      userId: user.user_id,
    }).unwrap();

    if (invocations?.response?.data) {
      setSelectedConversation({
        group,
        user,
        invocations: invocations?.response?.data,
      });
    } else {
      console.warn("No conversation data found");
    }
  };

  const toReadableTime = (timestamp: string) => {
    const dateObj1 = new Date(timestamp);
    return dateObj1.toLocaleString();
  };

  console.log("selectedConversation----->", selectedConversation);
  console.log("selected group-->", selectedGroup);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Live Chat Management
          </h1>
          <p className="text-gray-600">
            Real-time conversation monitoring and agent management integrated
            with Chatwoot
          </p>
        </div>
        {/* <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <span className="mr-2">🔄</span>
            Refresh
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <span className="mr-2">⚙️</span>
            Settings
          </button>
        </div> */}
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Active Conversations</h3>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-sm text-green-600">+3 from yesterday</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Online Agents</h3>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-blue-600">2 available</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Avg Response Time</h3>
              <p className="text-2xl font-bold text-gray-900">2.3m</p>
              <p className="text-sm text-green-600">-0.5m from yesterday</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Customer Satisfaction</h3>
              <p className="text-2xl font-bold text-gray-900">4.7</p>
              <p className="text-sm text-green-600">+0.2 this week</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "conversations", label: "Live Conversations", icon: "💬" },
            // { id: 'agents', label: 'Agent Management', icon: '👥' },
            // { id: 'templates', label: 'Response Templates', icon: '📝' },
            // { id: 'history', label: 'Chat History', icon: '📚' },
            // { id: 'escalation', label: 'Escalation Flow', icon: '🔺' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "conversations" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Active Conversations</h3>
                <div className="flex space-x-2">
                  <select
                    className="px-2 py-1 border border-gray-300 rounded text-xs"
                    value={selectedGroup?.group_id}
                    onChange={(e) => handleGroupChange(e.target.value)}
                  >
                    {/* <option value="">All Groups</option> */}
                    {groupWiseUsers?.group_wise?.map((group) => (
                      <option key={group.group_id} value={group.group_id}>
                        {group.group_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {selectedGroup &&
                selectedGroup?.users.map((user) => {
                  return (
                    <div
                      key={user.user_id}
                      onClick={() => handleConvChange(selectedGroup, user)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?.user?.user_id === user.user_id
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}
                            </span>
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white bg-green-500`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">
                              {`${user.first_name} ${user.last_name}`}
                            </p>
                            {/* <div className="flex items-center space-x-1">
                            <span className="text-xs">
                              {conv.channel === "Website"
                                ? "🌐"
                                : conv.channel === "WhatsApp"
                                ? "💬"
                                : conv.channel === "Email"
                                ? "📧"
                                : "📘"}
                            </span>
                            {conv.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-xs px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                                {conv.unreadCount}
                              </span>
                            )} */}
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.email_id}
                          </p>
                        </div>
                        {/* <p className="text-xs text-gray-600 truncate">
                          {user?.email_id}
                        </p> */}
                        {/* <div className="flex items-center justify-between mt-1"> */}
                        {/* <span className="text-xs text-gray-500">
                          {user?.email_id}
                        </span> */}
                        {/* <span
                            className={`text-xs px-1 rounded ${
                              conv.sentiment === "positive"
                                ? "bg-green-100 text-green-800"
                                : conv.sentiment === "negative"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {conv.sentiment === "positive"
                              ? "😊"
                              : conv.sentiment === "negative"
                              ? "😞"
                              : "😐"}
                          </span> */}
                        {/* </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow border">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {`${selectedConversation?.user?.first_name[0].toUpperCase()}${selectedConversation?.user?.last_name[0].toUpperCase()}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">
                            {selectedConversation?.user?.first_name}{" "}
                            {selectedConversation?.user?.last_name}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{selectedConversation?.user.email_id}</span>
                            <span>•</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {selectedConversation.group.group_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {selectedConversation?.invocations?.invocations.map(
                    (invocation) => (
                      <>
                        {/* User */}
                        <div
                          key={invocation.invocation_id}
                          className={`flex justify-end`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-900`}
                          >
                            <p className="text-sm">{invocation.user_queries}</p>
                            <p className={`text-xs mt-1 text-gray-500`}>
                              {toReadableTime(invocation.timestamp)}
                            </p>
                          </div>
                        </div>
                        {/* Bot */}
                        <div
                          key={invocation?.invocation_id}
                          className={`flex justify-start`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg bg-blue-600 text-white`}
                          >
                            <p className="text-sm">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {invocation?.assistant_responses}
                              </ReactMarkdown>
                            </p>
                            <p className={`text-xs mt-1 text-blue-100`}>
                              {toReadableTime(invocation.timestamp)}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>

                {/* Message Input */}
                {/* <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <textarea
                        placeholder="Type your message..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Send
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-xs">
                        Templates
                      </button>
                    </div>
                  </div>
                </div> */}
              </>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <span className="text-4xl mb-4 block">💬</span>
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "agents" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg shadow border p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {agent.avatar}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      agent.status === "online"
                        ? "bg-green-500"
                        : agent.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <h4 className="font-medium">{agent.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {agent.status}
                  </p>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span>Active Chats</span>
                  <span className="font-medium">
                    {agent.activeChats}/{agent.maxChats}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Response Time</span>
                  <span className="font-medium">{agent.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Satisfaction</span>
                  <span className="font-medium">{agent.satisfaction}/5</span>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-1">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {agent.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(agent.activeChats / agent.maxChats) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Response Templates</h3>
                <button
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <span className="mr-2">➕</span>
                  Add Template
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {responseTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.title}</h4>
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-gray-900">
                          <span>✏️</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <span>🗑️</span>
                        </button>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mb-2 inline-block">
                      {template.category}
                    </span>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Used {template.usage} times</span>
                      <span>For: {template.personas.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Chat History & Analytics</h3>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">All Channels</option>
                    <option value="website">Website</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {conversations.map((conv) => (
                  <div key={conv.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {conv.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{conv.customer}</p>
                          <p className="text-sm text-gray-600">
                            {conv.channel} • {conv.persona}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            conv.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : conv.status === "escalated"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {conv.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {conv.lastMessageTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Agent: {conv.agent || "Unassigned"}</span>
                      <span>
                        Sentiment:{" "}
                        {conv.sentiment === "positive"
                          ? "😊"
                          : conv.sentiment === "negative"
                          ? "😞"
                          : "😐"}
                      </span>
                      <span>Tags: {conv.tags.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "escalation" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Escalation Flow Configuration</h3>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">
                    Automatic Escalation Rules
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">
                          Negative sentiment detected
                        </p>
                        <p className="text-sm text-gray-600">
                          Auto-escalate when customer sentiment becomes negative
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span className="text-sm">Enabled</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Response time exceeded</p>
                        <p className="text-sm text-gray-600">
                          Escalate if no response within 10 minutes
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span className="text-sm">Enabled</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Keyword triggers</p>
                        <p className="text-sm text-gray-600">
                          Escalate on keywords: complaint, refund, cancel
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Escalation Hierarchy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 border rounded">
                      <span className="font-medium">Level 1:</span>
                      <span>Senior Agent</span>
                      <span className="text-sm text-gray-600">
                        (Sarah Wilson, Emily Davis)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 border rounded">
                      <span className="font-medium">Level 2:</span>
                      <span>Team Lead</span>
                      <span className="text-sm text-gray-600">
                        (Manager escalation)
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 border rounded">
                      <span className="font-medium">Level 3:</span>
                      <span>Department Head</span>
                      <span className="text-sm text-gray-600">
                        (Executive team)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AssignAgentModal />
      <TemplateModal />
    </div>
  );
};

export default ChatwoodIntegration;
