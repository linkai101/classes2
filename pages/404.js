import React from 'react';

import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Custom404() {
  return (
    <Flex 
      minH="100vh" align="center" justify="center" 
      bg={useColorModeValue("default.primary", "default.primaryDark")}
    >
      <Box align="center">
        <Heading as="h1" size="2xl">404!</Heading>
        <Text fontSize="lg" m={1}>Sorry, that page isn't here.</Text>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button 
            colorScheme="whiteAlpha" color={useColorModeValue("default.text", "default.textDark")} 
            mt={2}
          >📚 Back to Studying!</Button>
        </Link>
      </Box>
    </Flex>
  );
}