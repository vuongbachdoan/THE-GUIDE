import { Box, Button, Flex, Image, Input, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { posts } from '../../../mocks/data';
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../../assets/images/student1.png';
import icons from '../../../assets/icons';
const { MailIcon, LinkedinIcon, GithubIcon } = icons;

export const PanelEditProfile = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();

    return (
        <>
            <Box
                bg={bg}
                width='100%'
                padding={6}
                borderRadius={20}
            >
                <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap={15}
                >
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Edit profile</Text>
                    <Button backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Save</Button>
                </Flex>

            </Box>
            <Flex
                flexDirection='column'
                rowGap={3}
                flex={1}
                width='100%'
            >
                <Box
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
                        width={240}
                        marginX='auto'
                    >
                        <Image src={UserAvatar} width={200} height={200} borderRadius={14} zIndex={10} />
                        <Input backgroundColor='#1E1E1E20' marginTop={3} width='100%' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='xl' placeholder='Bach Doan Vuong' />
                        <Input backgroundColor='#1E1E1E20' marginTop={3} width='100%' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='xl' placeholder='DE160256' />
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                            marginTop={3}
                        >
                            <Button padding={0} size='md' backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white' leftIcon={<MailIcon color='#FFF' width={18} height={18} />} iconSpacing={0} />
                            <Input backgroundColor='#1E1E1E20' width='fit-content' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='vuongbdde160256@fpt.edu.vn' />
                        </Flex>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                            marginTop={3}
                        >
                            <Button padding={0} size='md' backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white' leftIcon={<LinkedinIcon color='#FFF' width={18} height={18} />} iconSpacing={0} />
                            <Input backgroundColor='#1E1E1E20' width='fit-content' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='linkedin.com/in/vuongbd2007' />
                        </Flex>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                            marginTop={3}
                        >
                            <Button padding={0} size='md' backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white' leftIcon={<GithubIcon color='#FFF' width={18} height={18} />} iconSpacing={0} />
                            <Input backgroundColor='#1E1E1E20' width='fit-content' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='github.com/vuongbachdoan' />
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}