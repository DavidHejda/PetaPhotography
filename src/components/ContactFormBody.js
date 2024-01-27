import {
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useContactForm from '../hooks/useContactForm';

const ContactFormBody = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  const [errors, setErrors] = useState({});

  const { handleSubmit, handleChange } = useContactForm({
    isConsentGiven,
    errors,
    setErrors,
    setIsConsentGiven,
  });

  return (
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
          <FormControl id="email" isRequired isInvalid={errors.email} flex={1}>
            <Input
              type="email"
              name="email"
              placeholder="E-mailová adresa"
              onChange={handleChange}
              bg="white"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl id="phone" isRequired isInvalid={errors.phone} flex={1}>
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
  );
};

export default ContactFormBody;
