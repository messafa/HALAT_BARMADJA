/* eslint-disable no-unused-vars */
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
import Swal from "sweetalert2";

const LoginPage = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        window.location.href = '/';
      } else {
        Swal.fire('error', data.msg, 'error');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        background: '#303030',
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User registered successfully',
          background: '#303030',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.msg,
          background: '#303030',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        background: '#303030',
      });
    }
  };

  return (
    <ChakraProvider>
      <Box
        width={"100%"}
        height={"100vh"}
        backgroundColor={"red"}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        backgroundImage="url('/pic08.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Box
          maxW="md"
          mx="auto"
          p="6"
          borderRadius="lg"
          bg="rgba(2, 2, 2, 0.5)"
          boxShadow="lg"
          backdropFilter="blur(5px)"
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
          <Tabs isFitted color={"white"} variant="enclosed" border={"teal"}>
            <TabList>
              <Tab>Login</Tab>
              {/* <Tab>Register</Tab> */} 
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box as="form" onSubmit={handleLogin}>
                  <Input
                    placeholder="Email"
                    type="email"
                    mb="4"
                    borderColor="teal.500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup size="md" mb="4">
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      borderColor="teal.500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                <Box as="form" onSubmit={handleRegister}>
                  <Input
                    placeholder="Name"
                    type="text"
                    mb="4"
                    borderColor="teal.500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    mb="4"
                    borderColor="teal.500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup size="md" mb="4">
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      borderColor="teal.500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
      </Box>
    </ChakraProvider>
  );
};

export default LoginPage;