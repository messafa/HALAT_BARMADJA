import { useEffect, useState } from "react";
import "../../App.css";
import { Box, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import InfoCard from "./components/InfoCard";
import NewCow from "./components/NewCow";
import axios from "axios";

const CowsPage = () => {
  const [cows, setCows] = useState([]);
  const url = "http://localhost:5001/";

  const handleSave = (newCowData) => {
    setCows((prevCows) => [...prevCows, newCowData]);
  };

  const handleUpdate = (updatedCow) => {
    setCows((prevCows) =>
      prevCows.map((cow) => (cow.id === updatedCow.id ? updatedCow : cow))
    );
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
  }, [cows]);

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
            // onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CowsPage;
