import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

function InfoCard() {
  return (
    <Box
      w="97.5%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      mb={3}
      mx={4}
    >
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Image
          src="/pic00.jpg"
          alt="Hisoka"
          borderRadius="lg"
          w={{ base: "100%", md: "50%" }}
          h="200px"
        />
        <VStack
          align="start"
          mt={{ base: "4", md: "0" }}
          ml={{ md: "4" }}
          spacing="2"
        >
          <Text fontSize="lg" fontWeight="bold">
            Breed: Hisoka
          </Text>
          <Text>Date of Entry: 10-11-2020</Text>
          <Text>Added by: HISOKA</Text>
        </VStack>
      </Flex>
      <HStack mt="4" spacing="2" justify="center">
        <Button colorScheme="purple">Children</Button>
        <Button colorScheme="green">Health File</Button>
        <Button colorScheme="blue" leftIcon={<FaEdit />}>
          Edit
        </Button>
        <Button colorScheme="red" leftIcon={<FaTrash />}>
          Delete
        </Button>
      </HStack>
    </Box>
  );
}

export default InfoCard;
