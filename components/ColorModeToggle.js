import React from 'react';
import { useColorMode, Box, Switch } from '@chakra-ui/react';

export default function ColorModeToggle(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} {...rest}/>
  )
}