import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { getPosts } from '../../../core/services/post';
import { useSelector } from 'react-redux';
import { sortArrayByCreatedAt } from '../../../helper/sortArrayByCreatedAt';
import { sortPostByLike } from '../../../helper/sortPostByLike';

export const PanelPostsList = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();
    const [postsData, setPostsData] = React.useState([]);
    const searchedPosts = useSelector((state) => state.searchData.data);

    React.useEffect(() => {
        getPosts()
            .then((res) => {
                // {
                //     "content": "Content",
                //     "department": "Software Engineering",
                //     "commentIds": null,
                //     "status": "pending",
                //     "shared": 0,
                //     "subjectCode": "Subject code",
                //     "liked": 0,
                //     "createAt": "2023-10-26T02:52:49.673Z",
                //     "updatedAt": "",
                //     "description": "",
                //     "viewed": 0,
                //     "id": "Test title-dbf5e1b7-fcca-4343-9962-74567547429d",
                //     "creatorId": "google_116711084401427871681",
                //     "title": "Test title"
                // }
                setPostsData(sortArrayByCreatedAt(res));
            })
    }, []);

    React.useEffect(() => {
        if (searchedPosts) {
            setPostsData(sortArrayByCreatedAt(searchedPosts));
        } else {
            getPosts()
                .then((res) => {
                    setPostsData(sortArrayByCreatedAt(res));
                })
        }
    }, [searchedPosts]);

    const [sortType, setSortType] = React.useState('time');
    React.useEffect(() => {
        if (sortType === 'time') {
            setPostsData(sortArrayByCreatedAt(postsData));
        } else if (sortType === 'like') {
            setPostsData(sortPostByLike(postsData));
        }
    }, [sortType])

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
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Create your post now</Text>
                    <Button onClick={() => navigate('/create-post')} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Create post</Button>
                </Flex>

            </Box>
            <Flex flexDirection='row' justifyContent='flex-end' width='100%' columnGap={3}>
                <Button onClick={() => setPostsData(sortPostByLike(postsData))} backgroundColor={bg} borderRadius={15} fontSize='sm'>Most Vote</Button>
                <Button onClick={() => setPostsData(sortArrayByCreatedAt(postsData))} backgroundColor={bg} borderRadius={15} fontSize='sm'>Newest</Button>
            </Flex>
            <Flex
                flexDirection='column'
                rowGap={3}
                width='100%'
            >
                {
                    postsData.map((post) => {
                        if (post?.status === 'published') {
                            return (
                                <PostCard key={post.id} postId={post.id} />
                            );
                        }
                    })
                }
            </Flex>
        </>
    );
}