import { Accordion, AccordionButton, AccordionItem, Box, Flex, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import icons from "../../../assets/icons";
import DecorOrange from '../../../assets/images/decor_role_orange.png';
import UserAvatar from '../../../assets/images/student1.png';
import { Link } from "react-router-dom";
const { HomeIcon, PostIcon, ProfileIcon, SubjectIcon, NotificationIcon } = icons;

export const Sidebar = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');

    return (
        <Flex
            flexDirection='column'
            height='100%'
            rowGap={3}
        >
            <Box
                    width={285}
                    bg={bg}
                    borderRadius={20}
                    padding={30}
                >
                    <Accordion defaultIndex={[0]} allowMultiple border='none'>
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#FF8F46'><HomeIcon width={40} height={40} color='#FF8F46' /> Home</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><SubjectIcon width={40} height={40} color='#A0A0A0' /> Subject</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><PostIcon width={40} height={40} color='#A0A0A0' /> Post</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'>
                                <NotificationIcon width={40} height={40} color='#A0A0A0' stroke={bg}/>
                                Notification
                            </AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><ProfileIcon width={40} height={40} color='#A0A0A0' /> Profile</AccordionButton>
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
                        <Image marginTop={30} src={UserAvatar} width={100} height={100} borderRadius={14} zIndex={10} />
                        <Text marginTop={3} fontWeight='semibold' fontSize='xl'>Bach Doan Vuong</Text>
                        <Link to='/profile'><Text fontSize='md' color='#FF8F46' _hover={{textDecoration: 'underline'}}>Detail</Text></Link>
                        <Text fontWeight='semibold' fontSize='md' color='gray.500'>DE160256</Text>
                    </Flex>
                </Box>
        </Flex>
    );
}