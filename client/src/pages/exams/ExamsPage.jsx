
import React from "react";
import { ChakraProvider, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import MedicalTestCard from "./components/MedicalTestCard";
import axios from "axios";

const ExamsPage = () => {
  const [medicalTests, setMedicalTests] = React.useState([]);

  const token = localStorage.getItem("token");
  React.useEffect(() => {
    axios
      .get( "http://localhost:5001/exam", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMedicalTests(response.data.exams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, setMedicalTests]);



  return (
    <ChakraProvider>
      <Box padding="4">
        <Heading as="h1" size="xl" marginBottom="4">
          Medical Tests
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {medicalTests.map((medicalTest) => (
            <MedicalTestCard key={medicalTest.id} test={medicalTest} />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default ExamsPage;
