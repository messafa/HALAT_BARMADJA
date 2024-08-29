/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
  VStack,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import EditMilk from "./EditMilk";

const getProgressColor = (progress) => {
  if (progress === 100) return "green.400";
  if (progress < 50) return "red.400";
  if (progress >= 50 && progress <= 75) return "orange.400";
  return "teal.400";
};

const CircularInfoComponent = ({ id, addedBy, date, size, progress, onDelete }) => {
  const { colorMode } = useColorMode();
  const progressColor = getProgressColor(progress);

  

  return (
    <Box
      borderRadius="md"
      p={4}
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
      boxShadow="md"
      w="full"
      maxW="400px"
      overflow="hidden"
    >
      <HStack spacing={4} align="center">
        <VStack align="start" spacing={3} flex="1">
          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={colorMode === "light" ? "gray.600" : "gray.300"}
            >
              Added by:
            </Text>
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "gray.800" : "gray.200"}
            >
              {addedBy}
            </Text>
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={colorMode === "light" ? "gray.600" : "gray.300"}
            >
              Date:
            </Text>
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "gray.800" : "gray.200"}
            >
              {date}
            </Text>
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={colorMode === "light" ? "gray.600" : "gray.300"}
            >
              Size:
            </Text>
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "gray.800" : "gray.200"}
            >
              {size} Liters
            </Text>
          </Box>

          <HStack spacing={2}>
            <EditMilk milk={{ id, addedBy, date, size }}  />
            <Button size="sm" colorScheme="red" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </HStack>
        </VStack>

        <Box boxSize="120px">
          <CircularProgress
            value={progress}
            color={progressColor}
            size="100%"
            thickness="8px"
          >
            <CircularProgressLabel fontSize="xl" fontWeight="bold">
              {progress}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </HStack>
    </Box>
  );
};

export default CircularInfoComponent;