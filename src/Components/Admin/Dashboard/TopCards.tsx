import { FetchDashBoardCardsData } from '@/Api/admin/adminApiMethod';
import { PostI } from '@/Types/User/Post';
import ProfileDataInterface from '@/Types/User/userProfile';
import { useChatStore } from '@/ZustandStore/chatStore';
import { People, Person, MonetizationOn, PostAdd } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TopCards = () => {
    const [cardsData, setCardsData] = useState(null);
    const [postsData, setPostsData] = useState<PostI[]>([]);
    const [usersData, setUsersData] = useState<ProfileDataInterface[]>([]);
    const { onlineUsers } = useChatStore();

    useEffect(() => {
        fetchDashBoardCardsData();
    }, []);

    const fetchDashBoardCardsData = async () => {
        try {
            const response = await FetchDashBoardCardsData();
            console.log("response cards", response);
            if (response.success) {
                setPostsData(response?.data?.postData);
                setUsersData(response?.data?.userData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container spacing={3} className="bg-white  w-full">
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className="p-6 mt-1 flex flex-col items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white"
                    sx={{ boxShadow: 4  }}
                >
                    <People className="text-blue-300 mb-2" fontSize="large" />
                    <Typography variant="h4" className="font-bold">{usersData?.length || 0}</Typography>
                    <Typography variant="h6">No of Users</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className="p-6 flex flex-col items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white"
                    sx={{ boxShadow: 4 }}
                >
                    <Person className="text-green-300 mb-2" fontSize="large" />
                    <Typography variant="h4" className="font-bold">{onlineUsers.length}</Typography>
                    <Typography variant="h6">Active Users</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className="p-6 flex flex-col items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white"
                    sx={{ boxShadow: 4 }}
                >
                    <MonetizationOn className="text-yellow-300 mb-2" fontSize="large" />
                    <Typography variant="h4" className="font-bold">$12000</Typography>
                    <Typography variant="h6">Total Revenue</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                    className="p-6 flex flex-col items-center justify-center shadow-lg rounded-lg bg-gray-800 text-white"
                    sx={{ boxShadow: 4 }}
                >
                    <PostAdd className="text-purple-300 mb-2" fontSize="large" />
                    <Typography variant="h4" className="font-bold">{postsData?.length || 0}</Typography>
                    <Typography variant="h6">Posts</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TopCards;
