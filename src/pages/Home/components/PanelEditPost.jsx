import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, Textarea, useClipboard, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPost, updatePost } from '../../../core/services/post';
import { updatePostCover } from '../../../core/services/photo';
import { getSubjects, getSubjectsJoined } from '../../../core/services/subject';
import { useNavigate, useParams } from 'react-router-dom';
import PlaceholderImage from '../../../assets/images/placeholder-1.webp';
import { convertHtmlToObject } from '../../../helper/convertHtmlToObject';
import { Bold, CheckCheck, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, Pencil, Underline } from 'lucide-react';
import { AIChat } from '../../../core/services/ai';
import ClaudeIcon from '../../../assets/images/claude_icon.jpeg';
import { BiMailSend } from 'react-icons/bi';
import { converTextToHTML } from '../../../helper/converTextToHTML';
import { convertObjectsToHTML } from '../../../helper/convertObjectsToHTML';
const { SyncIcon } = icons;

export const PanelEditPost = () => {
    const { postId } = useParams();
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
                    setTempHtmlContent(convertHtmlToObject(res?.content))
                    setPreviewImage(res?.cover);
                })
                .catch((err) => console.error(err));
        }
    };

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
        let htmlContentUpdated = convertObjectsToHTML(tempHtmlContent);

        updatePost({
            ...postData,
            content: htmlContentUpdated,
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
    }, []);


    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [textareaValue, setTextAreaValue] = React.useState('');
    const textareaRef = React.useRef(null);
    const [tempHtmlContent, setTempHtmlContent] = React.useState([]);
    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'revert-layer';
            textareaRef.current.style.minHeight = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareaValue]);
    const handleUpdateHtmlContent = (index, val) => {
        // Check if the index is within the range of the array
        if (index >= 0 && index < tempHtmlContent.length) {
            // Create a copy of the tempHtmlContent array
            let updatedContent = [...tempHtmlContent];

            // Update the content attribute of the object at the specified index
            updatedContent[index].content = val;

            // Update the state
            setTempHtmlContent(updatedContent);
        } else {
            console.error('Index out of range');
        }
    }
    const [isShowAI, setIsShowAI] = React.useState(false);
    const [chatString, setChatString] = React.useState('');
    const [chatResult, setChatResult] = React.useState('');
    const { hasCopied, onCopy } = useClipboard(`${chatResult}`);
    const [loadingResult, setLoadingResult] = React.useState(false);
    const [currentVariant, setCurrentVariant] = React.useState('p');
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
            setTempHtmlContent(
                [
                    ...tempHtmlContent,
                    convertHtmlToObject(converTextToHTML(inputValue, currentVariant))[0]
                ]
            )
            setInputValue('');
        }
    }

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
                                marginBottom={1}
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
                                <Text marginLeft={1} textAlign='left' fontWeight='semibold' fontSize='small'>{postData?.department}</Text>
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

                    <Box marginBottom={3} textAlign='left' className='ignore_lib' fontFamily='monospace'>
                        {
                            tempHtmlContent.map((item, index) => {
                                switch (item.tag) {
                                    case 'h1':
                                    case 'h2':
                                    case 'h3':
                                    case 'h4':
                                    case 'h5':
                                    case 'h6':
                                        return (
                                            <Flex
                                                flexDirection='row'
                                                columnGap={1}
                                                marginBottom={1}
                                                justifyContent='flex-start'
                                                alignItems='center'
                                                cursor='pointer'
                                            >
                                                <Button
                                                    onClick={() => {
                                                        setTextAreaValue(item.content)
                                                        setSelectedIndex(index)
                                                    }}
                                                    leftIcon={<Pencil size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                <Button isDisabled={selectedIndex !== index} onClick={() => {
                                                    handleUpdateHtmlContent(index, textareaValue);
                                                }} leftIcon={<CheckCheck size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                {
                                                    selectedIndex !== index ?
                                                        React.createElement(item.tag, { key: index }, item.content) :
                                                        // put style to item in object to map style
                                                        <Textarea flex={1} padding={2} borderWidth={0} outline='none' boxShadow='none' _hover={{ outline: 'none', boxShadow: 'none', borderWidth: 0 }} backgroundColor={selectedIndex === index ? '#00000010' : 'transparent'} ref={textareaRef} onChange={(e) => setTextAreaValue(e.target.value)} marginY={0} style={item.style} fontFamily='monospace' overflowY='auto' value={textareaValue} />
                                                }
                                            </Flex>
                                        );
                                    case 'p':
                                        return (
                                            <Flex
                                                flexDirection='row'
                                                columnGap={1}
                                                marginBottom={1}
                                                justifyContent='flex-start'
                                                alignItems='flex-start'
                                                cursor='pointer'
                                            >
                                                <Button
                                                    onClick={() => {
                                                        setTextAreaValue(item.content)
                                                        setSelectedIndex(index)
                                                    }}
                                                    leftIcon={<Pencil size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                <Button isDisabled={selectedIndex !== index} onClick={() => {
                                                    handleUpdateHtmlContent(index, textareaValue);
                                                }} leftIcon={<CheckCheck size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                {
                                                    selectedIndex !== index ?
                                                        <p style={{ width: 'fit-content' }} key={index}>{item.content}</p> :
                                                        <Textarea flex={1} padding={2} borderWidth={0} outline='none' boxShadow='none' _hover={{ outline: 'none', boxShadow: 'none', borderWidth: 0 }} backgroundColor={selectedIndex === index ? '#00000010' : 'transparent'} ref={textareaRef} onChange={(e) => setTextAreaValue(e.target.value)} marginY={0} style={item.style} fontFamily='monospace' overflowY='auto' value={textareaValue} />
                                                }
                                            </Flex>
                                        );
                                    case 'i':
                                        return (
                                            <Flex
                                                flexDirection='row'
                                                columnGap={1}
                                                marginBottom={1}
                                                justifyContent='flex-start'
                                                alignItems='flex-start'
                                                cursor='pointer'
                                            >
                                                <Button
                                                    onClick={() => {
                                                        setTextAreaValue(item.content)
                                                        setSelectedIndex(index)
                                                    }}
                                                    leftIcon={<Pencil size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                <Button isDisabled={selectedIndex !== index} onClick={() => {
                                                    handleUpdateHtmlContent(index, textareaValue);
                                                }} leftIcon={<CheckCheck size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                {
                                                    selectedIndex !== index ?
                                                        <i style={{ width: 'fit-content' }} key={index}>{item.content}</i> :
                                                        <Textarea flex={1} padding={2} borderWidth={0} outline='none' boxShadow='none' _hover={{ outline: 'none', boxShadow: 'none', borderWidth: 0 }} backgroundColor={selectedIndex === index ? '#00000010' : 'transparent'} marginY={0} style={item.style} fontFamily='monospace' overflowY='auto' value={textareaValue} />
                                                }
                                            </Flex>
                                        );
                                    case 'u':
                                        return (
                                            <Flex
                                                flexDirection='row'
                                                columnGap={1}
                                                marginBottom={1}
                                                justifyContent='flex-start'
                                                alignItems='flex-start'
                                                cursor='pointer'
                                            >
                                                <Button
                                                    onClick={() => {
                                                        setTextAreaValue(item.content)
                                                        setSelectedIndex(index)
                                                    }}
                                                    leftIcon={<Pencil size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                <Button isDisabled={selectedIndex !== index} onClick={() => {
                                                    handleUpdateHtmlContent(index, textareaValue);
                                                }} leftIcon={<CheckCheck size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                {
                                                    selectedIndex !== index ?
                                                        <u style={{ width: 'fit-content' }} key={index}>{item.content}</u> :
                                                        <Textarea flex={1} padding={2} borderWidth={0} outline='none' boxShadow='none' _hover={{ outline: 'none', boxShadow: 'none', borderWidth: 0 }} backgroundColor={selectedIndex === index ? '#00000010' : 'transparent'} marginY={0} style={item.style} fontFamily='monospace' overflowY='auto' value={textareaValue} />
                                                }
                                            </Flex>
                                        );
                                    case 'b':
                                        return (
                                            <Flex
                                                flexDirection='row'
                                                columnGap={1}
                                                marginBottom={1}
                                                justifyContent='flex-start'
                                                alignItems='flex-start'
                                                cursor='pointer'
                                            >
                                                <Button
                                                    onClick={() => {
                                                        setTextAreaValue(item.content)
                                                        setSelectedIndex(index)
                                                    }}
                                                    leftIcon={<Pencil size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                <Button isDisabled={selectedIndex !== index} onClick={() => {
                                                    handleUpdateHtmlContent(index, textareaValue);
                                                }} leftIcon={<CheckCheck size='14px' />} iconSpacing={0} width='40px' height='40px' borderRadius='10px' />
                                                {
                                                    selectedIndex !== index ?
                                                        <b style={{ width: 'fit-content' }} key={index}>{item.content}</b> :
                                                        <Textarea flex={1} padding={2} borderWidth={0} outline='none' boxShadow='none' _hover={{ outline: 'none', boxShadow: 'none', borderWidth: 0 }} backgroundColor={selectedIndex === index ? '#00000010' : 'transparent'} marginY={0} style={item.style} fontFamily='monospace' overflowY='auto' value={textareaValue} />
                                                }
                                            </Flex>
                                        );
                                    default:
                                        return null;
                                }
                            })
                        }
                    </Box>

                    <Flex marginTop={3} flexDirection='row' justifyContent='space-between' alignItems='flex-start'>
                        <Text textAlign='left' lineHeight='40px' height='40px' width='100px' margin={0} fontWeight='semibold' fontSize='sm'>{'>'} {currentVariant}</Text>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-end'
                            columnGap={1}
                            marginBottom='5px'
                            flexWrap='wrap'
                            rowGap='5px'
                        >
                            <Button padding={0} onClick={() => setIsShowAI(!isShowAI)} width='40px' height='40px' borderRadius='10px' iconSpacing={0} opacity={isShowAI ? 1 : 0.5}>
                                <Image src={ClaudeIcon} width='40px' height='40px' borderRadius='10px' />
                            </Button>
                            <Button onClick={() => setCurrentVariant(currentVariant === 'h1' ? 'p' : 'h1')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h1' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading1 size={18} />} />
                            <Button onClick={() => setCurrentVariant(currentVariant === 'h2' ? 'p' : 'h2')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h2' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading2 size={18} />} />
                            <Button onClick={() => setCurrentVariant(currentVariant === 'h3' ? 'p' : 'h3')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h3' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading3 size={18} />} />
                            <Button onClick={() => setCurrentVariant(currentVariant === 'h4' ? 'p' : 'h4')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h4' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading4 size={18} />} />
                            <Button onClick={() => setCurrentVariant(currentVariant === 'h5' ? 'p' : 'h5')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h5' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading5 size={18} />} />
                            <Button onClick={() => setCurrentVariant(currentVariant === 'h6' ? 'p' : 'h5')} width='40px' height='40px' borderRadius='10px' iconSpacing={0} backgroundColor={currentVariant === 'h6' ? btnEditorBg : btnEditorText} _hover={{ backgroundColor: btnEditorBg }} leftIcon={<Heading6 size={18} />} />
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

                    <Textarea fontSize='small' fontWeight='medium' fontFamily='monospace' value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown} borderRadius={20} minHeight={120} placeholder='Content of your post here...' />
                    <Text fontSize='x-small' textAlign='right'>*Hit enter to add a new line in document.</Text>
                    {/* <Textarea fontSize='small' fontWeight='medium' fontFamily='monospace' onChange={(e) => handleContent(e.target.value)} borderRadius={15} minHeight={240} placeholder='Add more content of your post here' /> */}
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