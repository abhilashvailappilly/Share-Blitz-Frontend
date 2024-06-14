import React from 'react';
// import { toggleUserBlock } from '../../../services/Admin/apiMethods';
import { toast } from 'react-toastify';
import { ChangeActionStatus, DeletePostById, toogleUserStatus } from '../../../Api/admin/adminApiMethod';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    updatedUsers: (userId: string, newStatus: boolean) => void;
    isActionTaken:Boolean
    reportId: string;
    postId: string;
}

const DeletePostModal: React.FC<Props> = ({ isOpen, closeModal, updatedUsers,isActionTaken,postId, reportId }) => {

    const handleBlockToggle = async(userId: string ,reportId : string) => {

        updatedUsers(userId,!isActionTaken);
        const deletePost = await DeletePostById(postId)
        const changeActionStaus = await ChangeActionStatus(reportId)
        if(changeActionStaus.success) {
            toast.success(`Post Deleted Successfully `)
            // toast.success(`Post ${deletePost.updatedStatus ? 'Deleted ' : ''} Successfully `)
        } else {
            toast.error('Failed to delete post')
        }
       
        closeModal();
    };

    return (


        
            <div
              id="popup-modal"
              className={`${
                isOpen ? 'block' : 'hidden'
              } flex align-center fixed inset-0 z-10  overflow-y-auto overflow-x-hidden arial-mo top-0 right-0 left-0  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full `}
            >
                 {/* Blurred background */}
              <div className={`${isOpen ? 'fixed inset-0 bg-gray-900 opacity-60 blur-lg' : ''}`}></div>

              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" >
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to Delete the post ?
                    </h3>
                    <button
                    onClick={() => handleBlockToggle(postId,reportId)}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Confirm
                    </button>
                    <button
                     onClick={closeModal} 
                      data-modal-hide="popup-modal"
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                   Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );


};

export default DeletePostModal;
