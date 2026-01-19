import React from "react";

const ProfilePopup = ({ user }) => {
  if (!user) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">User Information</h3>
        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Name:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200">{user.name}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Date of Birth:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200">{user.dob}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Contact:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200">{user.contact}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Blood Group:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200">{user.bloodGroup}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Disability Type:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200">{user.disabilityType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup; 