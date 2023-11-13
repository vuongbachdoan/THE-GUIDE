import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, Textarea, useClipboard, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import { FaChevronDown, FaRemoveFormat } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import React from 'react';
import { createUniqueId } from '../../../helper/createUniqueId';
import { useSelector } from 'react-redux';
import { createPost } from '../../../core/services/post';
import { updatePostCover } from '../../../core/services/photo';
import { getSubject, getSubjects, getSubjectsJoined } from '../../../core/services/subject';
import { useNavigate } from 'react-router-dom';
import PlaceholderImage from '../../../assets/images/placeholder.png';
import { converTextToHTML } from '../../../helper/converTextToHTML';
import { Bold, Code, Delete, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, ListX, Quote, SendIcon, Trash, Underline } from 'lucide-react';
import { AIChat } from '../../../core/services/ai';
import { driver } from 'driver.js';
import ClaudeIcon from '../../../assets/images/claude_icon.jpeg';
import { BiMailSend, BiTrash, BiTrashAlt } from 'react-icons/bi';
import { validatePostContent } from '../../../helper/validatePostContent';
import { trackOrSetValue } from '@testing-library/user-event/dist/types/document/trackValue';
const { SyncIcon } = icons;

export const PanelCreatePost = () => {
    const color = useColorModeValue('#1E1E1E', '#FFF');
    const placeholderColor = useColorModeValue('gray.500', 'gray.400');
    const btnEditorBg = useColorModeValue('gray.400', 'gray.800');
    const btnEditorText = useColorModeValue('gray.100', 'gray.600');
    const claudeText = useColorModeValue('#785A46', '#CA9877');
    const user = useSelector((state) => state.profileData.data);
    const finalRef = React.useRef(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const previewImageRef = React.useRef();
    const navigate = useNavigate();
    const [currentVariant, setCurrentVariant] = React.useState('p');
    const [inputValue, setInputValue] = React.useState('');
    const [htmlContent, setHtmlContent] = React.useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the addition of a new line in contentEditable on Enter
            setHtmlContent(prevHtmlContent => prevHtmlContent + converTextToHTML(inputValue, currentVariant));
            setPostData({
                ...postData,
                content: htmlContent + converTextToHTML(inputValue, currentVariant)
            })
            setInputValue('');
        }
    }

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

    React.useEffect(() => {
        if (user) {
            if (user.subjects === 0) {
                setAlertMessage('Please join a subject before create post!');
                onOpen();
            } else {
                handleGetSubjectsJoined(user?.id)
                    .then((res) => {
                        setSubjectsAvailable(res);
                    })
                    .catch((err) => console.error(err));
            }
        }
    }, []);

    const [isShowGuider, setIsShowGuider] = React.useState(false);
    React.useEffect(() => {
        if (isShowGuider) {
            const driverObj = new driver({
                popoverClass: "driverjs-theme",
                stagePadding: 4,
            });
            driver.defineSteps([
                {
                    element: '#text-field__content',
                    popover: {
                        title: 'Content field',
                        description: 'Enter new content, then hit enter to add it in document.',
                    },
                },
                {
                    element: '#text-field__tool-bar',
                    popover: {
                        title: 'Tool bar',
                        description: 'Style your text with this tool bar.',
                    },
                },
                {
                    element: '#text-field__ai',
                    popover: {
                        title: 'AI tool',
                        description: 'Claude AI help you easier create content.',
                    },
                },
            ]);
            driver.start();
        }
    }, [isShowGuider])

    React.useEffect(() => {
        if (user) {
            if (user.subjects === 0) {
                setAlertMessage('Please join a subject before create post!');
                onOpen();
            } else {
                handleGetSubjectsJoined(user?.id)
                    .then((res) => {
                        setSubjectsAvailable(res);
                    })
                    .catch((err) => console.error(err));
            }
        }
    }, [user?.id]);

    const handleTitle = (val) => {
        setPostData({
            ...postData,
            title: val
        })
    }

    const handleContent = () => {
        setPostData({
            ...postData,
            content: `${htmlContent}`
        })
    }

    const handleSubjectCode = (val) => {
        setPostData({
            ...postData,
            subjectCode: val
        })
    }

    React.useEffect(() => {
        getSubject(postData.subjectCode)
            .then((res) => {
                setPostData({
                    ...postData,
                    department: res.department
                })
            })
            .catch((err) => console.error(err));
    }, [postData.subjectCode]);

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
    const handleCreatePost = async (status) => {
        if (subjectsAvailable.length === 0) {
            setAlertMessage('Please join a subject before create post!');
            onOpen();
        } else {
            handleContent();
            const timeCreate = new Date();
            const uniqueId = await createUniqueId(postData.title);

            const errors = validatePostContent({
                ...postData
            });
            if (errors.length !== 0) {
                let errorsString = errors.join('\n');
                setAlertMessage(
                    errorsString
                );
                onOpen();
            } else {
                createPost({
                    ...postData,
                    id: uniqueId,
                    createAt: timeCreate,
                    creatorId: user?.id,
                    status: status
                })
                    .then((res) => {
                        setAlertMessage('Successfully create post!');
                        onOpen();
                        resetPostData();
                        navigate('/posts');
                    })
                    .catch((err) => {
                        setAlertMessage('Fail to create post!');
                        onOpen();
                    })
            }
        }
    }

    const handleGetSubjectsJoined = async () => {
        return await getSubjectsJoined(user?.id);
    }

    React.useEffect(() => {
        createUniqueId(postData.title)
            .then((uniqueId) => {
                setPostData({
                    ...postData,
                    id: uniqueId
                })
            })
    }, [postData.title]);

    const resetPostData = () => {
        setHtmlContent('');
        setPostData({
            id: '',
            subjectCode: '',
            department: null,
            title: '',
            description: '',
            creatorId: '',
            createAt: null,
            cover: '',
            updatedAt: '',
            content: '',
            status: 'Pending',
            liked: [],
            commentIds: [],
            shared: 0,
            viewed: 0
        });
        setPreviewImage(null);
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

    const [isShowAI, setIsShowAI] = React.useState(false);
    const [chatString, setChatString] = React.useState('');
    const [chatResult, setChatResult] = React.useState('');
    const { hasCopied, onCopy } = useClipboard(`${chatResult}`);
    const [loadingResult, setLoadingResult] = React.useState(false);
    const handleAIChat = () => {
        setLoadingResult(true);
        AIChat({
            prompt: chatString
        })
            .then((res) => {
                setChatResult(res);
                setLoadingResult(false);
            })
            .catch(() => {
                setLoadingResult(false);
            });
    }

    return (
        <>
            {
                (user && user?.id) ?
                    <>
                        <Card
                            borderWidth={0}
                            borderRadius={20}
                            boxShadow='none'
                            width='100%'
                            ref={finalRef}
                        >
                            <Box marginTop={6} marginX={6}>
                                <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Create Post</Text>
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
                                                                <MenuItem onClick={() => handleSubjectCode(subject?.subjectCode)} borderWidth={0} fontSize='sm' borderRadius={8}>
                                                                    <Text>{subject?.subjectCode}</Text>
                                                                </MenuItem>
                                                            ))
                                                        }
                                                        {
                                                            subjectsAvailable.length === 0 &&
                                                            <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>
                                                                <Text>You haven't joined any subject.</Text>
                                                            </MenuItem>
                                                        }
                                                    </MenuList>
                                                </Menu>
                                                <Text cursor='default'>/</Text>
                                                <Input value={postData.title} onChange={(e) => handleTitle(e.target.value)} padding={1} color={color} _placeholder={{ color: placeholderColor }} height={22} borderWidth={0} _focus={{ borderWidth: 0, boxShadow: 'none' }} outline='none' fontWeight='semibold' textAlign='left' placeholder='Post title' />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Button
                                        variant='ghost'
                                        colorScheme='gray'
                                        rightIcon={<AiOutlineInfoCircle size={20}/>}
                                        onClick={() => setIsShowGuider(true)}
                                    >Quick tour</Button>
                                </Flex>
                            </CardHeader>
                            <CardBody >
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
                                <div style={{ textAlign: 'left', fontFamily: 'monospace' }} className='ignore_lib' dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>

                                <Box id='text-editor'>
                                    <Flex id='text-field__tool-bar' marginTop={3} flexDirection='row' justifyContent='space-between' alignItems='flex-start'>
                                        <Text textAlign='left' lineHeight='40px' height='40px' width='100px' margin={0} fontWeight='semibold' fontSize='sm'>{'>'} {currentVariant}</Text>
                                        <Flex
                                            flexDirection='row'
                                            justifyContent='flex-end'
                                            columnGap={1}
                                            marginBottom='5px'
                                            flexWrap='wrap'
                                            rowGap='5px'
                                        >
                                            <Button onClick={() => resetPostData()} width='40px' padding={0} height='40px' borderRadius='10px' iconSpacing={0} backgroundColor='red.500' _hover={{ backgroundColor: 'red.600', color: '#FFF' }} color='#FFF'>
                                                <ListX size={20} color='#FFF' />
                                            </Button>
                                            <Button id='text-field__ai' padding={0} onClick={() => setIsShowAI(!isShowAI)} width='40px' height='40px' borderRadius='10px' iconSpacing={0} opacity={isShowAI ? 1 : 0.5}>
                                                <Image src={ClaudeIcon} width='40px' height='40px' borderRadius='10px' />
                                            </Button>
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'h1' ? 'p' : 'h1')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h1' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading1 size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'h2' ? 'p' : 'h2')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h2' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading2 size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'h3' ? 'p' : 'h3')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h3' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading3 size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'h4' ? 'p' : 'h4')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h4' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading4 size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'h5' ? 'p' : 'h5')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h5' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading5 size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'h6' ? 'p' : 'h6')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h6' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading6 size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'bold' ? 'p' : 'bold')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'bold' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Bold size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'italic' ? 'p' : 'italic')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'italic' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Italic size={18} />} />
                                            <Button onClick={() => setCurrentVariant(currentVariant === 'underline' ? 'p' : 'underline')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'underline' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Underline size={18} />} />
                                        </Flex>
                                    </Flex>

                                    {
                                        isShowAI &&
                                        <>
                                            <Flex
                                                flexDirection='row'
                                                columnGap={1}
                                                alignItems='center'
                                            >
                                                <Input
                                                    _focus={{
                                                        boxShadow: 'none',
                                                        borderWidth: 0
                                                    }}
                                                    backgroundColor='#CA987730'
                                                    color={claudeText}
                                                    _placeholder={{
                                                        color: claudeText
                                                    }}
                                                    borderWidth={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleAIChat();
                                                        }
                                                    }} onChange={(e) => setChatString(e.target.value)} value={chatString} marginY={1} borderRadius={15} placeholder='Chat with AI' fontSize='small' />
                                                <Stack cursor='pointer' backgroundColor='#CA9877' _hover={{
                                                    backgroundColor: '#CA9877'
                                                }} justifyContent='center' alignItems='center' borderRadius={10} width='40px' height='40px' onClick={onCopy}>
                                                    {
                                                        loadingResult ?
                                                            <Spinner /> :
                                                            <BiMailSend onClick={handleAIChat} color='#000' />
                                                    }
                                                </Stack>
                                            </Flex>
                                            <Textarea lineHeight='15px' backgroundColor='#CA987730' minHeight={240} borderWidth={0} marginBottom={3} fontFamily='monospace' fontSize='small' borderRadius={10} size='sm' color={claudeText} value={`${chatResult}`} isReadOnly />
                                        </>
                                    }

                                    <Textarea id='text-field__content' fontSize='small' fontWeight='medium' fontFamily='monospace' value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown} noOfLines={2} overflowY='scroll' placeholder='Content of your post here...' />
                                    <Text fontSize='small' textAlign='right'>*Hit enter to add this content to document.</Text>
                                </Box>
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
                                <Button onClick={() => handleCreatePost('draft')} borderRadius={15}>Draft</Button>
                                <Button onClick={() => handleCreatePost('pending')} borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Publish</Button>
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
                    :
                    <Spinner />
            }
        </>
    );
}