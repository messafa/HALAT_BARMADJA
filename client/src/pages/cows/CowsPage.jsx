/* eslint-disable no-unused-vars */
import  { useEffect, useState } from "react";
import "../../App.css";
import { Box, Button, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import InfoCard from "./components/InfoCard";
import NewCow from "./components/NewCow"; // استيراد مكون NewCow

const CowsPage = () => {
  const [cows , setCows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = "http://localhost:5001/";
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = (newCowData) => {
    console.log("New Cow Data:", newCowData);
    setIsModalOpen(false);
  };
  // fetch cows data using useEffect and axios from http://localhost:5001/cows and send token in the header
  useEffect(() => {
    fetch(url + "cows", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCows(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">Our Cows</Heading>
        <Button colorScheme="teal" size="md" onClick={handleOpenModal}>
          Add New Cow
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </SimpleGrid>

      {/* مكون النافذة المنبثقة NewCow */}
      <NewCow isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} />
    </Box>
  );
};

export default CowsPage;5 