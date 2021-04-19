import React from 'react';
import Head from 'next/head';
import config from '../config';

import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Fade,
} from '@chakra-ui/react';

import Button from '../components/Button';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404!{config.titleSuffix}</title>
      </Head>
      
      
      <Flex 
        minH="95vh" align="center" justify="center" 
        bg={useColorModeValue("default.primary", "default.primaryDark")}
      >
        <Fade in={true}>
          <Box align="center">
            <Heading as="h1" size="2xl">404!</Heading>
            <Text fontSize="lg" m={1} mb={4}>Sorry, that page isn't here.</Text>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button>📚 Back to Studying!</Button>
            </Link>
          </Box>
        </Fade>
      </Flex>

      <Footer minH="5vh" bg={useColorModeValue("default.primary", "default.primaryDark")}/>
    </>
  );
}