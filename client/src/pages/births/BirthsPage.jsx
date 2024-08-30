/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { SimpleGrid, Box, Heading } from '@chakra-ui/react';
import CardComponent from './components/CardComponent';
import { useState , useEffect } from 'react';
import axios from 'axios';

const BirthsPage = ({url}) => {
  const token = localStorage.getItem("token");
  const [births, setBirths] = useState([]); 
  const path = window.location.pathname.split("/")[2];
  console.log(path);
  useEffect(() => {
    axios
      .get(url || "http://localhost:5001/births", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBirths(response.data.births);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, setBirths]);
  console.log(births);
  return (
    <Box p={5}>
      <Heading mb={5}>Our Births</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {births.map((birth) => (
          <CardComponent key={birth.id} data={birth} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BirthsPage;