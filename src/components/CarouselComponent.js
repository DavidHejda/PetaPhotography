import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Heading, Image, useBreakpointValue } from '@chakra-ui/react';

import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const CarouselComponent = ({ images }) => {
  const arrowWidthSize = useBreakpointValue({ base: '30px', md: '60px' }); // Responsive arrow size
  const arrowHeightSize = useBreakpointValue({ base: '40px', md: '80px' }); // Responsive arrow size
  const arrowPosition = useBreakpointValue({ base: '10px', md: '5px' }); // Responsive arrow position
  const textSizeHeader = useBreakpointValue({
    base: '1rem', // default value for smaller screens
    sm: '1.25rem',
    md: '1.5rem',
    lg: '2rem',
  });
  const headerMargin = useBreakpointValue({ base: '1rem', md: '4rem' });

  //Common styles for arrows
  const arrowStyles = {
    display: 'block',
    position: 'absolute',
    color: 'white',
    top: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    width: arrowWidthSize,
    height: arrowHeightSize,
  };

  // Custom arrow components using react-slick's props
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <ChevronRightIcon
        style={{
          ...arrowStyles,
          right: arrowPosition,
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <ChevronLeftIcon
        style={{
          ...arrowStyles,
          left: arrowPosition,
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    slidesToShow: 3, // Show 3 slides at a time by default
    responsive: [
      {
        breakpoint: 1024, // At 1024px viewport width or less
        settings: {
          slidesToShow: 2, // Show 2 slides
        },
      },
      {
        breakpoint: 600, // At 600px viewport width or less
        settings: {
          slidesToShow: 1, // Show 1 slide
        },
      },
    ],
  };

  return (
    <Box id="home">
      <Heading
        as="h1"
        sx={{ fontFamily: "'Ibm Plex Mono', cursive" }}
        textAlign={'center'}
        marginTop={headerMargin}
        marginBottom={headerMargin}
        fontSize={textSizeHeader}
        px={{ base: '5%', sm: 0 }} // Adjust padding for responsiveness
      >
        Existuje jen jeden způsob, jak zastavit čas...
      </Heading>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <Box
            key={idx}
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="2px" // Consistent padding for spacing
          >
            <Image
              src={img.url}
              alt={`Slide ${idx}`}
              width="100%" // Use 100% of the width for each slide
              height="100vh"
              objectFit="cover" // This will cover the area of the container with the image
              objectPosition="center" // This will center the image within the container
              sx={{
                display: 'block', // Ensures the image is a block-level element
                maxWidth: '100%', // This ensures the image is not wider than the slide
                maxHeight: '90vh', // This ensures the image is not taller than your set value
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselComponent;
