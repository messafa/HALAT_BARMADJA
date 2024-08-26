import "../App.css";
import {
  ChakraProvider,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

const About = () => {
  return (
    <ChakraProvider>
  <Box
    maxW="md"
    mx="auto"
    mt="10"
    p="6"
    borderRadius="lg"
    bg="rgba(255, 255, 255, 0.2)"
    boxShadow="lg"
    backdropFilter="blur(10px)"
  >
    <Box
      textAlign="center"
      py="10"
      bg="transparent"
      position="relative"
    >
      <Text
        fontSize="6xl"
        fontFamily="cursive"
        fontWeight="bold"
        color="transparent"
        style={{
          backgroundImage: "url('/pic00.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          textFillColor: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        Milki
      </Text>
    </Box>
    <Tabs isFitted variant="enclosed">
      <TabList>
        <Tab>Login</Tab>
        <Tab>Register</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box as="form">
            <Input placeholder="Email" type="email" mb="4" />
            <Input placeholder="Password" type="password" mb="4" />
            <Button colorScheme="teal" type="submit">
              Login
            </Button>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box as="form">
            <Input placeholder="Name" type="text" mb="4" />
            <Input placeholder="Email" type="email" mb="4" />
            <Input placeholder="Password" type="password" mb="4" />
            <Button colorScheme="teal" type="submit">
              Register
            </Button>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
</ChakraProvider>
  );
};

export default About;
