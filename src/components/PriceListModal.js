import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
  List,
  ListItem,
} from '@chakra-ui/react';

const PriceListModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                  Každé focení je individuální, proto vám cenu zašlu po domluvě.
                </Heading>
              </Box>

              <Box margin="auto">
                <Heading
                  as="h4"
                  size="md"
                  mb={4}
                  textAlign="center"
                  my={{ base: '1rem' }}
                >
                  SVATEBNÍ FOCENÍ
                </Heading>
                <List styleType="disc" mb={2}>
                  <ListItem>Celodenní od 15 000 Kč</ListItem>
                  <ListItem>Půldenní od 7000 Kč</ListItem>
                </List>
              </Box>
              <Box>
                <Heading
                  as="h4"
                  size="md"
                  mb={4}
                  textAlign="center"
                  my={{ base: '1rem' }}
                >
                  PORTRETNÍ FOCENÍ
                </Heading>
                <List styleType="disc" margin="auto" mb={2}>
                  <ListItem> Portrétní focení od 1500 Kč</ListItem>
                  <ListItem> Oslavy od 3000 Kč</ListItem>
                </List>
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
