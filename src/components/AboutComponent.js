import React from 'react';
import { Box, Text, Heading, Image, Flex } from '@chakra-ui/react';

const About = () => {
  const img = require('../assets/about/about_me.jpg');

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      alignItems="center"
      justifyContent="center"
      mx="auto"
      px={{ base: '5%', md: '15%' }} // Adjust padding for responsiveness
      py={{ base: '4', md: '8' }}
      // maxWidth="100vw" // Ensure it does not exceed the width of the viewport
      gap={{ base: 5, md: 10 }} // Space between items
      id="about"
      maxHeight="100vh"
      backgroundColor="gray.100"
    >
      <Box
        flex="1" // Takes up 1 part of the available space
        // maxWidth={{ md: '40%' }} // Limits the width of the text box on larger screens
        textAlign="center"
        p={3}
      >
        <Heading mb={4} fontSize={{ base: '1rem', '2xl': '2rem' }}>
          O Mě
        </Heading>
        <Text
          fontSize={{
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            '2xl': '1.75rem',
          }}
        >
          Jmenuji se Petr a jsem fotograf. Pocházím z Vysočiny ale za zakázkami
          jezdím po celé ČR. Fotím svatby, portréty, rodinné fotografie oslavy a
          produkty.
        </Text>
      </Box>
      <Box
        flex="2" // Takes up 2 parts of the available space, making the image larger
        maxWidth={{ md: '60%' }} // Allows the image box to be larger on larger screens
        position="relative" // For positioning the Instagram icon if needed
        p={3}
      >
        <Image
          src={img}
          alt="Photography image"
          objectFit="cover"
          objectPosition="center"
          width="100%"
          height="auto"
          borderRadius="md" // Optional: if you want rounded corners
        />
        {/* Position your Instagram icon here if necessary */}
      </Box>
    </Flex>
  );
};

export default About;
