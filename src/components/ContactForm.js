import React from 'react';
import { Box } from '@chakra-ui/react';
import ContactFormHeader from './ContactFormHeader';
import ContactFormBody from './ContactFormBody';

const ContactForm = () => {
  return (
    <Box
      margin="auto"
      marginTop="15vh"
      paddingBottom="27vh"
      bg="gray.400"
      id="contact"
      paddingX={4}
    >
      <Box
        maxWidth={{ base: '90vw', sm: '80vw', md: '65vw', lg: '35vw' }} // Adjust max width based on viewport
        margin="auto"
        paddingTop="5vh"
        p={5}
        borderRadius="md"
      >
        <ContactFormHeader />
        <ContactFormBody />
      </Box>
    </Box>
  );
};

export default ContactForm;
