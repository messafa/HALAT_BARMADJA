import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const ChartTwoWeek = () => {
  const [thisWeek, setThisWeek] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const today = new Date().getDay();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:5001/milk/data/";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url + "thisweek", config)
      .then((res) => {
        setThisWeek(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(url + "lastweek", config)
      .then((res) => {
        setLastWeek(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [today]);

  const helper = [
    { day: "sun" },
    { day: "mon" },
    { day: "tue" },
    { day: "wed" },
    { day: "thu" },
    { day: "fri" },
    { day: "sat" },
  ];
  const days = [
    helper[(today + 1) % 7].day,
    helper[(today + 2) % 7].day,
    helper[(today + 3) % 7].day,
    helper[(today + 4) % 7].day,
    helper[(today + 5) % 7].day,
    helper[(today + 6) % 7].day,
    helper[(today + 7) % 7].day,
  ];

  const NewData = {
    labels: days,
    datasets: [
      {
        label: "this week",
        data: thisWeek,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "last week",
        data: lastWeek,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };
  return (
    <>
      <Box bg="green.600" height="300px" p={4} borderRadius={10}>
        <Line data={NewData} />
      </Box>
    </>
  );
};

export default ChartTwoWeek;
