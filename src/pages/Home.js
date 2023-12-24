import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import About from '../components/AboutComponent';
import GalleryComponent from '../components/GalleryComponent';
import ContactForm from '../components/ContactForm';
import Loading from '../components/Loading';
import useFetchData from '../hooks/useFetchData';

const Home = () => {
  const { data: landingPhotos, isLoading } = useFetchData({
    url: '/UvodniFotky',
  });

  // // Render the Loading component while the data is being fetched
  if (isLoading) {
    return <Loading />;
  }

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

      <GalleryComponent />

      <ContactForm />
    </Box>
  );
};

export default Home;
