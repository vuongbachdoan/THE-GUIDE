import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react"
import { FaChevronDown, FaSearch, FaSignOutAlt } from "react-icons/fa";
import icons from "../../../assets/icons";
const { ProfileIcon, LogoutIcon } = icons;

export const AppHeader = () => {
    const bg = useColorModeValue('#FFF', 'gray.700')
    const color = useColorModeValue('white', '#000')

    return (
        <Box
            marginX={3}
            marginY={3}
            height={72}
        >
            <Flex
                width='100%'
                padding={3}
                alignItems='center'
                justifyContent='space-between'
                bg={bg}
                borderRadius={20}
            >
                <Flex
                    alignItems='center'
                    flexDirection='row'
                    columnGap={15}
                    width={415}
                >
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown />} variant='unstyled'>
                            DE160256
                        </MenuButton>
                        <MenuList
                            padding={3}
                            borderRadius={20}
                            borderWidth={0}
                            boxShadow='xl'
                            style={{
                                transform: 'translateY(12px)'
                            }}
                        >
                            <MenuItem borderRadius={15} icon={<ProfileIcon width={40} height={40} color='#A0A0A0' />}>
                                <Text fontSize='md' fontWeight='normal' color='gray.500'>Profile</Text>
                            </MenuItem>
                            <MenuItem borderRadius={15} icon={<LogoutIcon color='#FF0000'/>}>
                                <Text color='#FF0000' fontSize='md' fontWeight='medium'>Log out</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Text fontSize='2xl' fontWeight='bold'>The Guide</Text>

                <InputGroup maxWidth={415} height='44px' borderRadius={12}>
                    <Input placeholder='Search' borderRadius={12} />
                    <InputRightElement>
                        <FaSearch color='#A0A0A0' />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    );
}