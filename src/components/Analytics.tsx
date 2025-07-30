import React, { useEffect, useState } from "react";
import {
  useLazyGetGroupWiseUsersQuery,
  useLazyGetGroupWiseQueriesQuery,
  useLazyGetGroupWiseIntentAnalyticsQuery,
  useLazyGetGroupWiseUnresolvedQueriesQuery,
} from "../services/Analytics/Analytics";

import {
  type GroupIntent,
  type GroupedUnresolvedQueries,
  type GroupUnresolved,
  type GroupWiseIntentsData,
  type GroupWiseQueriesData,
  type GroupWiseUnresolvedQueriesData,
  type GroupWiseUsersData,
  type Intent,
  type UnresolvedQuery,
} from "../services/Analytics/Analytics.d";

const Analytics: React.FC = () => {
  const [getGroupWiseUsersService, groupWiseUsersResponse] =
    useLazyGetGroupWiseUsersQuery();

  const [getGroupWiseQueriesService, groupWiseQueriesResponse] =
    useLazyGetGroupWiseQueriesQuery();

  const [getGroupWiseIntentService, groupWiseIntentsResponse] =
    useLazyGetGroupWiseIntentAnalyticsQuery();

  const [getGroupWiseUnresolvedQueriesService, groupWiseUnresolvedResponse] =
    useLazyGetGroupWiseUnresolvedQueriesQuery();

  const [groupWiseUsers, setGroupWiseUsers] = useState<
    GroupWiseUsersData | undefined
  >(undefined);
  const [groupWiseQueries, setGroupWiseQueries] = useState<
    GroupWiseQueriesData | undefined
  >(undefined);
  const [groupWiseIntents, setGroupWiseIntents] = useState<
    GroupWiseIntentsData | undefined
  >(undefined);
  const [groupWiseUnresolvedQueries, setGroupWiseUnresolvedQueries] = useState<
    GroupWiseUnresolvedQueriesData | undefined
  >(undefined);

  const [groupedUnresolvedQueries, setGroupedUnresolvedQueries] = useState<
    GroupedUnresolvedQueries | undefined
  >(undefined);

  const processAndSortIntents = (groupWiseIntents: GroupWiseIntentsData) => {
    const uniqueIntentsMap: {
      [key: string]: { resolved: number; unresolved: number; total: number };
    } = {};

    groupWiseIntents.group_wise.forEach((group: GroupIntent) => {
      group.intents.forEach((intent: Intent) => {
        if (!uniqueIntentsMap[intent.intent]) {
          uniqueIntentsMap[intent.intent] = {
            resolved: 0,
            unresolved: 0,
            total: 0,
          };
        }
        uniqueIntentsMap[intent.intent].resolved += intent.resolved;
        uniqueIntentsMap[intent.intent].unresolved += intent.unresolved;
        uniqueIntentsMap[intent.intent].total +=
          intent.resolved + intent.unresolved;
      });
    });

    const processedIntents = Object.keys(uniqueIntentsMap).map((intentName) => {
      const { resolved, unresolved, total } = uniqueIntentsMap[intentName];
      const percentage =
        groupWiseIntents.total_intents > 0
          ? (total / groupWiseIntents.total_intents) * 100
          : 0;
      return {
        intent: intentName,
        percentage: parseFloat(percentage.toFixed(2)),
        resolved,
        unresolved,
      };
    });

    return processedIntents.sort((a, b) => b.percentage - a.percentage);
  };

  useEffect(() => {
    getGroupWiseUsersService({ active: "true" });
    getGroupWiseQueriesService({});
    getGroupWiseIntentService({});
    getGroupWiseUnresolvedQueriesService({});
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
      groupWiseQueriesResponse?.data &&
      groupWiseQueriesResponse?.data?.response_code === 0 &&
      groupWiseQueriesResponse?.data?.response?.data
    ) {
      const data = groupWiseQueriesResponse?.data?.response?.data;
      setGroupWiseQueries(data);
    }

    if (
      groupWiseIntentsResponse?.data &&
      groupWiseIntentsResponse?.data?.response_code === 0 &&
      groupWiseIntentsResponse?.data?.response?.data
    ) {
      const data = groupWiseIntentsResponse?.data?.response?.data;
      setGroupWiseIntents(data);
    }

    if (
      groupWiseUnresolvedResponse?.data &&
      groupWiseUnresolvedResponse?.data?.response_code === 0 &&
      groupWiseUnresolvedResponse?.data?.response?.data
    ) {
      const data = groupWiseUnresolvedResponse?.data?.response?.data;
      setGroupWiseUnresolvedQueries(data);

      // Group unresolved queries by intent
      const grouped: GroupedUnresolvedQueries = {};
      data.group_wise.forEach((group: GroupUnresolved) => {
        group.unresolved_queries.forEach((query: UnresolvedQuery) => {
          if (!grouped[query.intent]) {
            grouped[query.intent] = [];
          }
          grouped[query.intent].push(query);
        });
      });
      setGroupedUnresolvedQueries(grouped);
    }
  }, [
    groupWiseUsersResponse,
    groupWiseQueriesResponse,
    groupWiseIntentsResponse,
    groupWiseUnresolvedResponse,
  ]);

  console.log("groupWiseUsers-->", groupWiseUsers);
  console.log("groupWiseQueries-->", groupWiseQueries);
  console.log("groupWiseUnresolvedQueries->", groupWiseUnresolvedQueries);
  console.log("groupedUnresolvedQueries->", groupedUnresolvedQueries);
  console.log("groupWiseIntents->", groupWiseIntents);

  const sortedIntents = groupWiseIntents
    ? processAndSortIntents(groupWiseIntents)
    : [];

  console.log(sortedIntents);

  const calculateHeatMapPercentageDiff = (intents) => {
    const uniquePercentages = new Set(
      intents.map((intent) => intent.percentage)
    );
    console.log(Math.round(uniquePercentages.size / 3));
    return Math.round(uniquePercentages.size / 3);
  };

  const heatMapPercentageDiff = calculateHeatMapPercentageDiff(sortedIntents);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Comprehensive insights into chatbot performance and user engagement
          </p>
        </div>
        {/* <div className="flex space-x-2">
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
        </div> */}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">
                {groupWiseUsers?.total_users?.toLocaleString()}
                {/* {overviewStats.totalUsers.toLocaleString()} */}
              </p>
              {/* <p className="text-sm text-green-600">+{overviewStats.userGrowth}%</p> */}
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
              <p className="text-2xl font-bold text-gray-900">
                {groupWiseUsers?.group_wise?.length}
              </p>
              {/* <p className="text-sm text-green-600">+{overviewStats.activeGrowth}%</p> */}
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
              <p className="text-2xl font-bold text-gray-900">
                {groupWiseQueries?.total_queries?.toLocaleString()}
              </p>{" "}
              {/* <p className="text-sm text-green-600">+{overviewStats.queryGrowth}%</p> */}
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Response Accuracy</h3>
              <p className="text-2xl font-bold text-gray-900">
                {groupWiseQueries?.total_queries &&
                groupWiseQueries?.total_queries > 0
                  ? (
                      (groupWiseQueries.resolved /
                        groupWiseQueries.total_queries) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </p>
              {/* <p className="text-sm text-green-600">+2.1%</p> */}
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
        {/* New cards */}
        {/* <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Total Resolved Queries</h3>
              <p className="text-2xl font-bold text-gray-900">
                {groupWiseQueries?.resolved?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">
                Total Unresolved Queries
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {groupWiseQueries?.unresolved?.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h3 className="font-medium">Group-wise Performance</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {groupWiseQueries?.group_wise?.map((group, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{group.group_name}</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        Total Queries: {group.queries}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">
                        {((group.resolved / group.queries) * 100).toFixed(2)}%
                        {/* {group.percentage}% */}
                      </span>
                      <p className="text-sm text-gray-600">
                        Resolved: {group.resolved}
                      </p>
                      <p className="text-sm text-gray-600">
                        Unresolved: {group.unresolved}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${(group.resolved / group.queries) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h3 className="font-medium">Popular Query Heatmap</h3>
          </div>
          <div className="p-4 max-h-64 overflow-y-auto">
            <div className="grid grid-cols-3 gap-2">
              {sortedIntents?.map((intent, index) => (
                <div
                  key={index}
                  className={`p-3 rounded text-xs text-center ${
                    intent.percentage >=
                    sortedIntents[heatMapPercentageDiff - 1].percentage
                      ? "bg-red-500 text-white"
                      : intent.percentage >=
                        sortedIntents[heatMapPercentageDiff * 2 - 1].percentage
                      ? "bg-orange-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  <div className="font-medium">{intent.intent}</div>
                  <div className="text-xs opacity-75">{intent.percentage}%</div>
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
        <div className="grid grid-cols-1 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="font-medium">Persona Breakdown</h3>
            </div>
            <div className="p-4 space-y-3 max-h-100 overflow-y-auto">
              {groupWiseUsers?.group_wise?.map((group, index) => {
                const intents = groupWiseIntents?.group_wise.find(
                  (intentGroup) => intentGroup.group_name == group.group_name
                )?.intents.length;
                return (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {group.group_name}
                      </span>
                      {/* <span className="text-sm text-gray-600">
                      {group.percentage.toFixed(1)}%
                    </span> */}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Users</span>
                        <span>{group.users.length}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Intents</span>
                        <span>{intents}</span>
                      </div>
                      {/*<div className="flex justify-between text-xs">
                      <span>Unresolved</span>
                      <span>{group.unresolved.toLocaleString()}</span>
                    </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h3 className="font-medium">Unanswered Questions</h3>
          </div>
          <div className="p-4 space-y-3 max-h-100 overflow-y-auto">
            {groupedUnresolvedQueries &&
              Object.entries(groupedUnresolvedQueries).map(
                ([intent, queries], index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm text-gray-800">
                        <span className="text-gray-500 font-medium">
                          Intent:
                        </span>{" "}
                        {intent}
                      </p>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {queries.reduce(
                          (acc, curr) => acc + curr.times_asked,
                          0
                        )}{" "}
                        times asked
                      </span>
                    </div>
                    <div className="flex overflow-x-auto space-x-3 pb-2">
                      {queries.map((query, queryIndex) => (
                        <div
                          key={queryIndex}
                          className="flex-shrink-0 w-64 border rounded-lg p-3 bg-gray-50"
                        >
                          <div className="text-xs text-gray-600 mb-2">
                            Last asked:{" "}
                            {new Date(query.last_occurrence).toLocaleString()}
                          </div>
                          <div className="flex flex-col gap-1">
                            {query.user_details.map((user, userIndex) => (
                              <div
                                key={userIndex}
                                className="flex flex-col p-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                              >
                                <span className="text-xs font-medium">
                                  {user.first_name} {user.last_name} (
                                  {user.query_count})
                                </span>
                                <span className="text-xs text-blue-600">
                                  {user.email_id}
                                </span>
                                <div className="mt-1 space-y-0.5">
                                  {user.queries.map((q, qIndex) => (
                                    <span
                                      key={qIndex}
                                      className="block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full"
                                    >
                                      {q}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
