import { Box, SimpleGrid } from '@chakra-ui/react';

const Home = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
      <Box bg="red.200" height="250px" borderRadius={20} />
      <Box bg="green.200" height="250px" borderRadius={20} />
      <Box bg="blue.200" height="250px" borderRadius={20} />
      <Box bg="yellow.200" height="250px" borderRadius={20} />
    </SimpleGrid>
  );
};

export default Home;