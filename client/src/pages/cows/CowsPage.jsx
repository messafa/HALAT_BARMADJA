import { useEffect, useState } from "react";
import "../../App.css";
import { Box, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import InfoCard from "./components/InfoCard";
import NewCow from "./components/NewCow";
import axios from "axios";
import Swal from "sweetalert2";

const CowsPage = () => {
  const [cows, setCows] = useState([]);
  const url = "http://localhost:5001/";

  const handleSave = (newCowData) => {
    setCows((prevCows) => [...prevCows, newCowData]);
  };

  const handleUpdate = (updatedCow) => {
    setCows((prevCows) =>
      prevCows.map(
        (cow) => (
          cow.id === updatedCow.id ? updatedCow : cow
        
        ))
    );
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${url}cows/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "The cow has been deleted successfully.",
        background: "#303030",
      });
      setCows((prevCows) => prevCows.filter((cow) => cow.id !== id));
    } catch (error) {
      console.error("Error deleting cow:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the cow.",
        background: "#303030",
      });
    }
  };

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get(url + "cows", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCows(response.data.cows);
      } catch (error) {
        console.error("Error fetching cows:", error);
      }
    };

    fetchCows();
  }, [ cows]);

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">Our Cows</Heading>
        <NewCow onSave={handleSave} />
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {cows.map((cow) => (
          <InfoCard
            key={cow.id}
            cow={cow}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CowsPage;
