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

  // Custom arrow components using react-slick's props
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronRightIcon
        className={className}
        style={{
          ...style,
          display: 'block',
          position: 'absolute',
          top: '50%',
          color: 'white',
          zIndex: 1,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          cursor: 'pointer',
          right: arrowPosition,
          width: arrowWidthSize,
          height: arrowHeightSize,
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronLeftIcon
        className={className}
        style={{
          ...style,
          display: 'block',
          position: 'absolute',
          color: 'white',
          top: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
          transform: 'translateY(-50%)',
          // Apply additional styles as required
          cursor: 'pointer',
          left: arrowPosition,
          width: arrowWidthSize,
          height: arrowHeightSize,
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

  // <Slider {...settings}>
  //   {images.map((img, idx) => (
  //     <Box key={idx} paddingX="2px" >
  //       {/* Adjust the left and right padding as necessary */}
  //       <Image
  //         src={img}
  //         alt={`Slide ${idx}`}
  //         maxHeight="85vh"
  //         maxWidth="27vw"
  //         //   width="100%"
  //         height="auto"
  //         objectFit="cover" // This will ensure the images cover the slide area fully
  //       />
  //     </Box>
  //   ))}
  // </Slider>;

  //   return (
  //     <Slider {...settings}>
  //       {images.map((img, idx) => (
  //         <Box key={idx} paddingX="1px">
  //           <Image
  //             src={img}
  //             alt={`Slide ${idx}`}
  //             maxHeight="85vh"
  //             // maxWidth="27vw"
  //             width="100%"
  //             // height="auto"
  //           />
  //         </Box>
  //       ))}
  //     </Slider>
  //   );
  // };

  return (
    <Box id="home">
      <Heading
        as="h1"
        // letterSpacing={'tighter'}
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
