import React, { ReactNode } from 'react'
import Link from 'next/link'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Heading,
  VStack,
  Icon,
  useColorModeValue,
  Link as LinkChakra,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiShoppingBag,
  FiCompass,
  FiStar,
  FiSettings,
  FiMap,
  FiMenu,
  FiBell,
  FiClock,
  FiChevronDown,
  FiCornerLeftDown,
} from 'react-icons/fi'
import {
  GiBackpack,
  GiTrumpetFlag,
  GiTreasureMap,
  GiShoppingBag,
  GiFairyWand,
  GiAbstract076,
  GiTalk,
  GiShop,
  GiShoppingCart,
} from 'react-icons/gi'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import Chat from './Chat/Chat'
import { IconType } from 'react-icons'

interface LinkItemProps {
  name: string
  icon: IconType
  url?: string
}
const LinkItems: Array<LinkItemProps> = [
  // { name: 'Home', icon: FiHome, url: '/game' },
  { name: 'Profil', icon: GiTrumpetFlag, url: '/game' },
  { name: 'Polowanie', icon: GiTreasureMap, url: '/game/explore' },
  { name: 'Księga Czarów', icon: GiFairyWand, url: '/game/magic-book' },
  { name: 'Poszukiwania', icon: GiTreasureMap, url: '/game/treasures' },
  {
    name: 'Ekwipunek',
    icon: GiBackpack,
    url: '/game/equipment',
  },
  { name: 'Zadania', icon: GiTalk, url: '/game/quests' },
  // { name: 'Fragmenty', icon: FiMap },
  // { name: 'Praca', icon: FiClock },

  { name: 'Sklep', icon: GiShop, url: '/game/shop' },
  { name: 'Ranking', icon: FiTrendingUp, url: '/game/highscores' },

  // { name: 'Market', icon: FiStar, url: '/game/market' },

  // { name: 'Wyloguj', icon: FiCornerLeftDown },
]

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [sendLogout] = useSendLogoutMutation()
  return (
    <Box
      // transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
      // display={{ md: 'block' }}
      flexDirection={'column'}
    >
      <Flex height='100%' direction='column'>
        <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
          <Heading fontSize='xl' fontWeight='bold'>
            The End Of Days
          </Heading>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} to={link.url ?? ''} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
        <NavItem
          onClick={() => sendLogout()}
          key={'logout'}
          icon={FiCornerLeftDown}
        >
          Wyloguj się
        </NavItem>
        <Chat />
      </Flex>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  to?: string
  children: any
}
const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => {
  console.log('window.location.href', window.location.href)
  console.log('to', to)
  const path = window?.location?.pathname?.split('/')[2]

  return to ? (
    <Link
      href={to}
      style={{ textDecoration: 'none' }}
      // _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        // textUnderlineOffset={}
        cursor='pointer'
        boxShadow={
          to.includes(path) || window?.location?.pathname === to
            ? 'inset rgba(20, 200, 150, 0.2) 0px 7px 29px 0px;'
            : 'none'
        }
        _hover={{
          // bg: 'cyan.400',
          bg: 'rgba(0,0,0, 0.1)',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  ) : (
    <Flex
      align='center'
      p='4'
      mx='4'
      borderRadius='lg'
      role='group'
      cursor='pointer'
      _hover={{
        // bg: 'cyan.400',
        bg: 'gray.800',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr='4'
          fontSize='16'
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='lg'
        fontFamily='monospace'
        fontWeight='bold'
      >
        The End Of Days
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>Justina Clark</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
