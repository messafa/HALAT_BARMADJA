import React from "react";
import { ChakraProvider, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import MedicalTestCard from "./components/MedicalTestCard";

const ExamsPage = () => {
  const medicalTest = {
    id: 1,
    date: "2021-09-01",
    cowId: 1,
    disease: "Mastitis",
    addedBy: "HANOUN44",
  };

  return (
    <ChakraProvider>
      <Box padding="4">
        <Heading as="h1" size="xl" marginBottom="4">
          Medical Tests
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {Array.from({ length: 10 }, (_, index) => (
            <MedicalTestCard key={index} test={medicalTest} />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};

export default ExamsPage;