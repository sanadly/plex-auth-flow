import React from 'react';
import { Link } from 'react-router-dom';

const BusinessDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Manage Loyalty Cards</h2>
          <p className="text-gray-600 mb-4">Create, view, and edit loyalty cards for your business.</p>
          <Link to="/card-designer" className="inline-block bg-custom-primary text-white py-2 px-4 rounded hover:bg-custom-secondary transition duration-200">
            Go to Card Designer
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">View Transactions</h2>
          <p className="text-gray-600 mb-4">Monitor and analyze customer transactions and reward usage.</p>
          <Link to="/transactions" className="inline-block bg-custom-primary text-white py-2 px-4 rounded hover:bg-custom-secondary transition duration-200">
            View Transactions
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Manage Customers</h2>
          <p className="text-gray-600 mb-4">View, add, and manage customer profiles and their loyalty points.</p>
          <Link to="/customers" className="inline-block bg-custom-primary text-white py-2 px-4 rounded hover:bg-custom-secondary transition duration-200">
            Manage Customers
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Analytics and Reports</h2>
          <p className="text-gray-600 mb-4">Generate reports on loyalty program performance and customer engagement.</p>
          <Link to="/reports" className="inline-block bg-custom-primary text-white py-2 px-4 rounded hover:bg-custom-secondary transition duration-200">
            View Reports
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Settings</h2>
        <p className="text-gray-600 mb-4">Configure your business profile, loyalty program settings, and notifications.</p>
        <Link to="/settings" className="inline-block bg-custom-primary text-white py-2 px-4 rounded hover:bg-custom-secondary transition duration-200">
          Go to Settings
        </Link>
      </div>
    </div>
  );
};

export default BusinessDashboard;
