import { Accordion, AccordionButton, AccordionItem, Box, Flex, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import icons from "../../../assets/icons";
import DecorOrange from '../../../assets/images/decor_role_orange.png';
import UserAvatar from '../../../assets/images/student1.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { HomeIcon, PostIcon, ProfileIcon, SubjectIcon, NotificationIcon } = icons;

export const Sidebar = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();
    const user = useSelector((state) => state.profileData.data);
    const pathname = useLocation().pathname;

    const handleChangeRoute = (route) => {
        if(user) {
            navigate(route, {
                state: user.id
            });
        }
    }

    const checkRoute = (val) => {
        return pathname.includes(val);
    }

    const checkHome = () => {
        return pathname === '/';
    }

    return (
        <Flex
            flexDirection='column'
            height='100%'
            rowGap={3}
            display={{base: 'none', lg: 'flex'}}
        >
            <Box
                    width={285}
                    bg={bg}
                    borderRadius={20}
                    padding={30}
                >
                    <Accordion defaultIndex={[0]} allowMultiple border='none'>
                        <AccordionItem onClick={() => handleChangeRoute('/')} border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color={checkHome('') ? '#FF8F46' : '#A0A0A0'}><HomeIcon width={40} height={40} color={checkHome('') ? '#FF8F46' : '#A0A0A0'} /> Home</AccordionButton>
                        </AccordionItem >
                        <AccordionItem onClick={() => handleChangeRoute('/subject')} border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color={checkRoute('subject') ? '#FF8F46' : '#A0A0A0'}><SubjectIcon width={40} height={40} color={checkRoute('subject') ? '#FF8F46' : '#A0A0A0'} /> Subject</AccordionButton>
                        </AccordionItem >
                        <AccordionItem onClick={() => handleChangeRoute('/posts')} border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color={checkRoute('posts') ? '#FF8F46' : '#A0A0A0'}><PostIcon width={40} height={40} color={checkRoute('posts') ? '#FF8F46' : '#A0A0A0'} /> Post</AccordionButton>
                        </AccordionItem >
                        <AccordionItem onClick={() => handleChangeRoute('/notification')} border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color={checkRoute('notification') ? '#FF8F46' : '#A0A0A0'}>
                                <NotificationIcon width={40} height={40} color={checkRoute('notification') ? '#FF8F46' : '#A0A0A0'} stroke={bg}/>
                                Notification
                            </AccordionButton>
                        </AccordionItem >
                        <AccordionItem onClick={() => handleChangeRoute('/profile')} border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color={checkRoute('profile') ? '#FF8F46' : '#A0A0A0'}><ProfileIcon width={40} height={40} color={checkRoute('profile') ? '#FF8F46' : '#A0A0A0'} /> Profile</AccordionButton>
                        </AccordionItem >
                    </Accordion>
                </Box>

                <Box
                    width={285}
                    bg={bg}
                    borderRadius={20}
                    padding={30}
                >
                    <Flex
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                        margin='20px'
                        flexDirection='column'
                    >
                        <Image src={DecorOrange}
                            position='absolute'
                            top={0}
                            left={0}
                            width='100%'
                        />
                        <Image objectFit='cover' marginTop={30}  backgroundColor='#FAFAFA' borderWidth={0} src={user?.avatar} width={100} height={100} borderRadius={14} zIndex={10} />
                        <Text marginTop={3} fontWeight='semibold' fontSize='xl'>{user?.username ? user?.username : 'username'}</Text>
                        <Link to='/profile' state={user?.id}><Text fontSize='md' color='#FF8F46' _hover={{textDecoration: 'underline'}}>Detail</Text></Link>
                        <Text fontWeight='semibold' fontSize='md' color='gray.500' textTransform='uppercase'>{user?.userCode ? user?.userCode : 'USER CODE'}</Text>
                    </Flex>
                </Box>
        </Flex>
    );
}