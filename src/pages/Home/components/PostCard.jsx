import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import React, { useEffect } from 'react';
import { getUser } from '../../../core/services/user';
import { getPost, updatePost } from '../../../core/services/post';
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon, ExpandIcon } = icons;

/**
 * 
 * Post Scheme
 *{
 *    "content": "Content",
 *    "department": "Software Engineering",
 *    "commentIds": null,
 *    "status": "pending",
 *    "shared": 0,
 *    "subjectCode": "Subject code",
 *    "liked": 0,
 *    "createAt": "2023-10-26T02:52:49.673Z",
 *    "updatedAt": "",
 *    "description": "",
 *    "viewed": 0,
 *    "id": "Test title-dbf5e1b7-fcca-4343-9962-74567547429d",
 *    "creatorId": "google_116711084401427871681",
 *    "title": "Test title"
 *}
 */

export const PostCard = ({ data }) => {
    const [ownerPost, setOwnerPost] = React.useState(null);
    const [isExpand, setIsExpand] = React.useState(false);
    const [postData, setPostData] = React.useState(null);

    useEffect(() => {
        if (data) {
            const postId = data.id;
            getPost(postId)
                .then((res) => {
                    setPostData(res)
                })
                .catch((err) => console.err(err))

            getUser(data.creatorId)
                .then((res) => setOwnerPost(res))
                .catch((err) => console.error(err))
        }
    }, []);

    const handleViewPost = () => {
        setIsExpand(!isExpand);
    }

    React.useEffect(() => {
        if (isExpand === true) {
            let newViewedValue = postData.viewed + 1;
            updatePost({
                ...postData,
                viewed: newViewedValue
            })
                .then((res) => {
                    setPostData(res)
                })
                .catch((err) => console.log(err))
        }
    }, [isExpand])

    return (
        <Card
            borderWidth={0}
            borderRadius={20}
            boxShadow='none'
            width='100%'
        >
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4'>
                        <Avatar name={ownerPost?.username} src={ownerPost?.avatar} />

                        <Box
                            flex={1}
                        >
                            <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>{postData?.subjectCode}  /  {postData?.title} </Heading>
                            <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>{postData?.department}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<ExpandIcon width={20} height={20} />}
                        onClick={handleViewPost}
                    />
                </Flex>
            </CardHeader>
            <CardBody
                paddingTop={0}
            >
                <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={isExpand ? 'auto' : 3} textOverflow='ellipsis'>{postData?.content}</Text>
            </CardBody>
            {
                postData?.cover &&
                <Image
                    objectFit='cover'
                    src={postData?.cover}
                    alt='cover image'
                    maxHeight={240}
                />
            }

            <CardFooter
                justifyContent='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '72px',
                    },
                }}
            >
                <Flex>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<HeartIcon width={20} height={20} />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{postData?.liked !== 0 ? postData?.liked : '_'}</Text>
                    </Button>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<CommentIcon width={20} height={20} />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{postData?.comments ? postData?.comments : '_'}</Text>
                    </Button>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<ShareIcon width={20} height={20} />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{postData?.shared !== 0 ? postData?.shared : '_'}</Text>
                    </Button>
                </Flex>
                <Flex flexDirection='row' alignItems='center' padding={1} columnGap={2}>
                    <EyeIcon width={20} height={20} />
                    <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{postData?.viewed !== 0 ? postData?.viewed : '_'}</Text>
                </Flex>
            </CardFooter>
        </Card>
    );
}