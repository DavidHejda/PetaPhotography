import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import ModalGalleryComponent from './ModalGalleryComponent';
import Loading from './Loading';
import ImageGrid from './ImageGrid';

const GalleryComponent = ({ images, isGalleryLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('products');

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const openModal = (imageIndex, category) => {
    setCurrentImage(imageIndex);
    setCurrentCategory(category);
    onOpen();
  };

  console.debug(images);

  // Active tab background color
  const activeBgColor = useColorModeValue('gray.200', 'gray.600');

  if (isGalleryLoading) return <Loading />;

  //how to convert the images which are object into an array? But i would like to keep the key as well because i will be using that for name
  const imagesArray = Object.entries(images);
  console.debug('imagesArray', imagesArray);

  return (
    <Box id="portfolio" marginTop="5rem" width="full">
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        variant="enclosed"
        isFitted
        width="full"
        minHeight="95vh"
      >
        <TabList>
          <Tab _selected={{ bg: activeBgColor }}>Lidé</Tab>
          <Tab _selected={{ bg: activeBgColor }}>Svatby</Tab>
          <Tab _selected={{ bg: activeBgColor }}>Produkty</Tab>
        </TabList>
        <TabPanels>
          {Object.entries(images).map(([category, images]) => (
            <TabPanel key={category}>
              {ImageGrid({
                images,
                category,
                openModal,
              })}
            </TabPanel>
          ))}

          {/* <TabPanel>
            {ImageGrid({
              images: images?.people,
              category: 'people',
              openModal,
            })}
          </TabPanel>
          <TabPanel>
            {ImageGrid({
              images: images?.weddings,
              category: 'weddings',
              openModal,
            })}
          </TabPanel>
          <TabPanel>
            {ImageGrid({
              images: images?.products,
              category: 'products',
              openModal,
            })}
          </TabPanel> */}
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
