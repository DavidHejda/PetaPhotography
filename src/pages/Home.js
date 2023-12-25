import { Box } from '@chakra-ui/react';
import React from 'react';
import CarouselComponent from '../components/CarouselComponent';
import About from '../components/AboutComponent';
import GalleryComponent from '../components/GalleryComponent';
import ContactForm from '../components/ContactForm';
import Loading from '../components/Loading';
import useFetchData from '../hooks/useFetchData';
import useLoadGalleryPhotos from '../hooks/useLoadGalleryPhotos';

const Home = () => {
  const { data: landingPhotos, isLoading } = useFetchData({
    url: '/UvodniFotky',
  });
  const { images, isGalleryLoading } = useLoadGalleryPhotos();

  // // Render the Loading component while the data is being fetched
  if (isLoading) {
    return <Loading />;
  }
  console.debug('images in Home are: ', images);

  // const images = [
  //   require('../data/carousel_template/carousel_1.jpg'),
  //   require('../data/carousel_template/carousel_2.jpg'),
  //   require('../data/carousel_template/carousel_3.jpg'),
  //   require('../data/carousel_template/carousel_4.jpg'),
  //   require('../data/carousel_template/carousel_5.jpg'),
  //   require('../data/carousel_template/carousel_6.jpg'),
  //   // require('./data/carousel_template/carousel_7.jpg'),
  //   // require('./data/carousel_template/carousel_8.jpg'),
  // ];

  return (
    <Box>
      <CarouselComponent images={landingPhotos[0]?.fields?.photos} />
      <About />

      {images && (
        <GalleryComponent images={images} isGalleryLoading={isGalleryLoading} />
      )}

      <ContactForm />
    </Box>
  );
};

export default Home;
