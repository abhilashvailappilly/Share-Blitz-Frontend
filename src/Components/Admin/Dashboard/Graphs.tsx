import { Button, ButtonGroup, Paper } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useState, useEffect } from 'react';

import { PostI } from '@/Types/User/Post';
import { FetchDashBoardCardsData } from '@/Api/admin/adminApiMethod';
import ProfileDataInterface from '@/Types/User/userProfile';
import { useChatStore } from '@/ZustandStore/chatStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const processWeeklyData = (posts: PostI[]) => {
  const dailyCounts = Array(7).fill(0);
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  posts.forEach((post: { creationTime: string | number | Date; }) => {
    const postDate = new Date(post.creationTime);
    if (postDate >= weekAgo) {
      const day = postDate.getDay();
      dailyCounts[day]++;
    }
  });

  return dailyCounts;
};

const processMonthlyData = (posts: PostI[]) => {
  const monthlyCount = Array(12).fill(0);
  const now = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(now.getFullYear() - 1);

  posts.forEach((post: { creationTime: string | number | Date; }) => {
    const postDate = new Date(post.creationTime);
    if (postDate >= yearAgo) {
      const month = postDate.getMonth();
      monthlyCount[month]++;
    }
  });

  return monthlyCount;
};

const processYearlyData = (posts: PostI[]) => {
  const yearlyCount: { [key: number]: number } = {};
  posts.forEach((post: { creationTime: string | number | Date; }) => {
    const postDate = new Date(post.creationTime);
    const year = postDate.getFullYear();
    if (yearlyCount[year]) {
      yearlyCount[year]++;
    } else {
      yearlyCount[year] = 1;
    }
  });

  return yearlyCount;
};

const processUserCounts = (userData: ProfileDataInterface[]) => {
  const userCounts: { [key: number]: number } = {};
  userData.forEach((user: ProfileDataInterface) => {
    const userDate = new Date(user.creationTime); 
    const year = userDate.getFullYear();
    if (userCounts[year]) {
      userCounts[year]++;
    } else {
      userCounts[year] = 1;
    }
  });

  return userCounts;
};

const processWeeklyUserData = (users: ProfileDataInterface[]) => {
  const dailyCounts = Array(7).fill(0);
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);

  users.forEach((user: { creationTime: string | number | Date; }) => {
    const userDate = new Date(user.creationTime);
    if (userDate >= weekAgo) {
      const day = userDate.getDay();
      dailyCounts[day]++;
    }
  });

  return dailyCounts;
};

const processMonthlyUserData = (users: ProfileDataInterface[]) => {
  const monthlyCount = Array(12).fill(0);
  const now = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(now.getFullYear() - 1);

  users.forEach((user: { creationTime: string | number | Date; }) => {
    const userDate = new Date(user.creationTime);
    if (userDate >= yearAgo) {
      const month = userDate.getMonth();
      monthlyCount[month]++;
    }
  });

  return monthlyCount;
};



const Graphs = () => {
  const [postsData, setPostsData] = useState<PostI[]>([]);
  const {onlineUsers} = useChatStore()
  const [userData, setUserData] = useState<ProfileDataInterface[]>([]);
  const [timeRange, setTimeRange] = useState('monthly');
  const [postsCount, setPostsCount] = useState({
    weekly: Array(7).fill(0),
    monthly: Array(12).fill(0),
    yearly: {} as { [key: number]: number }
  });
  const [userCount, setUserCount] = useState({
    weekly: Array(7).fill(0),
    monthly: Array(12).fill(0),
    yearly: {} as { [key: number]: number }
  });
  useEffect(() => {
    setPostsCount({
      weekly: processWeeklyData(postsData),
      monthly: processMonthlyData(postsData),
      yearly: processYearlyData(postsData)
    });
    // setUserCount(processUserCounts(userData));
    setUserCount({
      weekly: processWeeklyUserData(userData),
      monthly: processMonthlyUserData(userData),
      yearly: processUserCounts(userData)
    });
  }, [postsData, userData]);

  useEffect(() => {
    fetchDashBoardCardsData();
  }, []);

  const fetchDashBoardCardsData = async () => {
    try {
      const response = await FetchDashBoardCardsData();
      if (response.success) {
        setPostsData(response?.data?.postData);
        setUserData(response?.data?.userData);
      }
    } catch (error) {
      console.log(error);
    }
  }; 
 
  const getBarData = () => {
    let data;
    let labels;
    let userDataArray;
  
    switch (timeRange) {
      case 'weekly':
        data = postsCount.weekly;
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        userDataArray = userCount.weekly;
        break;
      case 'monthly':
        data = postsCount.monthly;
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        userDataArray = userCount.monthly;
        break;
      case 'yearly':
        data = Object.values(postsCount.yearly);
        labels = Object.keys(postsCount.yearly);
        userDataArray = Object.values(userCount.yearly);
        break;
      default:
        data = postsCount.monthly;
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        userDataArray = userCount.monthly;
    }
  
    return {
      labels: labels,
      datasets: [
        {
          label: 'Posts',
          backgroundColor: 'rgba(0, 216, 0, 0.8)',
          borderWidth: 0,
          data: data
        },
        {
          label: 'Users',
          backgroundColor: 'rgba(0, 205, 230, 0.8)',
          borderWidth: 0,
          data: userDataArray
        },
      ]
    };
  };
  

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Posts & Users ',
        font: {
          size: 20
        }
      }
    }
  };

  const pieData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'User Status',
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        data: [onlineUsers.length, userData.length]
      },
      
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'User Status',
        font: {
          size: 20
        }
      }
    }
  };

  return (
    <div className="w-full mt-4 h-full flex flex-col md:flex-row gap-1 items-center">
      <Paper 
        sx={{ boxShadow: 12 }}
        className='md:w-2/3 w-full mb-4 h-full rounded shadow-lg mr-2 p-4'>
        {/* <Typography variant="h6" className="text-black mb-2">Bar Chart</Typography> */}
        <Bar
          data={getBarData()}
          options={barOptions}
        />
        <div className='w-full flex justify-center items-center'>
          <ButtonGroup variant="contained" aria-label="outlined primary button group" className="m-1">   
            <Button onClick={() => setTimeRange('weekly')}>Weekly</Button>
            <Button onClick={() => setTimeRange('monthly')}>Monthly</Button>
            <Button onClick={() => setTimeRange('yearly')}>Yearly</Button>
          </ButtonGroup>
        </div>
      </Paper>
      <Paper
        sx={{ boxShadow: 12 }}
        className='md:w-1/3 w-full mb-4 h-full bg-white rounded-lg shadow-lg p-4'>
        {/* <Typography variant="h6" className="text-black mb-2">Pie Chart</Typography> */}
        <Pie
          data={pieData}
          options={pieOptions}
        />
      </Paper>
    </div>
  );
};

export default Graphs
