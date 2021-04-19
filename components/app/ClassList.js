import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Link,
  Button as ChakraButton,
  Code,
  useColorModeValue
} from '@chakra-ui/react';

export default function ClassList({ data, ...rest }) {  
  return (
    <>
      <Stack direction="column" {...rest}>
        {data?.classes?.map(c =>
          <Flex justify="center" key={uuidv4()}>
            <Flex 
              w="100%" maxW="384px" p={2} 
              borderRadius="lg" boxShadow="sm" 
              bg={c.color || useColorModeValue("default.secondary", "default.secondaryDark")}
              color={c.color ? getTextColor(c.color) : "auto"}
            >
              <Box pl={1}>{c.name}</Box>
              <Box flex={1} align="right">
                {c.meetingURL && 
                  <Link href={c.meetingURL} style={{ textDecoration: "none" }}>
                    <ChakraButton size="xs" colorScheme="orange" mr={2}>Meeting</ChakraButton>
                  </Link>
                }
                {c.assignmentsURL && 
                  <Link href={c.assignmentsURL} style={{ textDecoration: "none" }}>
                    <ChakraButton size="xs" colorScheme="orange">Assignments</ChakraButton>
                  </Link>
                }
              </Box>
            </Flex>
          </Flex>
        )}

        {(!data?.classes || data?.classes?.length === 0) &&
          <Box>
            <Heading size="md">Welcome to your personal study space!</Heading>
            <Text>Click on <Code>Edit Classes</Code> on the left to get started.</Text>

            <Box position="relative" w="90%" h="200px" my={4}>
              <Image src="/images/room.jpg" alt="Room" layout="fill" objectFit="contain" priority/>
            </Box>
          </Box>
        }
      </Stack>
    </>
  )
}

function getTextColor(bgHex) {
  if ((hexToRgb(bgHex).r*0.299 + hexToRgb(bgHex).g*0.587 + hexToRgb(bgHex).b*0.114) > 186)
    return "default.text";
  return "default.textDark";
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}