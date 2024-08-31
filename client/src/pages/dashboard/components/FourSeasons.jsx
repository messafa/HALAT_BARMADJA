/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, Filler } from "chart.js";


Chart.register(Filler);

const FourSeasons = () => {
  const [data, setData] = useState({ winter: 0, spring: 0, summer: 0, autumn: 0 });
  const url = "http://localhost:5001/births/data/season";
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url, config]);

  const pieData = {
    labels: ["Winter", "Spring", "Summer", "Autumn"],
    datasets: [
      {
        label: "Births by Season",
        data: [data.winter, data.spring, data.summer, data.autumn],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF5733"],
      },
    ],
  };

  return (
    <Box
      bg="blue.200"
      height="300px"
      p={4}
      borderRadius={10}
      display="flex"
      justifyContent="center"
    >
      <Pie data={pieData} />
    </Box>
  );
};

export default FourSeasons;