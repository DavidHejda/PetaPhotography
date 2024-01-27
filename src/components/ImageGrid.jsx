import { Box, Button, Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useScreenWidth from '../hooks/useScreenWidth';

const ImageGrid = ({ images, category, openModal }) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768; // Adjust this threshold as needed
  const baseCount = isMobile ? 2 : 6;

  const [displayCounts, setDisplayCounts] = useState({
    products: baseCount,
    people: baseCount,
    weddings: baseCount,
  });

  const showMoreImages = (category) => {
    setDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] + baseCount,
    }));
  };
  const showLessImages = (category) => {
    setDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [category]: Math.max(baseCount, prevCounts[category] - baseCount),
    }));
  };

  const hideAllImages = (category) => {
    setDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [category]: baseCount,
    }));
  };

  return (
    <VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} spacing={5}>
        {images?.slice(0, displayCounts[category]).map((src, index) => (
          <Box
            key={index}
            boxSize={{ base: '90vw', md: '300px', lg: '400px' }}
            position="relative"
            overflow="hidden"
            display={
              index >= baseCount && index < baseCount
                ? { base: 'none', md: 'block' }
                : 'block'
            }
            boxShadow="0 0 8px rgba(0, 0, 0, 0.5)"
            _hover={{
              cursor: 'zoom-in',
              transform: 'scale(1.05)',
            }}
            onClick={() => openModal(index, category)}
            transition="transform 0.2s, box-shadow 0.2s"
          >
            <LazyLoadImage
              src={src}
              effect="blur"
              style={{
                width: '400px',
                height: '400px',
                objectFit: 'cover',
              }}
              wrapperClassName="image-wrapper"
            />
          </Box>
        ))}
      </SimpleGrid>
      <Flex
        marginTop="1rem"
        flexDirection={{ base: 'column', md: 'row' }}
        gap={2}
      >
        {displayCounts[category] > baseCount && (
          <>
            <Button onClick={() => showLessImages(category)}>
              Ukázat méně
            </Button>
            <Button onClick={() => hideAllImages(category)}>Skrýt vše</Button>
          </>
        )}
        {displayCounts[category] < images?.length && (
          <Button onClick={() => showMoreImages(category)}>Ukázat více</Button>
        )}
      </Flex>
    </VStack>
  );
};

export default ImageGrid;
