import React from 'react';

import {
  Box,
  Stack,
  Text,
  Link,
  Button as ChakraButton,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';

//import Button from '../Button';
import EditClasses from './EditClasses';

export default function LeftMenu({ data, setData, ...rest }) {
  const [showDeletionModal, setShowDeletionModal] = React.useState(false);
  const [showClassesModal, setShowClassesModal] = React.useState(false);

  const [site, setSite] = React.useState("https://imissmycafe.com");

  return (
    <>
      <Stack direction="column" spacing={4} {...rest}>
        {/* <Box align="center">
          <Box maxW="420px">
            <Link style={{ textDecoration: "none" }} href="/study">
              <Button>Start a Study Session</Button>
            </Link>
          </Box>
        </Box> */}
        
        <Box align="center">
          <Select size="sm" value={site} onChange={e => setSite(e.target.value)} my={4}>
            <option value="">None</option>
            <option value="https://imissmycafe.com">imissmycafe.com</option>
            <option value="https://imissmybar.com">imissmybar.com</option>
            <option value="https://imisstheoffice.eu">imisstheoffice.eu</option>
            <option value="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1">don't click me</option>
          </Select>
          {site &&
            <Box my={4} h="300px">
              <iframe src={site} title={site} height="100%"/>
            </Box>
          }

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
