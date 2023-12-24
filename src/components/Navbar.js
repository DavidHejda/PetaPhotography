import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Container,
  Link,
  useDisclosure,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import PriceListModal from './PriceListModal';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

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

  // Hamburger menu for mobile view
  const MobileNav = () => (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        aria-label="Options"
      />
      <MenuList>
        <MenuItem onClick={() => scrollToSection('about', -50)}>O mně</MenuItem>
        <MenuItem onClick={() => scrollToSection('portfolio', -100)}>
          Galerie
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('contact', 100)}>
          Kontakt
        </MenuItem>
        <MenuItem onClick={onPriceListOpen}>Ceník</MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      width="full"
      zIndex="banner"
      backgroundColor="white"
    >
      <Container maxW="container.xl" p={2} display="flex" alignItems="center">
        <Heading
          as="h1"
          size="lg"
          letterSpacing={'tighter'}
          mr={5}
          sx={{ fontFamily: "'Caveat', cursive" }}
          onClick={() => {
            scrollToSection('home');
          }}
        >
          Petr Hejda
        </Heading>
        <Flex flex={1} justify="flex-end">
          <Box display={{ base: 'none', md: 'block' }}>
            <Link onClick={() => scrollToSection('about', -50)} mr={3}>
              O mně
            </Link>
            <Link onClick={() => scrollToSection('portfolio', -100)} mr={3}>
              Galerie
            </Link>
            <Link onClick={() => scrollToSection('contact', 100)} mr={3}>
              Kontakt
            </Link>
            <Link onClick={onPriceListOpen} mr={3}>
              Ceník
            </Link>
          </Box>
          {/* Display the hamburger menu on base and hide the full menu on md and above */}
          <Box display={{ base: 'block', md: 'none' }}>
            <MobileNav />
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
