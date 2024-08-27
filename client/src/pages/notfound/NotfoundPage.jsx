import { Box, Image, Heading, Text, VStack, useColorMode } from '@chakra-ui/react';


function NotfoundPage() {
  const { colorMode } = useColorMode();

  return (
    <Box 
      textAlign="center" 
      py={10} 
      px={6}
      maxH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
    >
      <VStack >
        <Heading
          as="h2"
          p={0}
          m={0}
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          Page Not Found
        </Heading>
       
        <Image 
        src="/pic404.png" 
        alt="404 Not Found" 
        maxW="500px" 
      
        />
        <Text 
        fontSize="18px"  
        color={colorMode === "light" ? "gray.800" : "gray.200"}
        p={0}
        mb={5}
        >
          The page you’re looking for does not seem to exist.
        </Text>
        
        
      </VStack>
    </Box>
  );
}

export default NotfoundPage;