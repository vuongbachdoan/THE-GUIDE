import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react"
import { FaChevronDown, FaSearch } from "react-icons/fa";
import icons from "../../../assets/icons";
import { AnimatedLogo } from "../../../assets/icons/AnimatedLogo";
import { Auth } from "aws-amplify";
import React from "react";
import useGetGoogleProfile from "../../../hooks/useGetGoogleProfile";
import { useNavigate } from "react-router-dom";
import Lambda from 'aws-sdk/clients/lambda';
import { jwtDecodeProfile } from "../../../helper/jwtDecodeProfile";
const { ProfileIcon, LogoutIcon } = icons;

export const AppHeader = () => {
    const navigate = useNavigate();
    const bg = useColorModeValue('#FFF', 'gray.700');
    const logoColor = useColorModeValue('#1E1E1E', '#FFF');

    const { userProfile } = useGetGoogleProfile()

    const logOut = () => {
        Auth.signOut();
    }

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
                    width={{ base: 175, lg: 305 }}
                >
                    <Avatar name='User' src={userProfile?.profile} />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown size={12} />} variant='unstyled'>
                            {
                                userProfile ?
                                    userProfile.name :
                                    'username'
                            }
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
                            <MenuItem onClick={logOut} borderRadius={15} icon={<LogoutIcon color='#FF0000' />}>
                                <Text color='#FF0000' fontSize='md' fontWeight='medium'>Log out</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <AnimatedLogo height={40} color={logoColor} />

                <InputGroup display={{ base: 'none', md: 'flex' }} maxWidth={{ base: 175, lg: 305 }} height='44px' borderRadius={12}>
                    <Input placeholder='Search' borderRadius={12} />
                    <InputRightElement>
                        <FaSearch color='#A0A0A0' />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    );
}