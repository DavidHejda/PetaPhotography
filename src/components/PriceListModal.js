import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Heading,
  Box,
} from '@chakra-ui/react';

const PriceListModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" m>
        <ModalOverlay />
        <ModalContent minWidth="80vw">
          <ModalHeader textAlign={'center'}>
            Ceník, Kontakt a Informace k Focení
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              maxWidth={{ base: '95vw', md: '75vw' }}
              background="gray.200"
              padding={{ base: '1rem', sm: '2.5rem' }}
              margin={{ base: '0.1rem', sm: '1rem' }}
            >
              <Box>
                <Heading
                  as="h4"
                  size="md"
                  mb={4}
                  textAlign="center"
                  my={{ base: '1rem' }}
                >
                  PORTRÉTNÍ FOCENÍ
                </Heading>
                <Text mb={2} textAlign="justify">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                  soluta impedit corporis exercitationem reiciendis praesentium
                  aspernatur, nulla nisi magnam libero neque ipsum ut quas vitae
                  laborum voluptas eaque suscipit. Alias omnis atque et
                  reiciendis cumque eligendi aliquam maiores sint. Harum aliquid
                  ratione non natus cupiditate suscipit sunt! Blanditiis, porro.
                  Hic?.
                </Text>
              </Box>

              <Box>
                <Heading
                  as="h4"
                  size="md"
                  mb={4}
                  textAlign="center"
                  my={{ base: '1rem' }}
                >
                  SVATEBNÍ FOCENÍ
                </Heading>
                <Text mb={2} textAlign="justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium rerum delectus illo, odit atque, sunt quibusdam
                  sapiente modi corrupti tenetur facilis necessitatibus, nostrum
                  laboriosam dolorem ratione maxime porro nulla perspiciatis sed
                  saepe optio a! A nemo rem architecto unde laborum?
                </Text>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  size="md"
                  mb={4}
                  textAlign="center"
                  my={{ base: '1rem' }}
                >
                  PRODUKTOVÉ FOCENÍ
                </Heading>
                <Text mb={2} textAlign="justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur iure sapiente distinctio sint omnis ipsam laboriosam
                  nesciunt quibusdam inventore eaque doloribus, adipisci sed,
                  ullam eum fuga deleniti! Cum quos libero consectetur accusamus
                  eos beatae illo, mollitia qui blanditiis nemo aliquid odit ea
                  nobis minus vel! Consectetur fugit amet sequi illum?
                </Text>
              </Box>
            </Box>

            {/* ...and so on for other sections */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PriceListModal;
