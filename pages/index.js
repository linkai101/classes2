import React from 'react';
import Image from 'next/image';

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Fade,
} from '@chakra-ui/react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import { useAuth } from '../lib/auth';
import 'firebase/firestore';

import Button from '../components/Button';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';

export default function Home() {
  initFirebase();
  const { user, loadingUser } = useAuth();
  const toast = useToast();

  if (loadingUser) return <LoadingPage/>;
  else { // User loaded
    if (user) {
      window.location.href = "/app";
      return <LoadingPage/>;
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider)
    .then(async (u) => {
    })
    .catch(function(err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        isClosable: true,
      });
    });
  }

  return (
    <Box bg={useColorModeValue("default.primary", "default.primaryDark")}>
      <Container maxW="container.xl">
        <Fade in={true}>
        <Flex direction={{ base: "column", lg: "row"}} minH="95vh">
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
              <Box position="relative" w="80%" h="80%" minH="256px">
                <Image src="/images/studying.png" alt="Study Space" layout="fill" objectFit="contain" priority/>
              </Box>
            </Flex>

            <Flex flex={1} justify="center" align="center">
              <Box w="100%" p={8} align="center">
                <Stack direction="column" spacing={4} maxW="384px">
                  <Button w="100%" action={signInWithGoogle}>Sign in with Google</Button>
                </Stack>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        </Fade>

        <Footer minH="5vh"/>
      </Container>
    </Box>
  );
}
