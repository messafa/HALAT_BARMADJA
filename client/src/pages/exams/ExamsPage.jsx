import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import MedicalTestCard from "./components/MedicalTestCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewExam from "./components/NewExam";

const ExamsPage = () => {
  const { id } = useParams();
  const [medicalTests, setMedicalTests] = useState([]);
  
  const url = id
    ? `http://localhost:5001/exam/cow/${id}`
    : "http://localhost:5001/exam";
  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMedicalTests(response.data.exams);
      } catch (error) {
        console.error("Error fetching cows:", error);
      }
    };

    fetchCows();
  }, [ url ]);

  return (
    <ChakraProvider>
      <Box padding="4">
        {id ? (
          <Flex justifyContent="space-between" marginBottom="4">
          <Heading as="h1" size="xl" marginBottom="4">
            Cow {id} Tests
          </Heading>
          <NewExam cowId={id} onSave={(newExam) => setMedicalTests([...medicalTests, newExam])} /> 
          </Flex> 
        ): (
          <Heading as="h1" size="xl" marginBottom="4">
            Medical Tests
          </Heading>
        )}


        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {medicalTests.length > 0 ? (
            medicalTests.map((medicalTest) => (
              <MedicalTestCard
                key={medicalTest.id}
                test={medicalTest}
                setMedicalTests={setMedicalTests}
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
