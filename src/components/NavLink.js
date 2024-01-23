import { Link } from '@chakra-ui/react';

export const NavLink = ({ label, sectionId, yOffsetValue, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // If there's a specific onClick handler, execute it
    } else {
      // Default behavior: scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset +
          yOffsetValue;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <Link onClick={handleClick} mr={3}>
      {label}
    </Link>
  );
};
