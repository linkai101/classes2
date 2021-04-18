import React from 'react';

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';

export default function Home() {
  return (
    <Box bg={useColorModeValue("default.primary", "default.primaryDark")}>
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row"}} minH="100vh">
          <Flex flex={1} justify="center" align="center">
            <Box w="100%" pt={{ base: 16, lg: 0 }} px={8} textAlign={{ base: "center", lg: "left" }}>
              <Heading as="h1" size="3xl" lineHeight={.9} fontWeight="extrabold" mb={{ base: 4, lg: 8 }}>
                Study Space
              </Heading>
              <Text fontWeight="bold">Take a seat and get some work done.</Text>
            </Box>
          </Flex>

          <Flex flex={3} direction={{ base: "column-reverse", lg: "row" }}>
            <Flex flex={2} justify="center" align="center" p={8}>
              <Image src="/images/studying.png" w="80%"/>
            </Flex>

            <Flex flex={1} justify="center" align="center">
              <Box w="100%" p={8} align="center">
                <Stack direction="column" spacing={4} maxW="384px">
                  <AwesomeButton type="secondary">Class</AwesomeButton>
                  <AwesomeButton type="secondary">Study</AwesomeButton>
                  <AwesomeButton type="secondary">Break</AwesomeButton>
                </Stack>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
