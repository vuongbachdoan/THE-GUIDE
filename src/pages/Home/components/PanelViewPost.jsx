import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import React from 'react';
import { deletePost, getMyFilteredPosts, getMyPosts } from '../../../core/services/post';
import { useSelector } from 'react-redux';
import { getUser } from '../../../core/services/user';
import { sortArrayByCreatedAt } from '../../../helper/sortArrayByCreatedAt';
import PlaceholderImage from '../../../assets/images/placeholder-1.webp';

export const PanelViewPost = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const user = useSelector((state) => state.profileData.data);
    const navigate = useNavigate();
    const [status, setStatus] = React.useState('All');
    const finalRef = React.useRef(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect(() => {
        setStatus('All');
    }, [])

    const [myPosts, setMyPosts] = React.useState([]);
    React.useEffect(() => {
        if (user) {
            loadMyPost();
        }
    }, [user]);

    const loadMyPost = () => {
        getMyPosts(user.id)
            .then((res) => {
                setMyPosts(sortArrayByCreatedAt(res));
            })
            .catch((err) => console.error(err));
    }

    React.useEffect(() => {
        filterPost();
    }, [status])
    const filterPost = () => {
        if (user) {
            getMyFilteredPosts(user.id, status)
                .then((res) => {
                    setMyPosts(sortArrayByCreatedAt(res));
                })
                .catch((err) => console.error(err));
        }
    }

    const handleDeletePost = (postId) => {
        deletePost(postId)
            .then(() => {
                loadMyPost();
                setAlertMessage('Delete post successfully!');
                onOpen();
            })
            .catch(() => {
                setAlertMessage('Fail to delete post!');
                onOpen();
            })
    }

    const handleCloseMessage = () => {
        onClose();
        setAlertMessage(null);
    }

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
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Your posts</Text>
                    <Button onClick={() => navigate('/create-post',)} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Create</Button>
                </Flex>
                <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Flex
                        flexDirection='row'
                        columnGap={5}
                        alignItems='center'
                    >
                        <Text fontSize='sm'>Filter</Text>
                        <Text>/</Text>
                        <Menu>
                            <MenuButton width='fit-content' iconSpacing={2} as={Button} paddingY={1} paddingX={2} height='fit-content' rightIcon={<FaChevronDown size={12} />}>
                                <Text fontSize='sm' textTransform='capitalize'>{status}</Text>
                            </MenuButton>
                            <MenuList
                                padding={1}
                                borderRadius={12}
                                boxShadow='xl'
                                minWidth='fit-content'
                            >
                                <MenuItem onClick={() => setStatus('All')} borderWidth={0} fontSize='sm' borderRadius={8}>All</MenuItem>
                                <MenuItem onClick={() => setStatus('published')} borderWidth={0} fontSize='sm' borderRadius={8}>Published</MenuItem>
                                <MenuItem onClick={() => setStatus('pending')} borderWidth={0} fontSize='sm' borderRadius={8}>Pending</MenuItem>
                                <MenuItem onClick={() => setStatus('rejected')} borderWidth={0} fontSize='sm' borderRadius={8}>Rejected</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

            </Box>
            <Flex
                flexDirection='column'
                rowGap={3}
                flex={1}
                width='100%'
            >
                {
                    myPosts.map((post) => (
                        <Card
                            borderWidth={0}
                            borderRadius={20}
                            boxShadow='none'
                            backgroundColor={post?.status === 'rejected' ? '#FF00002E' : bg}
                        >
                            <CardHeader>
                                <Flex spacing='4'>
                                    <Flex flex='1' gap='4'>
                                        <AvatarCreator creatorId={post?.creatorId} />

                                        <Box
                                            flex={1}
                                        >
                                            <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>{post?.subjectCode}  / {post?.title} </Heading>
                                            <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>{post?.department}</Text>
                                        </Box>
                                    </Flex>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={
                                            <IconButton
                                                variant='ghost'
                                                colorScheme='gray'
                                                aria-label='See menu'
                                                icon={<BsThreeDotsVertical />}
                                            />
                                        } iconSpacing={0} width='40px' height='40px' variant='unstyled'></MenuButton>
                                        <MenuList
                                            padding={1}
                                            borderRadius={12}
                                            boxShadow='xl'
                                            minWidth='fit-content'
                                        >
                                            <MenuItem minWidth='100px' onClick={() => navigate(`/posts/detail/${post?.id}`)} borderWidth={0} fontWeight='medium' fontSize='sm' borderRadius={8}>Read</MenuItem>
                                            <MenuItem minWidth='100px' onClick={() => navigate(`/posts/edit/${post?.id}`)} borderWidth={0} fontWeight='medium' fontSize='sm' borderRadius={8}>Edit</MenuItem>
                                            <MenuItem minWidth='100px' onClick={() => handleDeletePost(post?.id)} borderWidth={0} fontWeight='medium' fontSize='sm' borderRadius={8}>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </CardHeader>
                            <CardBody
                                paddingTop={0}
                            >
                                <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>{post?.description}</Text>
                                <Image
                                    opacity={post?.status === 'pending' ? 0.5 : 1}
                                    objectFit='cover'
                                    src={post?.cover ? post?.cover : PlaceholderImage}
                                    alt='cover image'
                                    maxHeight={240}
                                    borderRadius={15}
                                    width='100%'
                                />
                            </CardBody>
                        </Card>
                    ))
                }

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
            </Flex>
        </>
    );
}

const AvatarCreator = ({ creatorId }) => {
    const [creator, setCreator] = React.useState(null);

    React.useEffect(() => {
        getUser(creatorId)
            .then((res) => {
                setCreator(res);
            })
            .catch((err) => console.error(err))
    }, [creatorId])
    return (
        <Avatar name={creator?.username} src={creator?.avatar} />
    );
}