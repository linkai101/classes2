import React from 'react';

import {
  Container,
  Flex,
  Box,
  Text,
  Link,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import { useAuth } from '../lib/auth';
import 'firebase/firestore';

import ColorModeToggle from './ColorModeToggle';

export default function Footer({ ...rest }) {
  initFirebase();
  const { user, loadingUser } = useAuth();

  async function signOut() {
    await firebase.auth().signOut();
  }

  return (
    <Container maxW="container.xl" {...rest}>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box flex={1}>
          {!loadingUser && user &&
            <>
              <Text as="span" mr={2}>signed in as: {user.email}</Text>
              <Link onClick={signOut} color={useColorModeValue("blue.500", "blue.300")}>sign out</Link>
            </>
          }
        </Box>
        <Box flex={1} align="right">
          <Text as="span" mr={2}>dark mode</Text><ColorModeToggle/>
          <Text as="span" ml={6} mr={2}>
            <Link href="/about" fontWeight="bold" isExternal>about</Link>
          </Text>
          ~
          <Text as="span" mx={2}>
            <Link href="/terms" fontWeight="bold" isExternal>terms</Link>
          </Text>
          ~
          <Text as="span" ml={2}>
            <Link href="/privacy" fontWeight="bold" isExternal>privacy</Link>
        </Text>
        </Box>
      </Flex>
    </Container>
  );
}
