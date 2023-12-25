import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  VStack,
  Button,
  useColorModeValue,
  HStack,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import ModalGalleryComponent from './ModalGalleryComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from './Loading';
import useScreenWidth from '../hooks/useScreenWidth';

const GalleryComponent = ({ images, isGalleryLoading }) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768; // Adjust this threshold as needed
  const baseCount = isMobile ? 2 : 6;
  const [tabIndex, setTabIndex] = useState(0);

  const [displayCounts, setDisplayCounts] = useState({
    products: baseCount,
    people: baseCount,
    weddings: baseCount,
  });

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('products');

  const openModal = (imageIndex, category) => {
    setCurrentImage(imageIndex);
    setCurrentCategory(category);
    onOpen();
  };

  //***************** Tried dynamic mosaic gallery but does not work as intended - will try later **************** */
  // Define the maximum span for rows and columns
  // const maxRowSpan = 1;
  // const maxColSpan = 2;

  // // Function to get a random span size
  // const getRandomRowSpan = () => Math.ceil(Math.random() * maxRowSpan);
  // const getRandomColumnSpan = () => Math.ceil(Math.random() * maxColSpan);

  // const renderMosaicGrid = (images, category) => {
  //   // Adjust this layout for your actual image data
  //   const mosaicLayout = images
  //     .slice(0, displayCounts[category])
  //     .map((src, index) => ({
  //       src: src,
  //       // You can introduce some randomness or pattern for rowSpan/colSpan
  //       // For simplicity, this example uses a fixed span
  //       rowSpan: getRandomRowSpan(),
  //       colSpan: getRandomColumnSpan(),
  //     }));

  //   return (
  //     <VStack>
  //       <Grid
  //         templateRows="repeat(3, 1fr)"
  //         templateColumns="repeat(6, 1fr)"
  //         gap={4}
  //       >
  //         {mosaicLayout.map((image, index) => (
  //           <Box
  //             key={index}
  //             gridRow={`span ${image.rowSpan}`}
  //             gridColumn={`span ${image.colSpan}`}
  //             bg="papayawhip"
  //             p={1}
  //             position="relative"
  //           >
  //             <Image
  //               src={image.src}
  //               objectFit="cover"
  //               width="100%"
  //               height="100%"
  //             />
  //           </Box>
  //         ))}
  //       </Grid>
  //       <HStack spacing={4}>
  //         {displayCounts[category] > initialDisplayCount && (
  //           <>
  //             <Button onClick={() => showLessImages(category)}>
  //               Show Less
  //             </Button>
  //             <Button onClick={() => hideAllImages(category)}>Hide All</Button>
  //           </>
  //         )}
  //         {displayCounts[category] < images.length && (
  //           <Button onClick={() => showMoreImages(category)}>Show More</Button>
  //         )}
  //       </HStack>
  //     </VStack>
  //   );
  // };

  console.debug('images in GalleryComponent', images);

  const renderImageGrid = (images, category) => (
    <VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {images?.slice(0, displayCounts[category]).map((src, index) => (
          <Box
            key={index}
            boxSize={{ base: '90vw', sm: '400px' }}
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
            // objectFit="cover"
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
          // <Image
          //   key={index}
          //   src={src}
          //   boxSize="400px"
          //   objectFit="cover"
          //   onClick={() => openModal(index, category)}
          //   transition="transform 0.2s, box-shadow 0.2s" // Smooth transition for transform and shadow
          //   _hover={{
          //     cursor: 'zoom-in',
          //     transform: 'scale(1.05)', // Slightly increase the size of the image
          //     boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)', // Add a shadow for more depth
          //   }}
          // />
        ))}
      </SimpleGrid>
      <HStack marginTop="1rem">
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
      </HStack>
    </VStack>
  );

  // Active tab background color
  const activeBgColor = useColorModeValue('gray.200', 'gray.600');

  if (isGalleryLoading) return <Loading />;

  return (
    <Box id="portfolio" marginTop="5rem" width="95vw">
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        variant="enclosed"
        isFitted
        width="100vw"
        minHeight="95vh"
      >
        <TabList>
          <Tab _selected={{ bg: activeBgColor }}>Lidé</Tab>
          <Tab _selected={{ bg: activeBgColor }}>Svatby</Tab>
          <Tab _selected={{ bg: activeBgColor }}>Produkty</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{renderImageGrid(images?.people, 'people')}</TabPanel>
          <TabPanel>{renderImageGrid(images?.weddings, 'weddings')}</TabPanel>
          <TabPanel>
            {renderImageGrid(
              images?.products, // .products
              'products'
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModalGalleryComponent
        isOpen={isOpen}
        onClose={onClose}
        images={images && images[currentCategory]}
        currentCategory={currentCategory}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </Box>
  );
};

export default GalleryComponent;
