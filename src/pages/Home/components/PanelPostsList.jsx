import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { posts } from '../../../mocks/data';
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';

export const PanelPostsList = () => {
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
                    <Text fontSize='sm' fontWeight='semibold' color='gray.500'>Create your post now . . .</Text>
                    <Button onClick={() => navigate('/create-post')} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Create post</Button>
                </Flex>

            </Box>
            <Flex
                flexDirection='column'
                rowGap={3}
            >
                {
                    posts.map((post) => (
                        <PostCard data={post} />
                    ))
                }
            </Flex>
        </>
    );
}