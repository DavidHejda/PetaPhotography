import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Box,
  Heading,
  Flex,
  Center,
  Checkbox,
  FormErrorMessage,
  Stack,
  VStack,
} from '@chakra-ui/react';

const ContactForm = () => {
  const toast = useToast();
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const formspreeEndpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Prosím, vyplňte jméno a příjmení.';
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Prosím, vyplňte e-mailovou adresu.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Prosím, vyplňte platnou e-mailovou adresu.';
    }
    if (!formData.phone) newErrors.phone = 'Prosím, vyplňte telefoní číslo.';
    if (!formData.message) newErrors.message = 'Prosím, vyplňte zprávu.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Also clear the error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!isConsentGiven) {
      toast({
        title: 'Chybějící souhlas',
        description:
          'Prosím, zaškrtněte souhlas se zpracováním osobních údajů.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: 'Zpráva odeslána.',
            description:
              'Obdržel jsem vaši zprávu a pokusím se ozvat co nejdříve.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          e.target.reset(); // Reset the form after submission
          setIsConsentGiven(false); // Reset the consent checkbox
        } else {
          response.json().then((data) => {
            toast({
              title: 'Nastala chyba',
              description:
                'Nepodařilo se odeslat zprávu. Zkuste to prosím později.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: 'Unable to send message.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      margin="auto"
      marginTop="15vh"
      paddingBottom="27vh"
      bg="gray.400"
      id="contact"
      paddingX={4} // Add padding on the X-axis for smaller screens
    >
      <Box
        maxWidth={{ base: '90vw', sm: '80vw', md: '65vw', lg: '35vw' }} // Adjust max width based on viewport
        margin="auto"
        paddingTop="5vh"
        p={5}
        borderRadius="md"
        // Set the background color to white for the form container
      >
        <Heading
          fontSize={{ base: '1.25rem', md: '1.45rem' }} // Adjust font size based on viewport
          mb={4}
          textAlign="center"
        >
          Máte nějaký dotaz nebo zájem o focení?
        </Heading>
        <form onSubmit={handleSubmit} noValidate>
          <VStack spacing={4}>
            <FormControl id="name" isRequired isInvalid={!!errors.name}>
              <Input
                type="text"
                name="name"
                placeholder="Jméno a přijmení"
                onChange={handleChange}
                bg="white"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              width="100%"
              spacing={3}
            >
              <FormControl
                id="email"
                isRequired
                isInvalid={errors.email}
                flex={1}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mailová adresa"
                  onChange={handleChange}
                  bg="white"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="phone"
                isRequired
                isInvalid={errors.phone}
                flex={1}
              >
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Telefoní číslo"
                  onChange={handleChange}
                  bg="white"
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
            </Stack>
            <FormControl id="message" isRequired isInvalid={errors.message}>
              <Textarea
                name="message"
                placeholder="Napište mi, co bych mohl pro vás udělat..."
                onChange={handleChange}
                height="150px"
                bg="white"
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="consent">
              <Checkbox
                isChecked={isConsentGiven}
                onChange={(e) => setIsConsentGiven(e.target.checked)}
              >
                Souhlasím se zpracováním osobních údajů
              </Checkbox>
            </FormControl>
            <Center width="100%">
              <Button
                colorScheme="blue"
                type="submit"
                isDisabled={!isConsentGiven}
                width={{ base: 'full', sm: 'auto' }} // Button full width on small screens, auto on larger screens
              >
                Odeslat zprávu
              </Button>
            </Center>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
