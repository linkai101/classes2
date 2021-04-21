import React from 'react';

import {
  Box,
  Stack,
  Text,
  Link,
  Button as ChakraButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Collapse,
} from '@chakra-ui/react';

import Button from '../Button';
import EditClasses from './EditClasses';

export default function LeftMenu({ data, setData, ...rest }) {
  const [showDangerZone, setShowDangerZone] = React.useState(false);
  const [showDeletionModal, setShowDeletionModal] = React.useState(false);
  const [showClassesModal, setShowClassesModal] = React.useState(false);


  return (
    <>
      <Stack direction="column" spacing={4} {...rest}>
        <Box align="center">
          <Box maxW="420px">
            <Button>Start a Study Session</Button>
          </Box>
        </Box>
        
        <Box align="center">
          <Link 
            color={useColorModeValue("blue.500", "blue.300")} style={{ textDecoration: "none" }}
            onClick={() => setShowClassesModal(true)}
          >
            <ChakraButton size="sm" colorScheme="blackAlpha" color="white">
              Edit Classes
            </ChakraButton>
          </Link>
        </Box>

        {/* <Box align="center">
          <Text fontWeight="bold">
            Danger Zone 
            <Link ml={1} fontWeight="normal" 
              color={useColorModeValue("gray.500", "gray.400")} 
              onClick={() => setShowDangerZone(!showDangerZone)}>
                ({showDangerZone ? "condense" : "expand"})
            </Link>
          </Text>
          <Collapse in={showDangerZone} animateOpacity>
            <Box display={showDangerZone ? "block" : "none"}>
              <Text>
                <Link color={useColorModeValue("blue.500", "blue.300")} onClick={() => setShowDeletionModal(true)}>Request Account Deletion</Link>
              </Text>
            </Box>
          </Collapse>
        </Box> */}
      </Stack>

      {/* Delete Account Modal */}
      <Modal isOpen={showDeletionModal} onClose={() => setShowDeletionModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This feature has not been implemented yet!
            </Text>
            <Text mt={4}>
              Note: All user data from the beta will be reset at v1.0 release.
            </Text>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <EditClasses 
        showClassesModal={showClassesModal} 
        setShowClassesModal={setShowClassesModal} 
        data={data}
        setData={setData}
      />
    </>
  );
}
