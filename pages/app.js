import React from 'react';

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Image,
  useColorModeValue,
  useToast,
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

  async function signOut() {
    await firebase.auth().signOut();
  }

  if (loadingUser) return <LoadingPage/>;
  else { // User loaded
    if (!user) {
      window.location.href = "/";
      return <LoadingPage/>;
    }
  }

  return (
    <Box bg={useColorModeValue("default.primary", "default.primaryDark")}>
      <Container maxW="container.xl">
        <Flex align="center" justify="center" minH="95vh">
          <Box align="center">
            <Heading size="md" mb={4}>Welcome to your personal study space!</Heading>
            <Button action={signOut}>Sign out</Button>
          </Box>
        </Flex>

        <Footer minH="5vh"/>
      </Container>
    </Box>
  );
}
