import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

const ChartDaily = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:5001/exam/data/lastSixMonths";
  const conf = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  useEffect(() => {
    axios.get(url, conf).then((response) => {
      setData(response.data.reverse());
    });
  }, []);

  const helper = [
    { month: "January" },
    { month: "February" },
    { month: "March" },
    { month: "April" },
    { month: "May" },
    { month: "June" },
    { month: "July" },
    { month: "August" },
    { month: "September" },
    { month: "October" },
    { month: "November" },
    { month: "December" },
  ];
  const thisMonth = new Date().getMonth();
  const lastSixMonths = [helper[(thisMonth - 5 + 12) % 12].month, helper[(thisMonth - 4 + 12) % 12].month, helper[(thisMonth - 3 + 12) % 12].month, helper[(thisMonth - 2 + 12) % 12].month, helper[(thisMonth - 1 + 12) % 12].month, helper[thisMonth].month];

  const barData = {
    labels: lastSixMonths,
    datasets: [
      {
        label: "Medical Exams",
        data: data,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Box bg="red.200" height="300px" p={4} borderRadius={10}>
        <Bar data={barData} />
      </Box>
    </>
  );
};

export default ChartDaily;
