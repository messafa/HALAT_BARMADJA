/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const DoughnutWeek = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:5001/cows/data/yearly";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [url, config]);

  const doughnutData = {
    labels: ["currentYear", "lastYear", "otherYears"],
    datasets: [
      {
        label: "Cows",
        data: [data.currentYear, data.lastYear, data.otherYears],
        backgroundColor: ["#01FBFF", "#DA07FA9B", "#6C6161"],
      },
    ],
  };
  return (
    <>
      <Box bg="#0000004C" height="300px" p={4} borderRadius={10} display="flex"
        justifyContent="center">
        <Doughnut data={doughnutData} />
      </Box>
    </>
  );
};

export default DoughnutWeek;