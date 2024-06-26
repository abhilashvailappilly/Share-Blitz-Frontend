import axios from 'axios';
import { useGoogleLogin, UseGoogleLoginOptionsImplicitFlow } from '@react-oauth/google';
import { toast } from 'react-toastify';

import { Glogin, Gsignup } from '../../../Api/user/authApiMethod';
import { setCredentials } from '../../../Store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getConnections } from '../../../Api/user/userApiMethod';
import { setFollowerss, setFollowings } from '../../../Store/user/connectionSlice';

const GoogleAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handle: UseGoogleLoginOptionsImplicitFlow['onSuccess'] = async (response: any) => {
    if (response.access_token) {
      try {
        const responseData = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: 'application/json',
          },
        });

        if (responseData?.data) {
          const userData = responseData?.data;
          const login = await Glogin(userData?.email as string);

          if (login?.data?.success) {
            // User exists, handle login
            dispatch(setCredentials(login?.data?.user));
            localStorage.setItem('userInfo', JSON.stringify(login?.data?.user));
            localStorage.setItem('userAuthToken', JSON.stringify(login?.data?.token));
            const connections = await getConnections(login?.data?.user._id);
            dispatch(setFollowerss(connections.connections?.followings));
            dispatch(setFollowings(connections.connections?.followings));
            sessionStorage.setItem('followings', connections.connections?.followings);
            sessionStorage.setItem('followers', connections.connections?.followers);
            navigate('/home');
            toast.success('Logged in successfully!');
          } else {
            // User not found, handle sign up
            const saveUserData = await Gsignup(userData?.name as string, userData?.name.split(' ')[0] + Date.now().toString().slice(9), userData?.email as string, userData.picture as string);

            if (saveUserData?.data?.success) {
              dispatch(setCredentials(saveUserData?.data?.user));
              navigate('/login');
              toast.success('Registered successfully!');
            } else {
              toast.error(saveUserData?.data?.message);
            }
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred during authentication.');
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: handle,
    onError: (error) => console.log('Login Failed:', error),
  });

  const handleGoogleAuth = () => {
    login();
  };

  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={handleGoogleAuth}
        className="flex items-center justify-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
      >
        <svg
          className="w-6 h-6 mr-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-1c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM6.25 8.75c0-.69.56-1.25 1.25-1.25H12v2H7.5c-.69 0-1.25-.56-1.25-1.25zm-1.25 1.935c0-.69.56-1.25 1.25-1.25h1.985v2H6.25a1.25 1.25 0 0 1-1.25-1.25zm0 3.184c0-.689.56-1.25 1.25-1.25h1.985v2H6.25a1.25 1.25 0 0 1-1.25-1.25zm0 3.184c0-.69.56-1.25 1.25-1.25h1.985v2H6.25a1.25 1.25 0 0 1-1.25-1.25zm12.965-6.319a6.43 6.43 0 0 1-.393 2.065h.001l-1.807-.583a4.36 4.36 0 0 0-.009-1.352l1.806-.684.402-.093a2.86 2.86 0 0 1 .9-1.298l1.299-.901.781 1.35-1.299.9a1.85 1.85 0 0 0-.61.797l-.36.784zm-3.606-2.793l-1.351-.781 1.4-2.421 1.35.781-1.399 2.421zm-1.612-3.232l.781-1.35 2.42 1.4-.781 1.35-2.42-1.4zm-3.231-1.612l1.35.781-1.4 2.42-1.35-.781 1.4-2.42zM5.475 5.06l1.35.781-1.399 2.421-1.35-.781 1.4-2.421zm2.684 11.366l-.783-.36a6.43 6.43 0 0 1-2.066-.393l.583-1.807a4.36 4.36 0 0 0 1.352-.009l.684 1.806.094.403a2.86 2.86 0 0 1 1.298.899l.902 1.299-1.35.781-.901-1.299a1.85 1.85 0 0 0-.798-.61zm7.532 2.896l-.781-1.35 2.42-1.399.781 1.35-2.42 1.399zm3.231 1.612l-.781 1.35-2.42-1.4.781-1.35 2.42 1.4zm1.612 3.231l-1.35-.781 1.4-2.42 1.35.781-1.4 2.42zM18.94 18.524l-1.35-.781 1.399-2.421 1.35.781-1.399 2.421z"
          />
        </svg>
        Login/Sign Up using Google
      </button>
    </div>
  );
};

export default GoogleAuth;
