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
  
  const getProgressColor = (progress) => {
    if (progress < 50) return "red.400";
    if (progress >= 50 && progress <= 75) return "orange.400";
    return "teal.400";
  };
  
  const CircularInfoComponent = ({ addedBy, date, size, progress }) => {
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
          {/* القسم الأيسر - المعلومات والأزرار */}
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
  
            {/* الأزرار */}
            <HStack spacing={2}>
              <Button size="sm" colorScheme="teal">
                Edit
              </Button>
              <Button size="sm" colorScheme="red">
                Delete
              </Button>
            </HStack>
          </VStack>
  
          {/* القسم الأيمن - الرسم البياني الدائري */}
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