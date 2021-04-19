import React from 'react';

import {
  Container,
  Flex,
  Box,
  Text,
  Link,
} from '@chakra-ui/react';

import ColorModeToggle from '../components/ColorModeToggle';

const packageJson = require('../package.json');

export default function Footer({ ...rest }) {
  return (
    <Container maxW="container.xl" {...rest}>
      <Flex direction="row">
        <Box flex={1} align="left">
          <Text>v{packageJson.version} ~ by <Link href="https://linkaiwu.com" fontWeight="bold" isExternal>Linkai Wu</Link></Text>
        </Box>
        <Box flex={1} align="right">
          <Text as="span" mr={2}>dark mode</Text><ColorModeToggle/>
          <Text as="span" ml={6}>note: all data will be reset on v1.0 release</Text>
          {/* <Text as="span" ml={6}>inspired by <Link href="https://imissmycafe.com" fontWeight="bold" isExternal>imissmycafe</Link></Text> */}
        </Box>
      </Flex>
    </Container>
  );
}
