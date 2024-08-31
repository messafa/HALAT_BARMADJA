/* eslint-disable no-unused-vars */

import { Box, SimpleGrid } from "@chakra-ui/react";
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
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import ChartTwoWeek from "./components/ChartTwoWeek";
import ChartDaily from "./components/ChartDaily";
import DoughnutWeek from "./components/DoughnutWeek";
import FourSeasons from "./components/FourSeasons";

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
  const lineData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [15, 9, 20, 5],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
      <ChartDaily />
      <ChartTwoWeek />
      <FourSeasons />
      <DoughnutWeek />
    </SimpleGrid>
  );
};

export default Home;
