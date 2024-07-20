import { useEffect, useState } from 'react';
import { FetchDashBoardCardsData } from '@/Api/admin/adminApiMethod';
import { PostI } from '@/Types/User/Post';
import ProfileDataInterface from '@/Types/User/userProfile';
import { useChatStore } from '@/ZustandStore/chatStore';
import { People, Person, MonetizationOn, PostAdd } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import { useDarkMode } from '@/Context/DarkModeContext'; // Assuming you have a DarkModeContext

const TopCards = () => {
    const [postsData, setPostsData] = useState<PostI[]>([]);
    const [usersData, setUsersData] = useState<ProfileDataInterface[]>([]);
    const { onlineUsers } = useChatStore();
    const { isDarkMode } = useDarkMode(); // Determine if dark mode is active

    useEffect(() => {
        fetchDashBoardCardsData();
    }, []);

    const fetchDashBoardCardsData = async () => {
        try {
            const response = await FetchDashBoardCardsData();
            if (response.success) {
                setPostsData(response?.data?.postData);
                setUsersData(response?.data?.userData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container spacing={3} className={`w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className={`p-6 mt-1 flex flex-col items-center justify-center shadow-lg rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-800'}`}
                    sx={{ boxShadow: 4 }}
                >
                    <People className={`mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'}`} fontSize="large" />
                    <Typography variant="h4" className="font-bold">{usersData?.length || 0}</Typography>
                    <Typography variant="h6">No of Users</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className={`p-6 flex flex-col items-center justify-center shadow-lg rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-green-100 text-green-800'}`}
                    sx={{ boxShadow: 4 }}
                >
                    <Person className={`mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-500'}`} fontSize="large" />
                    <Typography variant="h4" className="font-bold">{onlineUsers.length}</Typography>
                    <Typography variant="h6">Active Users</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className={`p-6 flex flex-col items-center justify-center shadow-lg rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-yellow-100 text-yellow-800'}`}
                    sx={{ boxShadow: 4 }}
                >
                    <MonetizationOn className={`mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-500'}`} fontSize="large" />
                    <Typography variant="h4" className="font-bold">$12000</Typography>
                    <Typography variant="h6">Total Revenue</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className={`p-6 flex flex-col items-center justify-center shadow-lg rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-purple-100 text-purple-800'}`}
                    sx={{ boxShadow: 4 }}
                >
                    <PostAdd className={`mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`} fontSize="large" />
                    <Typography variant="h4" className="font-bold">{postsData?.length || 0}</Typography>
                    <Typography variant="h6">Posts</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TopCards;
