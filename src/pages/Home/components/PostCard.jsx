import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import React, { useEffect } from 'react';
import { getUser } from '../../../core/services/user';
import { approvePost, getPost, likePost, updatePost } from '../../../core/services/post';
import { Comment } from './Comment';
import { createComment } from '../../../core/services/comment';
import { useSelector } from 'react-redux';
import { mappingNotification } from '../../../helper/mappingNotification';
import PlaceholderImage from '../../../assets/images/placeholder.png';
import { FacebookShareButton, FacebookShareCount } from 'react-share';
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon, ExpandIcon, HappyIcon, SendIcon, ATIcon } = icons;

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

export const PostCard = ({ postId }) => {
    const [ownerPost, setOwnerPost] = React.useState(null);
    const [isExpand, setIsExpand] = React.useState(false);
    const user = useSelector((state) => state.profileData.data);
    const bg = useColorModeValue('#FFF', 'gray.700');

    const [postData, setPostData] = React.useState(null);

    useEffect(() => {
        loadPostData();
    }, [])

    const loadPostData = () => {
        getPost(postId)
            .then((postDetail) => {
                setPostData(postDetail)
                getUser(postDetail.creatorId)
                    .then((ownerDetail) => setOwnerPost(ownerDetail))
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.err(err))
    }

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
    }, [isExpand]);

    const [commentValue, setCommentValue] = React.useState('');
    const handleComment = (val) => {
        setCommentValue(val);
    }

    const handleSendComment = () => {
        if (commentValue) {
            const createTime = new Date();
            const uniqueId = `${createTime.getTime().toString()}${createTime.getFullYear()}`.toString();

            createComment({
                id: uniqueId,
                postId: postData.id,
                creatorId: user.id,
                content: commentValue,
                liked: 0,
                disliked: 0,
                replyTo: '',
                createAt: `${createTime.toISOString()}`,
                updatedAt: '',
            })
                .then(() => {
                    loadPostData();
                    setCommentValue('');
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    const [isExpandComment, setIsExpandComment] = React.useState(false);

    const handleEnterCommemt = (val) => {
        if (val === 'Enter') {
            handleSendComment();
        }
    }

    const handleLikePost = (postData) => {
        likePost(postData?.id, user?.id)
            .then((res) => {
                if (res == -1) {
                    mappingNotification(
                        'post_change',
                        `${user?.username} liked on your post!`,
                        postData?.creatorId,
                        postId
                    );
                }
                loadPostData();
            })
            .catch((err) => console.error(err));
    }

    const handleApprovePost = (id, type) => {
        approvePost(id, { accept: type === 'APPROVE' })
            .then((res) => {
                setAlertMessage(`Post ${res}!`);
                onOpen();
                loadPostData();
            })
            .catch(() => {
                setAlertMessage('Please wait a while and try again!');
                onOpen();
            })
    }


    const finalRef = React.useRef(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleCloseMessage = () => {
        onClose();
        setAlertMessage(null);
    }

    return (
        <>
            <Card
                ref={finalRef}
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
                backgroundColor={postData?.status === 'rejected' ? '#FF00002E' : bg}
            >
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4'>
                            <Avatar name={ownerPost?.username} src={ownerPost?.avatar} />

                            <Box
                                flex={1}
                            >
                                <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={isExpand ? 'auto' : 1} textOverflow='ellipsis'>{postData?.subjectCode}  /  {postData?.title} </Heading>
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
                <Image
                    objectFit='cover'
                    src={postData?.cover ? postData?.cover : PlaceholderImage}
                    alt='cover image'
                    maxHeight={240}
                    opacity={postData?.status === 'pending' ? 0.5 : 1}
                />
                {
                    isExpand &&
                    <CardBody
                        paddingTop={0}
                    >
                        <Box textAlign='left' className='ignore_lib' style={{ fontFamily: 'monospace' }} dangerouslySetInnerHTML={{ __html: postData?.content }}></Box>
                    </CardBody>
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
                    {
                        postData?.status === 'published' &&
                        <>
                            <Flex>
                                <Button onClick={() => handleLikePost(postData)} width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<HeartIcon color={postData?.liked.length !== 0 ? 'red' : '#A0A0A0'} width={20} height={20} />}>
                                    <Text fontSize='small' marginRight={3} fontWeight='normal' color='gray.500'>{postData?.liked?.length !== 0 ? postData?.liked?.length : '_'}</Text>
                                </Button>
                                <Button onClick={() => setIsExpandComment(!isExpandComment)} width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<CommentIcon width={20} height={20} />}>
                                    <Text fontSize='small' marginRight={3} fontWeight='normal' color='gray.500'>{postData?.commentIds?.length !== 0 ? postData?.commentIds?.length : '_'}</Text>
                                </Button>
                                <FacebookShareButton url={`https://www.docs.rapify-cloud.com/posts/detail/${postData?.subjectCode}`}>
                                    <ShareIcon width={20} height={20} />
                                </FacebookShareButton>
                            </Flex>
                            <Flex flexDirection='row' alignItems='center' padding={1} columnGap={2}>
                                <EyeIcon width={20} height={20} />
                                <Text fontSize='small' marginRight={3} fontWeight='normal' color='gray.500'>{postData?.viewed !== 0 ? postData?.viewed : '_'}</Text>
                            </Flex>
                        </>
                    }

                    {
                        (postData?.status === 'pending' || postData?.status === 'rejected') &&
                        <Flex flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'>
                            <Text fontSize='x-small' color='gray.500' fontWeight='semibold'>{postData?.status === 'pending' ? 'This post is waiting to be published!' : 'This post has been rejected!'}</Text>
                            <Box flex={1}></Box>
                            {
                                (user?.role === 'Lecture' || user?.role === 'Admin') &&
                                <Flex
                                    flexDirection='row'
                                    columnGap={3}
                                >
                                    <Button onClick={() => handleApprovePost(postData?.id, 'APPROVE')} fontSize='small' width={100} borderRadius={15}>Approve</Button>
                                    {
                                        postData?.status !== 'rejected' &&
                                        <Button onClick={() => handleApprovePost(postData?.id, 'REJECT')} fontSize='small' colorScheme='red' width={100} borderRadius={15}>Reject</Button>
                                    }
                                </Flex>
                            }
                        </Flex>
                    }
                </CardFooter>
            </Card>

            <Modal scrollBehavior='inside' closeOnOverlayClick={false} isOpen={isExpandComment} onClose={() => setIsExpandComment(false)}>
                <ModalOverlay />
                <ModalContent
                    borderRadius={20}
                    overflow='hidden'
                >
                    <ModalHeader>Comments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={3} px={3}>
                        {
                            (postData?.commentIds?.length !== 0) &&
                            postData?.commentIds?.map((commentId) => (
                                <Comment data={commentId} />
                            ))
                        }

                        <Card
                            borderWidth={0}
                            borderRadius={20}
                            boxShadow='none'
                            width='100%'
                        >
                            <Flex
                                flexDirection='row'
                                alignItems='flex-start'
                                columnGap={3}
                                paddingX={5}
                                paddingTop={5}
                                paddingBottom={3}
                            >
                                <Avatar src={user?.avatar} />
                                <Textarea
                                    value={commentValue}
                                    placeholder="Write a comment..."
                                    fontSize='sm'
                                    borderRadius={15}
                                    onChange={(e) => handleComment(e.target.value)}
                                    onKeyDown={(e) => handleEnterCommemt(e.key)}
                                />
                                <Button onClick={handleSendComment} variant='ghost' borderRadius={10} width='40px' padding={0} height='40px' leftIcon={<SendIcon width={20} height={20} />} iconSpacing={0}></Button>
                            </Flex>
                        </Card>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal closeOnOverlayClick={false} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    borderRadius={20}
                >
                    <ModalHeader>Message</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='semibold' fontSize='sm'>{alertMessage}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button borderRadius={15} width='100px' colorScheme='red' onClick={handleCloseMessage}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}