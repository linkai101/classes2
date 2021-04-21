import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { parseDomain } from "parse-domain";

import { updateData } from '../../lib/db';

import EditTodo from './EditTodo';

import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Checkbox,
  Link,
  Button as ChakraButton,
  IconButton,
  Input,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Todo({ data, setData, ...rest }) {
  const toast = useToast();
  const [todoDraft, setTodoDraft] = React.useState(defaultTodoDraft());
  const [unsaved, setUnsaved] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");
  const [editTodoOpen, setEditTodoOpen] = React.useState(false);
  const [editTodoCurrent, setEditTodoCurrent] = React.useState();

  // Prevent closing while todos are unsaved
  React.useEffect(() => {
    function beforeunload(e) {
      if (unsaved) {
        e.preventDefault();
        e.returnValue = "";
        // Save when attempted to close and unsaved
        save();
        setUnsaved(false);
      }
    }

    window.addEventListener('beforeunload', beforeunload)

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    }
  }, [unsaved, todoDraft]);

  // When todo is changed (toggled/edited/created)
  React.useEffect(() => {
    if (unsaved) {
      //setTodoDraft(orderTodos(todoDraft)); // Reorder todos

      clearTimeout(saveTimeout);
      var saveTimeout = setTimeout(() => {
        save();
        setUnsaved(false);
      }, 30000);
    }
  }, [unsaved]);

  // Adds temp id to each todo
  function defaultTodoDraft() {
    return data?.todo?.map(t => ({ ...t, id: uuidv4() })) || [];
  }

  // Toggle todo item
  function toggleTodo(id, checked) {
    setTodoDraft(todoDraft.map(t => (
      {
        id: t.id,
        name: t.name,
        category: t.category,
        priority: t.priority,
        link: t.link,
        isCompleted: (id === t.id) ? (checked || !t.isCompleted) : t.isCompleted 
      }  
    )));
    setUnsaved(true); // UNSAVED
  }

  // When key pressed while typing new todo
  function addTodoKeyPress(e) {
    if (e.key === 'Enter') addTodo();
  }

  // Add new todo
  function addTodo() {
    setTodoDraft([...todoDraft, {
      id: uuidv4(),
      name: newTodo,
      category: "",
      priority: "none",
      link: "",
      isCompleted: false 
    }]);
    setNewTodo("");

    setUnsaved(true); // UNSAVED
  }

  async function save() {
    const newTodo = todoDraft.map(t => ({ name: t.name, category: t.category, priority: t.priority, link: t.link, isCompleted: t.isCompleted }));

    // if nothing is changed
    if (JSON.stringify(data?.todo) === JSON.stringify(newTodo)) return;

    // update db
    const newData = { ...data, todo: orderTodos(newTodo) };
    delete newData.id;
    
    const res = await updateData(data?.id, newData);

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
    setData({ ...data, todo: newTodo });
  }

  function clearCompletedTodos() {
    setTodoDraft(todoDraft.filter(t => !t.isCompleted));
    setUnsaved(true); // UNSAVED
  }

  return (
    <>
      <Box {...rest}>
        <Heading as="h2" size="md" align="center" my={2}>Todo</Heading>

        <Stack direction="column" maxW="384px">
          {todoDraft.map(t => 
            <Flex direction="row"
              py={1} px={2}
              borderRadius="lg" boxShadow="sm" 
              bg={useColorModeValue("default.secondary", "default.secondaryDark")}
              key={t.id}
            >
              <Checkbox 
                flex={1} colorScheme="green" align="left" pr={1} 
                isChecked={t.isCompleted} onChange={e => toggleTodo(t.id, e.target.checked)}
              >
                <Text as="span" mr={2} color={useColorModeValue("red.500", "red.200")}>
                  {t.priority === 'low' ? '!' : t.priority === 'medium' ? '!!' : t.priority === 'high' ? '!!!' : ''}
                </Text>
                {t.name}
                {t.category && <Text as="span" ml={2} color={useColorModeValue("gray.500", "gray.200")}>({t.category})</Text>}
              </Checkbox>
              
              <Box align="right">
                {t.link && 
                  <Link href={t.link} style={{ textDecoration: "none" }} isExternal>
                    <ChakraButton size="xs" colorScheme="orange">
                      {getDomain(t.link)}
                    </ChakraButton>
                  </Link>
                }
                <IconButton ml={1} align="right" 
                  icon={<FontAwesomeIcon icon={faInfoCircle}/>} 
                  size="xs"
                  colorScheme="blackAlpha" color="white" 
                  onClick={() => { setEditTodoCurrent(t.id); setEditTodoOpen(true) }}
                />
              </Box>
            </Flex>
          )}

          {todoDraft.length === 0 &&
            <Box>
              <Text fontSize="sm">all done ~ take a well deserved break!</Text>
            </Box>
          }
        </Stack>

        <Box mt={4} maxW="384px">
          <Input flex={1} 
            type="text" size="sm" placeholder="New todo..." 
            value={newTodo} onChange={e => setNewTodo(e.target.value)}
            onKeyPress={addTodoKeyPress}
          />
          <Stack direction="row" align="center">
            <Box flex={1} align="left">
              <ChakraButton mt={2} size="xs" colorScheme="red" onClick={clearCompletedTodos}>
                clear completed
              </ChakraButton>
            </Box>
            <Box flex={1} align="right">
              <ChakraButton mt={2} size="xs" colorScheme="blue" onClick={addTodo}>
                add todo
              </ChakraButton>
            </Box>
          </Stack>
        </Box>
      </Box>
      
      <EditTodo 
        editTodoOpen={editTodoOpen} setEditTodoOpen={setEditTodoOpen}
        editTodoCurrent={editTodoCurrent}
        todoDraft={todoDraft} setTodoDraft={setTodoDraft}
        setUnsaved={setUnsaved}
        defaultTodoDraft={defaultTodoDraft}
      />
    </>
  )
}

function getDomain(url) {
  const parsedDomain = parseDomain((new URL(url)).hostname);
  if (parsedDomain.domain === 'google' && parsedDomain.subDomains.length > 0)
    return parsedDomain.subDomains[parsedDomain.subDomains.length-1]; 
  return parsedDomain.domain;
}

function orderTodos(todos) {
  for (let i=0; i<todos.length; i++) {
    if (todos[i].isCompleted) {
      let temp = todos[i];
      todos.splice(i, 1);
      todos.push(temp);
    }
  }

  const priorities = ['low', 'medium', 'high']; // none priority automatically gets sorted
  for (let p=0; p<priorities.length; p++) {
    for (let i=0; i<todos.length; i++) {
      if (todos[i].isCompleted) break;
      if (todos[i].priority === priorities[p]) {
        let temp = todos[i];
        todos.splice(i, 1);
        todos.unshift(temp);
      }
    }
  }

  return todos;
}
