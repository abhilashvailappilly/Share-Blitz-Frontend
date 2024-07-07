import  { useEffect, useState } from 'react';
import VerificationInterface, { SinlgeRowInterface } from '../../../Types/Admin/Verification';
import { toast } from 'react-toastify';
import { ApproveVerificationRequest, getUserById } from '../../../Api/admin/adminApiMethod';
import ProfileDataInterface from '../../../Types/User/userProfile';
import LoaderCircle from '@/Components/Common/Loader/LoaderCircle';

const SinlgeRow = ({ verification }: SinlgeRowInterface) => {
  const [verifactionData, setVerificationData] = useState<VerificationInterface>(verification);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<ProfileDataInterface | undefined>(undefined);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await getUserById(verifactionData?.userId);
      if (response.success) {
        setUserData(response.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approve = async (id: string) => {
    try {
      const response = await ApproveVerificationRequest(id);
      if (response?.success) {
        setVerificationData(response?.verifacationData);
        return;
      }
      toast.error(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if(isLoading) {
    <div className='h-screen w-full'>
      <LoaderCircle/>
    </div>
  }
  return (
    <tr key={verification._id} className="bg-white dark:bg-gray-800 transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{userData?.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{verifactionData.verificationStatus}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{verifactionData.planActive ? 'Yes' : 'No'}</td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${verifactionData.payment.paymentStatus ? 'text-green-600 font-bold' : 'text-gray-900 dark:text-gray-200'}`}>{verifactionData.payment.paymentStatus ? 'Completed' : 'Not done'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
        <img src={verifactionData.imageUrl} alt="Verification" className="h-10 w-10 rounded-full object-cover" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {verifactionData.verificationStatus === "Pending" ? (
          <button
            onClick={() => approve(verifactionData._id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Approve
          </button>
        ) : (
          <span className='font-bold text-green-500'>Approved</span>
        )}
      </td>
    </tr>
  );
};

export default SinlgeRow;
