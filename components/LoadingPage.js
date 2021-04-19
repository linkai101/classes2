import React from 'react';

import {
  Flex,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';

import Footer from './Footer';

export default function LoadingPage() {
  return (
    <>
      <Flex minH="95vh"
        align="center" justify="center"
        bg={useColorModeValue("default.primary", "default.primaryDark")}
      >
        <Spinner
          thickness="4px" speed="0.65s"
          color={useColorModeValue("default.text", "default.textDark")}
          size="lg"
        />
      </Flex>

      <Footer bg={useColorModeValue("default.primary", "default.primaryDark")}/>
    </>
  )
}
