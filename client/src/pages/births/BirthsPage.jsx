/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { SimpleGrid, Box, Heading, Flex } from "@chakra-ui/react";
import CardComponent from "./components/CardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewBirth from "./components/NewBirth";

const BirthsPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [births, setBirths] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const url = id
    ? `http://localhost:5001/births/cow/${id}`
    : "http://localhost:5001/births";
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBirths(response.data.births);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, setBirths]);

  const handleSave = async (newBirth) => {
    const updatedBirths = [...births, newBirth];
    setBirths(updatedBirths);
  }

  return (
    <Box p={5}>
      {id ? (
        <Flex justifyContent="space-between" mb={5}>
          <Heading mb={5}>{`Cow births ${id} `}</Heading>
          <NewBirth
            motherId={id}
            onSave={handleSave}
          />
        </Flex>
      ) : (
        <Heading mb={5}>Our Births</Heading>
      )}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {births.map((birth) => (
          <CardComponent 
          key={birth.id} 
          data={birth}
          setBirths={setBirths}
           />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BirthsPage;
