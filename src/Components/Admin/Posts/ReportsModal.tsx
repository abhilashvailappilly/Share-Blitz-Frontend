import { ReportsInterface } from '@/Types/Admin/Reports';
import React from 'react';
import ListOfReports from './ListOfReports';

interface ReportModalProps {
    isOpen: boolean;
    closeModal: () => void;
    reportData: ReportsInterface[];
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, closeModal, reportData }) => {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Reports</h2>
                <ul>{
                    reportData .length <=0 ? (<li><div>No reports</div></li>):
                  (  reportData.map((report, index) => (
                       <ListOfReports index={index} report={report} />
                    )))
                }
                </ul>
                <button
                    onClick={closeModal}
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ReportModal;
