import { Box, Image, Text, Button, VStack, HStack, Flex } from "@chakra-ui/react";

function InfoCard() {
  return (
    <Box 
      w="97.5%" // Full width of the viewport
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
          
        //   objectFit="cover" 
          borderRadius={'lg'}
          w={{ base: "100%", md: "50%" }} 
          h="200px"
        />
        <VStack align="start" mt={{ base: "4", md: "0" }} ml={{ md: "4" }} spacing="2">
          <Text fontSize="lg" fontWeight="bold">Breed: Hisoka</Text>
          <Text>Date of Entry: 10-11-2020</Text>
          <Text>Added by: HISOKA</Text>
        </VStack>
      </Flex>
      <HStack mt="4" spacing="2" justify="center">
        <Button colorScheme="teal">Button 1</Button>
        <Button colorScheme="teal">Button 2</Button>
        <Button colorScheme="teal">Button 3</Button>
        <Button colorScheme="teal">Button 4</Button>
        <Button colorScheme="teal">Button 5</Button>
        <Button colorScheme="teal">Button 6</Button>
      </HStack>
    </Box>
  );
}

export default InfoCard;
