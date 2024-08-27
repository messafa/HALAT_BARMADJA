import {
  Box,
  Image,
  Text,
  Button,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

function CardComponent() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const textColor = { light: "black", dark: "white" };

  const data = {
    motherId: 19146233,
    dateBirth: "2009-01-01",
    gender: "F",
    addedBy: "messafa lahcen",
  };

  return (
    <Box
      display="flex"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      maxW="600px"
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
      m="4"
    >
      <Image
        src="/calf03.jpg"
        alt="Image"
        objectFit="cover"
        width="200px"
        height="auto"
      />
      <Box p="6" flex="1">
        <Stack spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Mother ID: {data.motherId}
          </Text>
          <Text>Date of Birth: {data.dateBirth}</Text>
          <Text>Gender: {data.gender === "F" ? "Female" : "Male"}</Text>
          <Text>Added By: {data.addedBy}</Text>
          <Stack direction="row" spacing={4} mt={4}>
            <Button colorScheme="green">Edit</Button>
            <Button colorScheme="red">Delete</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default CardComponent;
