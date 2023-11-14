import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { FaChevronDown, FaSearch } from "react-icons/fa";
import icons from "../../../assets/icons";
import { AnimatedLogo } from "../../../assets/icons/AnimatedLogo";
import { Auth } from "aws-amplify";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../store/search/globalSearchPost";
import { searchPosts } from "../../services/post";
const { ProfileIcon, PostIcon, SubjectIcon, NotificationIcon, CloseIcon } = icons;

export const AppHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bg = useColorModeValue('#FFF', 'gray.700');
    const logoColor = useColorModeValue('#1E1E1E', '#FFF');
    const user = useSelector((state) => state.profileData.data);

    const logOut = () => {
        Auth.signOut();
    }

    const [searchVal, setSearchVal] = React.useState('');
    const handleGlobalSearch = () => {
        searchPosts(searchVal)
            .then((res) => {
                dispatch(setSearchData(res));
                navigate('/');
            })
            .catch((err) => console.error(err));
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
                    <Avatar name='User' src={user?.avatar} />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown size={12} />} variant='unstyled'>
                            {
                                user ?
                                    user.username :
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
                            <MenuItem onClick={
                                () => navigate('/profile', {
                                    state: user.id
                                })
                            } borderRadius={15} icon={<ProfileIcon width={26} height={26} color='#A0A0A0' />}>
                                <Text fontSize='12px' fontWeight='normal' color='#A0A0A0'>Profile</Text>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/posts')} borderRadius={15} icon={<PostIcon width={26} height={26} color='#A0A0A0' />}>
                                <Text fontSize='12px' fontWeight='normal' color='#A0A0A0'>My Post</Text>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/subject')} borderRadius={15} icon={<SubjectIcon width={26} height={26} color='#A0A0A0' />}>
                                <Text fontSize='12px' fontWeight='normal' color='#A0A0A0'>Subject</Text>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/notification')} borderRadius={15} icon={<NotificationIcon width={26} height={26} color='#A0A0A0' />}>
                                <Text fontSize='12px' fontWeight='normal' color='#A0A0A0'>Notification</Text>
                            </MenuItem>
                            <MenuItem onClick={logOut} borderRadius={15} icon={<CloseIcon width={26} height={26} color='#E53E3E' />}>
                                <Text color='red.500' _hover={{ color: 'red.600' }} fontSize='sm' fontWeight='medium'>Log out</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Stack onClick={() => navigate('/')}>
                    <AnimatedLogo height={40} color={logoColor} />
                </Stack>

                <InputGroup display={{ base: 'none', md: 'flex' }} maxWidth={{ base: 175, lg: 305 }} height='44px' borderRadius={12}>
                    <Input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleGlobalSearch();
                        }
                    }} onChange={(e) => setSearchVal(e.target.value)} value={searchVal} placeholder='Search' borderRadius={12} />
                    <InputRightElement>
                        <FaSearch color='#A0A0A0' cursor='pointer' onClick={handleGlobalSearch} />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    );
}