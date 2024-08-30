/* eslint-disable no-unused-vars */


import { Box, SimpleGrid } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Home = () => {
  const barData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sales',
        data: [15, 9, 20, 5],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  };

  const doughnutData = {
    labels: ['Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [5, 10, 8],
        backgroundColor: ['green', 'purple', 'orange'],
      },
    ],
  };
  const NewData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "this ans",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Last ans",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
      <Box bg="red.200" height="300px" p={4} borderRadius={10} >
        <Bar data={barData} />
      </Box>
      <Box bg="green.900" height="300px" p={4} borderRadius={10} >
        <Line data={NewData} />
      </Box>
      <Box bg="blue.200" height="300px" p={4} borderRadius={10} >
        <Pie data={pieData} />
      </Box>
      <Box bg="yellow.200" height="300px" p={4} borderRadius={10} >
        <Doughnut data={doughnutData} />
      </Box>
    </SimpleGrid>
  );
};

export default Home;