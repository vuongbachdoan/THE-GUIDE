import { Box, Button, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { posts } from '../../../mocks/data';
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../../assets/images/student1.png';
import icons from '../../../assets/icons';
import { useSelector } from 'react-redux';
const {MailIcon, LinkedinIcon, GithubIcon} = icons;

export const PanelProfile = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();
    const user = useSelector((state) => state.profileData.data);

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
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Your profile</Text>
                    <Button onClick={() => navigate('edit', )} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Edit</Button>
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
                        <Image src={user?.avatar} backgroundColor='#1E1E1E20' borderRadius={20} borderWidth={0} width={200} height={200} zIndex={10} />
                        <Text marginTop={3} fontWeight='semibold' fontSize='xl'>{user?.username}</Text>
                        <Text marginY={3} fontWeight='semibold' fontSize='xl'>DE160256</Text>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                        >
                            <MailIcon width={18} height={18}/>
                            <Text fontWeight='semibold' fontSize='sm'>vuongbdde160256@fpt.edu.vn</Text>
                        </Flex>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                        >
                            <LinkedinIcon width={18} height={18}/>
                            <Text fontWeight='semibold' fontSize='sm'>{user?.linkedin !== '' ? user?.linkedin : 'linkedin/in/user'}</Text>
                        </Flex>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                        >
                            <GithubIcon width={18} height={18}/>
                            <Text fontWeight='semibold' fontSize='sm'>{user?.github !== '' ? user?.github : 'github.com/user'}</Text>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}