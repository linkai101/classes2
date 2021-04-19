import React from 'react';

import {
  useColorModeValue,
} from '@chakra-ui/react';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-rickiest.css';

export default function Button({ w, children, ...rest }) {
  return (
    <AwesomeButton type={useColorModeValue("secondary", "primary")} style={{ width: w, lineHeight: 1.4 }} {...rest}>
      {children}
    </AwesomeButton>
  )
}
