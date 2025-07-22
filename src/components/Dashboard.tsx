import React from 'react';

const Dashboard = () => {

  return (
    <div className="p-8 text-center text-gray-500">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p>Welcome to the Gyaani Admin Panel - Your central hub for managing the chatbot system.</p>
      <div className="mt-8 text-sm">
        <p>Overview:</p>
        <ul className="mt-2 space-y-1">
          <li>• System performance and health monitoring</li>
          <li>• User activity and engagement metrics</li>
          <li>• Quick access to all management modules</li>
          <li>• Real-time notifications and alerts</li>
          <li>• Persona usage statistics and insights</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;