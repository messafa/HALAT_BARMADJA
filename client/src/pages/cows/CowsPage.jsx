import "../../App.css";
import { Box, Button, Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import InfoCard from "./components/InfoCard";

const CowsPage = () => {
  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">Our Cows</Heading>
        <Button colorScheme="teal" size="md">
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
    </Box>
  );
};

export default CowsPage;
