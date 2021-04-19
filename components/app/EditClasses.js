import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { updateData } from '../../lib/db';

import {
  Flex,
  Box,
  Stack,
  Button as ChakraButton,
  Code,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

export default function EditClasses({ showClassesModal, setShowClassesModal, data, setData }) {
  const toast = useToast();
  const [classesDraft, setClassesDraft] = React.useState(defaultClassesDraft());

  function defaultClassesDraft() {
    return data?.classes?.map(c => ({ ...c, id: uuidv4() })) || [];
  }
  
  function close() {
    setShowClassesModal(false);
    setClassesDraft(defaultClassesDraft());
  }

  function newClass() {
    setClassesDraft([...classesDraft, { name: "", description: "", color: "", meetingURL: "", assignmentsURL: "", id: uuidv4() }]);
  }

  function deleteClass(id) {
    setClassesDraft(classesDraft.filter(c => c.id != id));
  }

  function handleFieldChange(id, key, value) {
    setClassesDraft(classesDraft.map(c => (
      {
        id: c.id,
        name: (id === c.id && key === "name") ? value : c.name,
        description: (id === c.id && key === "description") ? value : c.description,
        color: (id === c.id && key === "color") ? value : c.color ,
        meetingURL: (id === c.id && key === "meetingURL") ? value : c.meetingURL,
        assignmentsURL: (id === c.id && key === "assignmentsURL") ? value : c.assignmentsURL,
      }
    )));
  }

  async function save() {
    const newClasses = classesDraft.map(c => ({ name: c.name, description: c.description, color: c.color, meetingURL: c.meetingURL, assignmentsURL: c.assignmentsURL }));

    // if nothing is changed
    if (data?.classes === newClasses) return setShowClassesModal(false);

    // update db
    const res = await updateData(data?.id, { ...data, classes: newClasses });

    // Error
    if (res?.error) {
      return toast({
        title: "Error",
        description: err.message,
        status: "error",
        isClosable: true,
      });
    }

    // update local classes var
    setData({ ...data, classes: newClasses });

    // close modal
    setShowClassesModal(false);
  }

  return (
    <Modal size="4xl" closeOnOverlayClick={false} isOpen={showClassesModal} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Classes</ModalHeader>
        <ModalBody>
        <Stack direction="column">
          {classesDraft.map(c => 
            <Box 
              p={2} 
              borderRadius="lg" boxShadow="sm"
              bg={useColorModeValue("default.secondary", "default.secondaryDark")} 
              key={c.id}
            >
              <Stack direction={{ base: "column", lg: "row" }}>
                <Input type="text" size="sm" placeholder="Name" value={c.name} onChange={e => handleFieldChange(c.id, "name", e.target.value)}/>
                <Input type="text" size="sm" placeholder="Description" value={c.description} onChange={e => handleFieldChange(c.id, "description", e.target.value)}/>
                <Input type="text" size="sm" placeholder="Color" value={c.color} onChange={e => handleFieldChange(c.id, "color", e.target.value)}/>
                <Input type="text" size="sm" placeholder="Meeting URL" value={c.meetingURL} onChange={e => handleFieldChange(c.id, "meetingURL", e.target.value)}/>
                <Input type="text" size="sm" placeholder="Assignments URL" value={c.assignmentsURL} onChange={e => handleFieldChange(c.id, "assignmentsURL", e.target.value)}/>
                <ChakraButton size="sm" colorScheme="blackAlpha" color="white" onClick={() => deleteClass(c.id)}>X</ChakraButton>
              </Stack>
            </Box>
          )}
          {classesDraft.length === 0 &&
            <Box align="center">
              Click <Code>New</Code> to add a class.
            </Box>
          }
        </Stack>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%">
            <Box flex={1}>
              <ChakraButton size="sm" mr={3} align="left" onClick={newClass}>New</ChakraButton>
            </Box>
            <Box>
              <ChakraButton size="sm" mr={3} onClick={close}>Cancel</ChakraButton>
              <ChakraButton size="sm" colorScheme="orange" onClick={save}>Save</ChakraButton>
            </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
