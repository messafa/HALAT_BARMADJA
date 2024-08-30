import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import MedicalTestCard from "./components/MedicalTestCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExamsPage = () => {
  const { id } = useParams();
  const [medicalTests, setMedicalTests] = useState([]);
  
  const url = id
    ? `http://localhost:5001/exam/cow/${id}`
    : "http://localhost:5001/exam";
  console.log(url);
  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMedicalTests(response.data.exams);
        console.log(response.data.exams);
      } catch (error) {
        console.error("Error fetching cows:", error);
      }
    };

    fetchCows();
  }, [ url ]);

  return (
    <ChakraProvider>
      <Box padding="4">
        <Heading as="h1" size="xl" marginBottom="4">
          Medical Tests
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {medicalTests.length > 0 ? (
            medicalTests.map((medicalTest) => (
              <MedicalTestCard
                key={medicalTest.id}
                test={medicalTest}
              />
            ))
          ) : (
            <Text textAlign="center" width="100%">
              No medical tests found.
            </Text>
          )}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default ExamsPage;
