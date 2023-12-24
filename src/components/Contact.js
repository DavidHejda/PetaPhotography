import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
} from '@chakra-ui/react';

const Contact = () => {
  return (
    <Box p={5}>
      <Heading mb={4}>Contact Me</Heading>
      <FormControl id="contact-form" mb={3}>
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Your Name" />

        <FormLabel mt={3}>Email</FormLabel>
        <Input type="email" placeholder="Your Email" />

        <FormLabel mt={3}>Message</FormLabel>
        <Textarea placeholder="Your Message" />

        <Button mt={4} colorScheme="blue" type="submit">
          Send
        </Button>
      </FormControl>
    </Box>
  );
};

export default Contact;
