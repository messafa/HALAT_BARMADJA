import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  ChakraProvider,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ChakraProvider
     // I want add a background image to the login page

    >
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
        <Box textAlign="center" py="10" bg="transparent" position="relative">
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
        <Tabs isFitted color={'white'} variant="enclosed" border={'teal'}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box as="form">
                <Input
                  placeholder="Email"
                  type="email"
                  mb="4"
                  borderColor="teal.500"
                />
                <InputGroup size="md" mb="4">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    borderColor="teal.500"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash color="teal" />
                      ) : (
                        <FaEye color="teal" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button colorScheme="teal" type="submit">
                  Login
                </Button>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box as="form">
                <Input
                  placeholder="Name"
                  type="text"
                  mb="4"
                  borderColor="teal.500"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  mb="4"
                  borderColor="teal.500"
                />
                <InputGroup size="md" mb="4">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    borderColor="teal.500"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash color="teal" />
                      ) : (
                        <FaEye color="teal" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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

export default LoginPage;
