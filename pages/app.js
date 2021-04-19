import React from 'react';

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Fade,
} from '@chakra-ui/react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import { useAuth } from '../lib/auth';
import { getData, updateData } from '../lib/db';
import 'firebase/firestore';

import Button from '../components/Button';
import Footer from '../components/Footer';
import LoadingPage from '../components/LoadingPage';
import LeftMenu from '../components/app/LeftMenu';
import Clock from '../components/app/Clock';
import ClassList from '..//components/app/ClassList';

export default function Home() {
  initFirebase();
  const { user, loadingUser } = useAuth();
  
  const [data, setData] = React.useState();

  React.useEffect(() => {
    async function fetchUserData() {
      if (!loadingUser && user) {
        var userData = await getData(user.uid);
        if (!userData) {
          userData = {};
          updateData(user.uid, userData);
        }
        setData(userData);
      }
    }
    fetchUserData();
  }, [user, loadingUser]);

  if (loadingUser || typeof data === 'undefined') return <LoadingPage/>;
  else { // User loaded
    if (!user) {
      window.location.href = "/";
      return <LoadingPage/>;
    }
  }

  return (
    <>
      <Box bg={useColorModeValue("default.primary", "default.primaryDark")}>
        <Container maxW="container.xl">
          <Fade in={true}>
            <Flex direction={{ base: "column", lg: "row" }} minH="95vh">
              <Flex flex={3} direction={{ base: "column-reverse", lg: "row" }}>
                <Flex flex={1} direction="column" justify="center">
                  <LeftMenu mx={8} pb={12} data={data} setData={setData}/>
                </Flex>

                <Flex flex={2} direction="column" justify="center" p={4}>
                  <Box my={4} align="center">
                    <Clock my={4}/>
                  </Box>

                  <Box my={4} align="center">
                    <ClassList data={data}/>
                  </Box>
                </Flex>
              </Flex>

              <Box flex={1}></Box>
            </Flex>
          </Fade>

          <Footer minH="5vh"/>
        </Container>
      </Box>
    </>
  );
}
