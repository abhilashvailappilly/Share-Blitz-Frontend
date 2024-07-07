import React from 'react';
import VerificationInterface from '../../../Types/Admin/Verification';
import SinlgeRow from './SinlgeRow';

interface VerificationTableProps {
  verifications: VerificationInterface[];
  onApprove: (id: string) => void;
}

const VerificationTable: React.FC<VerificationTableProps> = ({ verifications }) => {
  return (
    <div className="overflow-x-auto flex w-full h-screen justify-center items-center p-4 bg-gray-100 dark:bg-gray-900">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-xl my-4">
        <thead className="bg-green-500 dark:bg-slate-600 rounded-lg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">User Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Verification Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Plan Active</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Payment Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {verifications.map((verification,index) => (
            <SinlgeRow key={index} verification={verification}  />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationTable;
