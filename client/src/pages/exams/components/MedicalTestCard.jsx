import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

const MedicalTestCard = ({ test }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      p={4}
      bg="white"
      _dark={{ bg: "gray.700", borderColor: "gray.600" }}
    >
      <Flex mt={2}>
        <Text fontWeight="bold">ID: </Text>
        <Text ml={2}>{test.id}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Date: </Text>
        <Text ml={2}>{test.date}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Cow ID: </Text>
        <Text ml={2}>{test.cowId}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Disease: </Text>
        <Text ml={2}>{test.disease}</Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold">Added By: </Text>
        <Text ml={2}>{test.addedBy}</Text>
      </Flex>
      <Flex mt={4} justifyContent="flex-end">
        <Button colorScheme="blue" size="sm" mr={2}>
          Edit
        </Button>
        <Button colorScheme="red" size="sm">
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default MedicalTestCard;