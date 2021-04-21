import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { parseDomain } from "parse-domain";

import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Image,
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
              <Box flex={1} px={1} align="left">
                <Text>{c.name}</Text>
                <Text fontSize="sm">{c.description}</Text>
              </Box>
              <Box align="right">
                {c.link1 && 
                  <Link href={c.link1} style={{ textDecoration: "none" }} isExternal>
                    <ChakraButton size="xs" colorScheme="orange" mr={2}>
                      {getDomain(c.link1)}
                    </ChakraButton>
                  </Link>
                }
                {c.link2 && 
                  <Link href={c.link2} style={{ textDecoration: "none" }} isExternal>
                    <ChakraButton size="xs" colorScheme="orange">
                      {getDomain(c.link2)}
                    </ChakraButton>
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

            <Image src="/images/room.jpg" alt="Room" w="80%" maxW="400px" my={4}/>
          </Box>
        }
      </Stack>
    </>
  )
}

function getTextColor(bgHex) {
  try {
    if ((hexToRgb(bgHex).r*0.299 + hexToRgb(bgHex).g*0.587 + hexToRgb(bgHex).b*0.114) > 186)
      return "default.text";
    return "default.textDark";
  } catch (err) {
    return "auto";
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getDomain(url) {
  const parsedDomain = parseDomain((new URL(url)).hostname);
  if (parsedDomain.domain === 'google' && parsedDomain.subDomains.length > 0)
    return parsedDomain.subDomains[parsedDomain.subDomains.length-1]; 
  return parsedDomain.domain;
}