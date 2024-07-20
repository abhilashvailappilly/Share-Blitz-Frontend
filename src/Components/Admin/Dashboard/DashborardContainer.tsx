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



const DashboardContainer = () => {
 

  return (
   
      <div className="flex flex-col bg-white dark:bg-gray-900  w-full mt-1 p-4 flex-grow  overflow-scroll no-scrollbar">
        <TopCards/>
        <Graphs/>
      </div>
    
  );
};

export default DashboardContainer;
