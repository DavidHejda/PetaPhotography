import React from 'react';
import { Box, Flex, Heading, Container, useDisclosure } from '@chakra-ui/react';
import PriceListModal from './PriceListModal';
import MobileNav from './MobileNav';
import { NavLink } from './NavLink';

const Navbar = () => {
  const {
    isOpen: isPriceListOpen,
    onOpen: onPriceListOpen,
    onClose: onPriceListClose,
  } = useDisclosure();

  // Function to handle scrolling to a section
  const scrollToSection = (sectionId, yOffsetValue) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffsetValue;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const menuItems = [
    { id: 'about', offset: -50, label: 'O mně' },
    { id: 'portfolio', offset: -100, label: 'Galerie' },
    { id: 'contact', offset: 100, label: 'Kontakt' },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      width="100%"
      zIndex="banner"
      backgroundColor="white"
    >
      <Container maxW="container.xl" display="flex" alignItems="center">
        <Heading
          as="h1"
          size="lg"
          letterSpacing={'tighter'}
          // mr={5}
          sx={{ fontFamily: "'Caveat', cursive" }}
          onClick={() => {
            scrollToSection('home');
          }}
        >
          Petr Hejda
        </Heading>
        <Flex flex={1} justify="flex-end">
          <Box display={{ base: 'none', md: 'block' }}>
            {/* <NavLink label="O mě" sectionId="about" yOffsetValue={-50} />
            <NavLink
              label="Galerie"
              sectionId="portfolio"
              yOffsetValue={-100}
            />
            <NavLink label="Kontakt" sectionId="contact" yOffsetValue={100} /> */}
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                label={item.label}
                sectionId={item.id}
                yOffsetValue={item.offset}
              />
            ))}

            <NavLink label="Ceník" onClick={onPriceListOpen} />
          </Box>
          {/* Display the hamburger menu on base and hide the full menu on md and above */}
          <Box display={{ base: 'block', md: 'none' }}>
            <MobileNav
              menuItems={menuItems}
              scrollToSection={scrollToSection}
              onPriceListOpen={onPriceListClose}
            />
          </Box>
          {/* Here is your modal component which you can style as needed */}
          <PriceListModal isOpen={isPriceListOpen} onClose={onPriceListClose} />
        </Flex>
      </Container>
    </Box>
  );
};

// const Navbar = () => {
//   const bgColor = useColorModeValue('white', 'gray.200'); // white for light mode, light gray for dark mode
//   const linkColor = useColorModeValue('gray.800', 'white'); // dark gray for light mode text, white for dark mode text

//   return (
//     <Box
//       as="nav"
//       bg={bgColor}
//       color={linkColor}
//       px={4}
//       position="fixed"
//       top={0}
//       width="100%"
//       zIndex="banner"
//     >
//       <Container maxW="container.xl" display="flex" p={2}>
//         <Flex align="center" mr={5}>
//           <Heading
//             as="h1"
//             size="lg"
//             letterSpacing={'tighter'}
//             sx={{ fontFamily: "'Indie Flower', cursive" }}
//           >
//             Petr Hejda
//           </Heading>
//         </Flex>
//         <Spacer />
//         <Box>
//           <Button as={RouterLink} to="/" mr={3} variant="ghost">
//             Home
//           </Button>
//           <Button as={RouterLink} to="/portfolio" mr={3} variant="ghost">
//             Portfolio
//           </Button>
//           <Button as={RouterLink} to="/about" mr={3} variant="ghost">
//             About
//           </Button>
//           <Button as={RouterLink} to="/contact" mr={3} variant="ghost">
//             Contact
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

export default Navbar;
