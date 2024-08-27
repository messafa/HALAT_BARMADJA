
import { SimpleGrid, Box, Heading } from '@chakra-ui/react';
import CardComponent from './components/CardComponent';

const BirthsPage = () => {
  return (
    <Box p={5}>
      <Heading mb={5}>Our Births</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {Array.from({ length: 10 }).map((_, index) => (
          <CardComponent key={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BirthsPage;