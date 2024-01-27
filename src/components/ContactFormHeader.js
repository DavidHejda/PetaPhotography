import { Heading } from '@chakra-ui/react';
import React from 'react';

const ContactFormHeader = () => {
  return (
    <Heading
      fontSize={{ base: '1.25rem', md: '1.45rem' }} // Adjust font size based on viewport
      mb={4}
      textAlign="center"
    >
      Máte nějaký dotaz nebo zájem o focení?
    </Heading>
  );
};

export default ContactFormHeader;
