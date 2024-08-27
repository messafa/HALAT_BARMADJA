import { Box, Flex, Text, Link, IconButton, useColorMode } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "gray.700" };
  const color = { light: "gray.700", dark: "gray.200" };

  return (
    <Box bg={bgColor[colorMode]} color={color[colorMode]} py={4} mt={8}>
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        Milki
      </Text>
      <Flex alignItems="center" justifyContent="center" mx="auto" maxW="1200px" px={4}>
        <Link href="https://www.facebook.com" isExternal mx={2}>
          <IconButton
            icon={<FaFacebook />}
            aria-label="Facebook"
            variant="ghost"
            color={color[colorMode]}
          />
        </Link>
        <Link href="https://www.twitter.com" isExternal mx={2}>
          <IconButton
            icon={<FaTwitter />}
            aria-label="Twitter"
            variant="ghost"
            color={color[colorMode]}
          />
        </Link>
        <Link href="https://www.instagram.com" isExternal mx={2}>
          <IconButton
            icon={<FaInstagram />}
            aria-label="Instagram"
            variant="ghost"
            color={color[colorMode]}
          />
        </Link>
      </Flex>
      <Text textAlign="center" mt={4}>
        © {new Date().getFullYear()} Milki. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
