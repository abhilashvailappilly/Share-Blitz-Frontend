import { initFlowbite } from 'flowbite';
import { toast } from 'react-toastify';
import React, { useEffect, useRef,Dispatch,SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Confirmation from '../modal/Confirmation';
// import ReportModal from '../modal/ReportModal';
import { RootState } from '../../Store/store';

// interface Post {
//     _id: string;
//   userId: string;
//   image: string;
//   description: string;
//   // Add more properties as needed
// }

interface Post {
    _id:string
    userId:string
    caption:string
    imageUrl:string
    tag:string[] 
}

interface User {
  _id: string;
  username: string;
  // Add more properties as needed
}

interface DropdownProps {
  post: Post;
  postUser: User | null;
  openEditor: React.RefObject<HTMLDivElement>;
  setSelectedPost: Dispatch<SetStateAction<Post | undefined>>;
}

const Dropdown: React.FC<DropdownProps> = ({ post, postUser, openEditor, setSelectedPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [owner, setOwner] = useState(false);
//   const currentUser = useSelector<any>((state) => state?.user?.userData);
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  

  const [error, setError] = useState<string>('');
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setError('');
    }
  }, [error]);

  useEffect(() => {
    if (currentUser?._id === postUser?._id) {
      setOwner(false); // change to true
    }
  }, [currentUser, postUser]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    initFlowbite();

    document.addEventListener('mousedown', closeDropdown);

    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  // Delete post section
  const [deleteModal, setDeleteModal] = useState(false);

  // Report post section
  const [reportModal, setReportModal] = useState(false);

  return (
    <>
      {/* {deleteModal && <Confirmation post={post} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />}
      {reportModal && <ReportModal post={post} setError={setError} setReportModal={setReportModal} />} */}
      <div className="self-center" ref={dropdownRef}>
        <div onClick={toggleDropdown} className="" role="button">
          <svg
            width={33}
            height={34}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.24000000000000005"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
                fill="black"
              ></path>
            </g>
          </svg>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-28 mr-2 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700">
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => navigate(`/profile/${postUser?.username}`)}
                >
                  View profile
                </button>
              </li>
              {owner ? (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        openEditor.current?.click();
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit post
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => { toast.success('Post deleted'),setDeleteModal(true)}}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete post
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => {toast.success('Post repoted'),setReportModal(true)}}
                      className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </button>
                  </li>

                  <li>
                    <button 
                     onClick={() => {toast.success('Post Blocked'),setReportModal(true)}}
                    className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Block
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
