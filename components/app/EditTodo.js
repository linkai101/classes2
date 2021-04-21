import React from 'react';

import {
  Flex,
  Box,
  Stack,
  Button as ChakraButton,
  IconButton,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function EditTodo(props) {
  const {
    editTodoOpen,
    setEditTodoOpen,
    editTodoCurrent,
    todoDraft,
    setTodoDraft,
    setUnsaved,
    defaultTodoDraft,
  } = props;

  const [todo, setTodo] = React.useState();

  React.useEffect(() => {
    setTodo(todoDraft.find(t => t.id === editTodoCurrent));
  }, [editTodoCurrent])
  
  function close() {
    setEditTodoOpen(false);
  }

  function handleFieldChange(key, value) {
    setTodo(
      {
        id: todo.id,
        name: key === 'name' ? value : todo.name,
        category: key === 'category' ? value : todo.category,
        priority: key === 'priority' ? value : todo.priority,
        link: key === 'link' ? value : todo.link,
        isCompleted: key === 'isCompleted' ? value : todo.isCompleted
      }  
    );
  }

  function save() {
    setTodoDraft(todoDraft.map(t => (
      {
        id: t.id,
        name: (editTodoCurrent === t.id) ? todo.name : t.name,
        category: (editTodoCurrent === t.id) ? todo.category : t.category,
        priority: (editTodoCurrent === t.id) ? todo.priority : t.priority,
        link: (editTodoCurrent === t.id) ? todo.link : t.link,
        isCompleted: (editTodoCurrent === t.id) ? todo.isCompleted : t.isCompleted,
      }
    )));
    setUnsaved(true); // UNSAVED

    setEditTodoOpen(false);
  }

  function deleteTodo() {
    console.log('delete')
    setTodoDraft(todoDraft.filter(t => t.id != editTodoCurrent));
    setUnsaved(true); // UNSAVED

    setEditTodoOpen(false);
  }

  return (
    <Modal size="sm" closeOnOverlayClick={false} isOpen={editTodoOpen} onClose={close}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Todo</ModalHeader>
        <ModalBody>
          <Input type="text" size="md" placeholder="Name" value={todo?.name} onChange={e => handleFieldChange("name", e.target.value)}/>
          <Stack direction="row" align="center" mt={2}>
            <Select flex={2} size="sm" value={todo?.priority} onChange={e => handleFieldChange("priority", e.target.value)}>
              <option value="none">{" "}</option>
              <option value="low">!</option>
              <option value="medium">!!</option>
              <option value="high">!!!</option>
            </Select>
            <Input flex={3} type="text" size="sm" placeholder="Category" value={todo?.category} onChange={e => handleFieldChange("category", e.target.value)}/>
            <Input flex={3} type="text" size="sm" placeholder="URL" value={todo?.link} onChange={e => handleFieldChange("link", e.target.value)}/>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%">
            <Box flex={1}>
              <IconButton 
                size="sm" mr={3} align="left" 
                icon={<FontAwesomeIcon icon={faTrash}/>}
                onClick={deleteTodo}
              />
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
