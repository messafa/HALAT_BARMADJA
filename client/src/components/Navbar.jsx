import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
    borderRadius={15}
    m={2}
    bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box 
        fontWeight="bold" 
        fontSize="xl" 
        color="white"
        >
          Milki
        </Box>
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <NavLink to="/" style={{ marginRight: "16px" }}>
            Home
          </NavLink>
          <NavLink to="/about" style={{ marginRight: "16px" }}>
            About
          </NavLink>
          <NavLink to="/services" style={{ marginRight: "16px" }}>
            Services
          </NavLink>
          <NavLink to="/contact" style={{ marginRight: "16px" }}>
            Contact
          </NavLink>
        </Flex>
        <Flex>
          <IconButton
            size="md"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            variant="ghost"
            color={colorMode === "light" ? "gray.800" : "white"}
            ml={2}
          />
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={onOpen}
            variant="ghost"
            color={colorMode === "light" ? "gray.800" : "white"}
            bg={colorMode === "light" ? "white" : "gray.800"}
            ml={2}
            _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
          />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={4}>
              <NavLink to="/" onClick={onClose} >
                Home
              </NavLink>
              <NavLink to="/about" onClick={onClose}>
                About
              </NavLink>
              <NavLink to="/services" onClick={onClose}>
                Services
              </NavLink>
              <NavLink to="/contact" onClick={onClose}>
                Contact
              </NavLink>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
