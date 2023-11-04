import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
import React from 'react';
import { createUniqueId } from '../../../helper/createUniqueId';
import { useSelector } from 'react-redux';
import { createPost, getPost, updatePost } from '../../../core/services/post';
import { updatePostCover } from '../../../core/services/photo';
import { getSubjects, getSubjectsJoined } from '../../../core/services/subject';
import { useNavigate, useParams } from 'react-router-dom';
import PlaceholderImage from '../../../assets/images/placeholder-1.webp';
const { SyncIcon } = icons;

export const PanelEditPost = () => {
    const { postId } = useParams();
    const color = useColorModeValue('#1E1E1E', '#FFF');
    const placeholderColor = useColorModeValue('gray.500', 'gray.400');
    const user = useSelector((state) => state.profileData.data);
    const finalRef = React.useRef(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const previewImageRef = React.useRef();
    const [subjects, setSubjects] = React.useState([]);
    const navigate = useNavigate();


    const [postData, setPostData] = React.useState({
        id: '',
        subjectCode: '',
        department: null,
        title: '',
        description: '',
        creatorId: user?.id ?? '',
        createAt: null,
        cover: null,
        updatedAt: '',
        content: '',
        status: 'Pending',
        liked: [],
        commentIds: [],
        shared: 0,
        viewed: 0
    });

    const fetchPostData = () => {
        if (postId) {
            getPost(postId)
                .then((res) => {
                    setPostData(res);
                    setPreviewImage(res?.cover);
                })
                .catch((err) => console.error(err));
        }
    }

    React.useEffect(() => {
        fetchPostData();
        getSubjects()
            .then((res) => setSubjects(res))
    }, []);

    const handleDepartment = (val) => {
        setPostData({
            ...postData,
            department: val
        })
    }

    const handleTitle = (val) => {
        setPostData({
            ...postData,
            title: val
        })
    }

    const handleContent = (val) => {
        setPostData({
            ...postData,
            content: val
        })
    }

    const handleSubjectCode = (val) => {
        setPostData({
            ...postData,
            subjectCode: val
        })
    }

    /**
     * 
     * @param {*} data 
     * id: requestJSON.id,
     * subjectCode: requestJSON.subjectCode,
     * department: requestJSON.department,
     * title: requestJSON.title,
     * description: requestJSON.description,
     * creatorId: requestJSON.creatorId,
     * createAt: requestJSON.createAt,
     * updatedAt: requestJSON.updatedAt,
     * content: requestJSON.content,
     * status: requestJSON.status,
     * liked: requestJSON.liked,
     * commentIds: requestJSON.commentIds,
     * shared: requestJSON.shared,
     * viewed: requestJSON.viewed
     * @returns 
     */
    const handleUpdatePost = async (status) => {
        const timeCreate = new Date();

        updatePost({
            ...postData,
            updatedAt: timeCreate,
            status: status
        })
            .then((res) => {
                setAlertMessage('Successfully update post!');
                onOpen();
                fetchPostData();
                navigate('/posts')
            })
            .catch((err) => {
                setAlertMessage('Fail to update post!');
                onOpen();
            })
    }


    const [isLoadingImage, setIsLoadingImage] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState(null);
    const handlePickerImage = (e) => {
        if (postData?.id === '') {
            setAlertMessage('Please enter title of post first!');
            onOpen();
        } else {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                setIsLoadingImage(true);
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const type = file.type.split('/')[1];

                updatePostCover(postData?.id, base64String, type)
                    .then((res) => {
                        setPreviewImage(res);
                        setIsLoadingImage(false);
                    })
                    .catch(() => {
                        onOpen();
                        setPreviewImage(null);
                        setAlertMessage('Fail to upload this image!');
                        setIsLoadingImage(false);
                    })
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    React.useEffect(() => {
        if (previewImage) {
            setPostData({
                ...postData,
                cover: previewImage
            })
        }
    }, [previewImage])

    const handleCloseMessage = () => {
        onClose();
        setAlertMessage(null);
    }

    const [subjectsAvailable, setSubjectsAvailable] = React.useState([]);
    React.useEffect(() => {
        if (user) {
            getSubjectsJoined(user.id)
                .then((res) => {
                    setSubjectsAvailable(res);
                })
                .catch((err) => console.error(err));
        }
    }, [])

    return (
        <>
            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
                ref={finalRef}
            >
                <Box marginTop={6} marginX={6}>
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Edit Post</Text>
                </Box>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' columnGap={3}>
                            <Avatar name={user?.username ? user?.username : 'username'} src={user?.avatar ? user?.avatar : ''} />

                            <Flex
                                flex={1}
                                flexDirection='column'
                                rowGap={1}
                            >
                                <Flex columnGap={3} width='100%' flexDirection='row' alignItems='center'>
                                    <Menu>
                                        <MenuButton width='180px' iconSpacing={2} as={Button} paddingY={1} paddingX={2} height='fit-content' rightIcon={<FaChevronDown size={12} />}>
                                            <Text textAlign='left' fontSize='sm'>{postData?.subjectCode ? postData?.subjectCode : 'Subject'}</Text>
                                        </MenuButton>
                                        <MenuList
                                            padding={1}
                                            borderRadius={12}
                                            boxShadow='xl'
                                            minWidth='fit-content'
                                        >
                                            {
                                                subjectsAvailable.map((subject) => (
                                                    <MenuItem onClick={() => handleSubjectCode(subject.subjectCode)} borderWidth={0} fontSize='sm' borderRadius={8}>
                                                        <Text>{subject.subjectCode}</Text>
                                                    </MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </Menu>
                                    <Text cursor='default'>/</Text>
                                    <Input value={postData.title} onChange={(e) => handleTitle(e.target.value)} padding={1} color={color} _placeholder={{ color: placeholderColor }} height={22} borderWidth={0} _focus={{ borderWidth: 0, boxShadow: 'none' }} outline='none' fontWeight='semibold' textAlign='left' placeholder='Post title' />
                                </Flex>
                                <Menu>
                                    <MenuButton width='fit-content' iconSpacing={2} as={Button} paddingY={1} paddingX={2} height='fit-content' rightIcon={<FaChevronDown size={12} />}>
                                        <Text fontSize='sm'>{postData.department ? postData.department : 'Department'}</Text>
                                    </MenuButton>
                                    <MenuList
                                        padding={1}
                                        borderRadius={12}
                                        boxShadow='xl'
                                        minWidth='fit-content'
                                    >
                                        {/* {
                                            subjectsAvailable.map((subject) => (
                                                <MenuItem onClick={() => handleDepartment(subject.subjectName)} borderWidth={0} fontSize='sm' borderRadius={8}>{subject.subjectName}</MenuItem>
                                            ))
                                        } */}
                                        {
                                            subjectsAvailable.length === 0 &&
                                            <MenuItem disabled borderWidth={0} fontSize='sm' borderRadius={8}>-You haven't joined any subject!-</MenuItem>
                                        }
                                        <MenuItem onClick={() => handleDepartment('Software Engineering')} borderWidth={0} fontSize='sm' borderRadius={8}>Software Engineering</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Artificial Intelligence')} borderWidth={0} fontSize='sm' borderRadius={8}>Artificial Intelligence</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Business')} borderWidth={0} fontSize='sm' borderRadius={8}>Bussiness</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Hospitality')} borderWidth={0} fontSize='sm' borderRadius={8}>Hospitality</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Digital Art')} borderWidth={0} fontSize='sm' borderRadius={8}>Digital Art</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Box
                        height={240}
                        borderRadius={15}
                        backgroundColor='#CCCCCC30'
                        marginBottom={3}
                        position='relative'
                    >
                        <input ref={previewImageRef} onChange={handlePickerImage} type='file' accept='image/*' name='avatar' id='avatar_picker' style={{ display: 'none' }} />

                        <Image borderRadius={15} className='after-hide' width='100%' height='100%' objectFit='cover' src={previewImage ? previewImage : PlaceholderImage} />
                        <Stack
                            position='absolute'
                            bottom={3}
                            right={3}
                            onClick={() => previewImageRef.current.click()}
                        >
                            <Button display='flex' justifyContent='center' alignItems='center' padding={0} iconSpacing={0} rightIcon={isLoadingImage ? <Spinner /> : <SyncIcon width={18} height={18} color='#1E1E1E' />} borderRadius='full' />
                        </Stack>
                    </Box>
                    <Textarea value={postData.content} onChange={(e) => handleContent(e.target.value)} borderRadius={15} minHeight={240} placeholder='Content of your post here . . .' />
                </CardBody>

                <CardFooter
                    justifyContent='flex-end'
                    flexWrap='wrap'
                    columnGap={3}
                    sx={{
                        '& > button': {
                            minW: '72px',
                        },
                    }}
                >
                    <Button onClick={() => fetchPostData()} borderRadius={15}>Cancel</Button>
                    <Button onClick={() => handleUpdatePost('pending')} borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Save</Button>
                </CardFooter>
            </Card>

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