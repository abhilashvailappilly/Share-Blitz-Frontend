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
import TopCards from './TopCards';
import Graphs from './Graphs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// const weeklyData = [65, 59, 80, 81, 56, 55, 40];
// const monthlyData = [65, 59, 80, 81, 56, 55];
// const yearlyData = [650, 590, 800, 810, 560, 550];


const DashboardContainer = () => {
  // const [timeRange] = useState('monthly');
  
  // const getBarData = () => {
  //   let data;
  //   switch (timeRange) {
  //     case 'weekly':
  //       data = weeklyData;
  //       break;
  //     case 'monthly':
  //       data = monthlyData;
  //       break;
  //     case 'yearly':
  //       data = yearlyData;
  //       break;
  //     default:
  //       data = monthlyData;
  //   }
  //   return {
  //     labels: timeRange === 'weekly' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['January', 'February', 'March', 'April', 'May', 'June','July','Aug','Sep','Oct','Nov','Dec'],
  //     datasets: [
  //       {
  //         label: 'Revenue',
  //         backgroundColor: 'rgba(0, 234, 172, 0.8)',
  //         // borderColor: 'rgba(0,0,0,1)',
  //         borderWidth: 0,
  //         data: data
  //       },
  //       {
  //         label: 'Posts',
  //         backgroundColor: 'rgba(0, 216, 0, 0.8)',
  //         // borderColor: 'rgba(0,0,,6)',
  //         borderWidth: 0,
  //         // border:'rounded',
  //         data: data
  //       }
  //     ]
  //   };
  // };

  return (
   
      <div className="flex flex-col bg-white  w-full mt-1 p-4 flex-grow  overflow-scroll no-scrollbar">
        
      <TopCards/>
      <Graphs/>
      </div>
    // </div>
  );
};

export default DashboardContainer;
