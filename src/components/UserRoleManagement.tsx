import React, { useEffect, useMemo, useState } from "react";

import {
  type GroupWiseIntentsData,
  type GroupWiseUsersData,
} from "../services/Analytics/Analytics.d";

import { type Group, type GroupFile } from "../services/Group/Group.d";
import { type FileItem } from "../services/Drive/Drive.d";

import {
  useLazyGetGroupWiseIntentAnalyticsQuery,
  useLazyGetGroupWiseUsersQuery,
} from "../services/Analytics/Analytics";
import {
  useLazyGetFilesByFolderIdQuery,
  useUploadFileMutation,
  useLazyGetFolderInfoQuery,
} from "../services/Drive/Drive";
import { useLazyGetGroupsQuery } from "../services/Group/Group";
import UploadFileModal from "./UploadFile";

const UserRoleManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personas");
  const [selectedKnowledgePersonas, setSelectedKnowledgePersonas] = useState<
    string[]
  >([]);
  const [selectedKnowledgeTypes, setSelectedKnowledgeTypes] = useState<
    string[]
  >([]);
  const [selectedKnowledgeStatus, setSelectedKnowledgeStatus] = useState<
    string[]
  >([]);

  const [getGroupWiseUsersService, groupWiseUsersResponse] =
    useLazyGetGroupWiseUsersQuery();

  const [getGroupsService, getGroupsResponse] = useLazyGetGroupsQuery();
  const [getFilesService] = useLazyGetFilesByFolderIdQuery();
  const [getFolderInfoService] = useLazyGetFolderInfoQuery();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uploadFile] = useUploadFileMutation();
  const [getGroupWiseIntentService, groupWiseIntentsResponse] =
    useLazyGetGroupWiseIntentAnalyticsQuery();

  const [groupWiseUsers, setGroupWiseUsers] = useState<
    GroupWiseUsersData | undefined
  >(undefined);

  const [groupWiseIntents, setGroupWiseIntents] =
    useState<GroupWiseIntentsData | null>(null);

  const [groups, setGroups] = useState<Group[]>([]);
  const [files, setFiles] = useState<GroupFile[]>([]);

  useEffect(() => {
    getGroupWiseUsersService({ active: "true" });
    getGroupsService({});
    getGroupWiseIntentService({});
  }, []);

  useEffect(() => {
    if (
      groupWiseUsersResponse?.data &&
      groupWiseUsersResponse?.data?.response_code === 0 &&
      groupWiseUsersResponse?.data?.response?.data
    ) {
      const data = groupWiseUsersResponse?.data?.response?.data;
      setGroupWiseUsers(data);
    }

    if (
      groupWiseIntentsResponse?.data &&
      groupWiseIntentsResponse?.data?.response_code === 0 &&
      groupWiseIntentsResponse?.data?.response?.data
    ) {
      const data = groupWiseIntentsResponse?.data?.response?.data;
      setGroupWiseIntents(data);
    }

    const fetchGroupFiles = async () => {
      if (
        getGroupsResponse?.data?.response_code !== 0 ||
        !getGroupsResponse?.data?.response?.data
      )
        return;

      const data = getGroupsResponse.data.response.data;
      setGroups(data);

      const fileMap: Map<string, GroupFile> = new Map();

      await Promise.all(
        data.map(async (group: Group) => {
          const allFilesForGroup: FileItem[] = [];

          await Promise.all(
            group.google_drive_folder_ids.map(async (folderId: string) => {
              const folderFiles = await getFilesService({ folderId });

              if (folderFiles.data?.response_code === 0) {
                const files = folderFiles.data.response.data as FileItem[];
                files.forEach((file: FileItem) => {
                  if (!allFilesForGroup.find((f) => f.id === file.id)) {
                    allFilesForGroup.push(file);
                  }
                });
              }
            })
          );

          fileMap.set(group.group_name, {
            groupId: group.group_id,
            groupName: group.group_name,
            files: allFilesForGroup,
          });
        })
      );

      setFiles(Array.from(fileMap.values()));
    };

    fetchGroupFiles();
  }, [getGroupsResponse, getFilesService]);

  console.log("groups----->", groups);
  console.log("files ---->", files);
  console.log("intents -->", groupWiseIntents);

  const getPersonaColor = (id: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-red-500",
      "bg-yellow-500",
    ];
    return colors[id % colors.length];
  };

  const personas = groups.map((group: Group) => {
    const correspondingIntents = groupWiseIntents?.group_wise.find(
      (intentGroup) => intentGroup.group_id === group.group_id
    );
    const groupFiles = files.find(
      (fileGroup) => fileGroup.groupId === group.group_id
    );

    const groupUsers = groupWiseUsers?.group_wise.find(
      (g) => g.group_id === group.group_id
    );

    return {
      id: group.group_id,
      name: group.group_name,
      description: `Persona for ${group.group_name} users.`, // Placeholder description
      activeUsers: groupUsers?.users_count, // Placeholder for active users
      intents: correspondingIntents ? correspondingIntents.total_intents : 0,
      knowledge: groupFiles ? groupFiles.files.length : 0,
      status: group.active_status === "Y" ? "active" : "inactive",
      color: getPersonaColor(group.group_id),
    };
  });

  const knowledgeItems = files.flatMap((fileGroup: GroupFile) => {
    const group = groups.find((g) => g.group_id === fileGroup.groupId);
    const status = group?.active_status === "Y" ? "active" : "inactive";
    return fileGroup.files.map((file: FileItem) => ({
      id: file.id,
      title: file.name,
      type: file.name.includes("pdf")
        ? "pdf"
        : file.name.includes("docx")
        ? "docx"
        : file.name.includes("xlsx")
        ? "xlsx"
        : "others", // Map mime types to a more user-friendly type
      persona: fileGroup.groupName,
      status: status,
    }));
  });

  const normalizeType = (type: string) => {
    if (type.includes("pdf")) return "pdf";
    if (type.includes("doc")) return "docx";
    if (type.includes("xls")) return "xlsx";
    return "others";
  };

  const filteredKnowledgeItems = useMemo(() => {
    return knowledgeItems.filter((item) => {
      const matchesPersona =
        selectedKnowledgePersonas.length === 0 ||
        selectedKnowledgePersonas.includes(item.persona);
      const matchesType =
        selectedKnowledgeTypes.length === 0 ||
        selectedKnowledgeTypes.includes(normalizeType(item.type));
      const matchesStatus =
        selectedKnowledgeStatus.length === 0 ||
        selectedKnowledgeStatus.includes(item.status);
      return matchesPersona && matchesType && matchesStatus;
    });
  }, [
    knowledgeItems,
    selectedKnowledgePersonas,
    selectedKnowledgeTypes,
    selectedKnowledgeStatus,
  ]);

  console.log("Knowledge Items:", knowledgeItems);
  console.log("Filtered Items:", filteredKnowledgeItems);

  const handlePersonaFilterChange = (personaName: string) => {
    setSelectedKnowledgePersonas((prev) =>
      prev.includes(personaName)
        ? prev.filter((name) => name !== personaName)
        : [...prev, personaName]
    );
  };

  const handleTypeFilterChange = (type: string) => {
    setSelectedKnowledgeTypes((prev) => {
      return prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
    });
  };

  const handleStatusFilterChange = (status: string) => {
    setSelectedKnowledgeStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Persona Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter persona name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Theme
                  </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe this persona and their role"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permissions Level
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select permissions</option>
                    <option value="basic">Basic Access</option>
                    <option value="advanced">Advanced Access</option>
                    <option value="admin">Admin Access</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Language
                  </label>
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
                <input
                  type="checkbox"
                  id="active"
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-gray-700"
                >
                  Active Status
                </label>
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
          <h1 className="text-2xl font-bold text-gray-900">
            User Role Management
          </h1>
          <p className="text-gray-600">
            Manage personas and role-based knowledge configurations
          </p>
        </div>
        {/* <div className="flex space-x-2">
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
        </div> */}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "personas", label: "Personas" },
            { id: "knowledge", label: "Knowledge Base" },
            // { id: "intents", label: "Intents & Responses" },
            // { id: "testing", label: "Role Testing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "personas" && (
        <div className="space-y-4">
          {/* Personas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personas.map((persona) => {
              console.log('persona-->',persona)
              return (
                <div
                  key={persona.id}
                  className="bg-white rounded-lg shadow border cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-4 h-4 rounded-full ${persona.color}`}
                      />
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          persona.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {persona.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {persona.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {persona.description}
                    </p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Active Users</span>
                        <span className="font-medium">
                          {persona.activeUsers ?? 0}
                        </span>
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
                    {/* <div className="flex space-x-2">
                    <button className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      <span className="mr-1">✏️</span>
                      Edit
                    </button>
                    <button className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      <span className="mr-1">⚙️</span>
                      Config
                    </button>
                  </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "knowledge" && (
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
                  <label className="text-xs font-medium text-gray-700 block mb-2">
                    By Persona
                  </label>
                  <div className="space-y-2">
                    {personas.map((persona) => (
                      <div
                        key={persona.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedKnowledgePersonas.includes(
                            persona.name
                          )}
                          onChange={() =>
                            handlePersonaFilterChange(persona.name)
                          }
                        />
                        <div
                          className={`w-3 h-3 rounded-full ${persona.color}`}
                        />
                        <span className="text-sm">{persona.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-2">
                    By Type
                  </label>
                  <div className="space-y-2">
                    {["docx", "pdf", "xlsx", "others"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedKnowledgeTypes.includes(type)}
                          onChange={() => handleTypeFilterChange(type)}
                        />
                        <span className="text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-2">
                    By Status
                  </label>
                  <div className="space-y-2">
                    {["active", "inactive"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedKnowledgeStatus.includes(status)}
                          onChange={() => handleStatusFilterChange(status)}
                        />
                        <span className="text-sm capitalize">{status}</span>
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
                    Knowledge Base Items ({filteredKnowledgeItems.length})
                  </h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        🔍
                      </span> */}
                      {/* <input
                        placeholder="Search knowledge..."
                        className="pl-10 w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      /> */}
                    </div>
                    {/* <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Bulk Actions</option>
                      <option value="activate">Activate</option>
                      <option value="deactivate">Deactivate</option>
                      <option value="delete">Delete</option>
                      <option value="export">Export</option>
                    </select>
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <span className="mr-2">➕</span>
                      Upload
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="p-4 h-[500px] overflow-y-auto">
                <div className="space-y-4">
                  {filteredKnowledgeItems.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {/* <input
                            type="checkbox"
                            className="mt-1 rounded border-gray-300"
                          /> */}
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
                              {item.type === "FAQ"
                                ? "Frequently asked questions and answers for "
                                : item.type === "Document"
                                ? "Reference document containing "
                                : "Intent configuration for "}
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
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
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

      {activeTab === "intents" && (
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
                  <div
                    key={persona.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${persona.color}`}
                      />
                      <span className="text-sm font-medium">
                        {persona.name}
                      </span>
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
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          RM Users
                        </span>
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
                      <p>
                        <strong>Sample Phrases:</strong> "Check account
                        balance", "What's my balance", "Account status"
                      </p>
                      <p>
                        <strong>Response:</strong> "I can help you check the
                        account balance. Please provide the account number..."
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Sales
                        </span>
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
                      <p>
                        <strong>Sample Phrases:</strong> "Product details",
                        "Tell me about", "Features and pricing"
                      </p>
                      <p>
                        <strong>Response:</strong> "Here are the product details
                        including features, pricing, and availability..."
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          Travel Agents
                        </span>
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
                      <p>
                        <strong>Sample Phrases:</strong> "Book a flight", "Hotel
                        reservation", "Travel package"
                      </p>
                      <p>
                        <strong>Response:</strong> "I can help you with travel
                        bookings. What destination and dates are you looking
                        for?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CreatePersonaModal />
      {/* { isUploadModalOpen && <UploadFileModal groups={personas}/>} */}
    </div>
  );
};

export default UserRoleManagement;
