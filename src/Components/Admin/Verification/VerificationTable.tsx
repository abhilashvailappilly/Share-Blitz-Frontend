import React from 'react';
import VerificationInterface from '../../../Types/Admin/Verification';
import SinlgeRow from './SinlgeRow';


interface VerificationTableProps {
  verifications: VerificationInterface[];
  onApprove: (id: string) => void;
}

const VerificationTable: React.FC<VerificationTableProps> = ({ verifications, onApprove }) => {

   
  return (
    <div className="overflow-x-auto flex w-full h-screen justify-center items-center p-4">
      <table className="min-w-full bg-white border-gray-300 shadow-sm rounded-xl my-4">
        <thead className="bg-green-500 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 text-left  text-xs font-medium text-gray-600 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Verification Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Plan Active</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment Plan</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payment Status</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Start Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">End Date</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {verifications.map((verification) => (
           <SinlgeRow verification={verification}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationTable;
