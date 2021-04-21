import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advanced  from 'dayjs/plugin/advancedFormat';

import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);

export default function Clock({ ...rest }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    var timeInterval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearTimeout(timeInterval);
    }
  }, []);

  return (
    <Box align="center" {...rest}>
      <Heading as="h1" size="2xl">{dayjs(time).format('h:mm A')}</Heading>
      <Text fontWeight="bold" fontSize="lg">{dayjs(time).tz(dayjs.tz.guess()).format('dddd, MMMM D (z)')}</Text>
    </Box>
  )
}
