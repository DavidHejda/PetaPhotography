import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Image,
  VStack,
  Button,
  useColorModeValue,
  HStack,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import ModalGalleryComponent from './ModalGalleryComponent';
import useFetchData from '../hooks/useFetchData';
import Loading from './Loading';
import useFlatPhotos from '../hooks/useFlatPhotos';

// Dummy image data
const imageData = {
  products: [
    require('../data/carousel/carousel_1.jpg'),
    require('../data/carousel/carousel_2.jpg'),
    require('../data/carousel/carousel_3.jpg'),
    require('../data/carousel/carousel_4.jpg'),
    require('../data/carousel/carousel_5.jpg'),
    require('../data/carousel/carousel_6.jpg'),
    require('../data/carousel/carousel_7.jpg'),
    require('../data/carousel/carousel_8.jpg'),
  ],
  people: [
    require('../data/carousel_template/carousel_1.jpg'),
    require('../data/carousel_template/carousel_2.jpg'),
    require('../data/carousel_template/carousel_3.jpg'),
    require('../data/carousel_template/carousel_4.jpg'),
    require('../data/carousel_template/carousel_5.jpg'),
    require('../data/carousel_template/carousel_6.jpg'),
  ],
  weddings: [
    require('../data/carousel_template/carousel_1.jpg'),
    require('../data/carousel_template/carousel_2.jpg'),
    require('../data/carousel_template/carousel_3.jpg'),
    require('../data/carousel_template/carousel_4.jpg'),
    require('../data/carousel_template/carousel_5.jpg'),
    require('../data/carousel_template/carousel_6.jpg'),
  ],
};

const initialDisplayCount = 6;

const GalleryComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [images, setImages] = useState({});

  const [displayCounts, setDisplayCounts] = useState({
    products: initialDisplayCount,
    people: initialDisplayCount,
    weddings: initialDisplayCount,
  });

  const { data: productData, isProductsLoading } = useFetchData({
    url: '/Produkty',
  });

  const { flattenPhotos: productPhotos } = useFlatPhotos({ data: productData });

  useEffect(() => {
    setImages((prevImageData) => ({
      ...imageData,
      ...prevImageData,
      products: productPhotos,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  console.debug('images are: ', images);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const showMoreImages = (category) => {
    setDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] + 6,
    }));
  };
  const showLessImages = (category) => {
    setDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [category]: Math.max(initialDisplayCount, prevCounts[category] - 6),
    }));
  };

  const hideAllImages = (category) => {
    setDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [category]: initialDisplayCount,
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

  const renderImageGrid = (images, category) => (
    <VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {images.slice(0, displayCounts[category]).map((src, index) => (
          <Image
            key={index}
            src={src}
            boxSize="400px"
            objectFit="cover"
            onClick={() => openModal(index, category)}
            transition="transform 0.2s, box-shadow 0.2s" // Smooth transition for transform and shadow
            _hover={{
              cursor: 'zoom-in',
              transform: 'scale(1.05)', // Slightly increase the size of the image
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)', // Add a shadow for more depth
            }}
          />
        ))}
      </SimpleGrid>
      <HStack marginTop="1rem">
        {displayCounts[category] > initialDisplayCount && (
          <>
            <Button onClick={() => showLessImages(category)}>
              Ukázat méně
            </Button>
            <Button onClick={() => hideAllImages(category)}>Skrýt vše</Button>
          </>
        )}
        {displayCounts[category] < images.length && (
          <Button onClick={() => showMoreImages(category)}>Ukázat více</Button>
        )}
      </HStack>
    </VStack>
  );

  // Active tab background color
  const activeBgColor = useColorModeValue('gray.200', 'gray.600');

  if (isProductsLoading) return <Loading />;

  return (
    <Box id="portfolio" marginTop="5rem">
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        variant="enclosed"
        isFitted
        w="full"
        minHeight="95vh"
      >
        <TabList>
          <Tab _selected={{ bg: activeBgColor }}>Lidé</Tab>
          <Tab _selected={{ bg: activeBgColor }}>Svatby</Tab>
          <Tab _selected={{ bg: activeBgColor }}>Produkty</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{renderImageGrid(imageData.people, 'people')}</TabPanel>
          <TabPanel>{renderImageGrid(imageData.weddings, 'weddings')}</TabPanel>
          <TabPanel>
            {renderImageGrid(
              imageData.products, // .map((productImage) => productImage.url)
              'products'
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModalGalleryComponent
        isOpen={isOpen}
        onClose={onClose}
        images={imageData[currentCategory]}
        currentCategory={currentCategory}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </Box>
  );
};

export default GalleryComponent;
