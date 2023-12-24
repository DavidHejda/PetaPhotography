import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

const ModalGalleryComponent = ({
  isOpen,
  onClose,
  images,
  currentImage,
  setCurrentImage,
  currentCategory,
}) => {
  const goToPrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const getTitle = () => {
    if (currentCategory === 'products') return 'Produkty';
    if (currentCategory === 'people') return 'Lidé';
    if (currentCategory === 'weddings') return 'Svatby';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.85)" />
      <ModalContent>
        <ModalHeader textAlign="center">{getTitle()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box position="relative">
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeftIcon />}
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={goToPrevious}
            />
            <Image
              src={images[currentImage]}
              maxW="100%"
              maxH="800px"
              margin="auto"
            />
            <IconButton
              aria-label="Next image"
              icon={<ChevronRightIcon />}
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={goToNext}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalGalleryComponent;
