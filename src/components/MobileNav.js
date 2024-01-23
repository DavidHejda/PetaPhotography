import { HamburgerIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import React from 'react';

const MobileNav = ({ menuItems, scrollToSection, onPriceListOpen }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        aria-label="Options"
      />
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem onClick={() => scrollToSection(item.id, item.offset)}>
            {item.label}
          </MenuItem>
        ))}
        <MenuItem onClick={onPriceListOpen}>Ceník</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MobileNav;
