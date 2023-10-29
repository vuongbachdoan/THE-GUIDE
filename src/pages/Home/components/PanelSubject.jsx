import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
import Subject1 from '../../../assets/images/PRJ301.png';
import SubjectDecor1 from '../../../assets/images/subject_decor_1.png';
import { Link } from 'react-router-dom';
import React from 'react';
import { updateSubjectThumbnail } from '../../../core/services/photo';
import { createSubject, getSubjects, getSubjectsJoined, joinSubject, updateSubject } from '../../../core/services/subject';
import { useSelector } from 'react-redux';
import { updateUser } from '../../../core/services/user';
import PlaceholderImage from '../../../assets/images/placeholder-1.webp';

const { LinkIcon, CameraIcon } = icons;

export const PanelSubject = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const user = useSelector((state) => state.profileData.data);
    const [openSubjectCreate, setOpenSubjectCreate] = React.useState(false);
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertMessage, setAlertMessage] = React.useState(null);
    const previewImageRef = React.useRef();
    const [subjects, setSubjects] = React.useState([]);
    const [subjectsJoined, setSubjectsJoined] = React.useState([]);

    React.useEffect(() => {
        loadSubject();
    }, []);

    React.useEffect(() => {
        loadSubjectsJoined();
    }, [user]);

    const loadSubjectsJoined = () => {
        if (user) {
            getSubjectsJoined(user.id)
                .then((res) => {
                    setSubjectsJoined(res);
                })
                .catch((err) => console.error(err))
        }
    }

    const loadSubject = () => {
        getSubjects()
            .then((res) => setSubjects(res))
            .catch((err) => console.error(err))
    }

    const [isLoadingThumbnail, setIsLoadingThumbnail] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState(null);
    const handlePickerImage = (e) => {
        if (!(subjectData.subjectCode)) {
            setAlertMessage('Please enter subject code first!');
            onOpen();
        } else {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                setIsLoadingThumbnail(true);
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                const type = file.type.split('/')[1];

                updateSubjectThumbnail(subjectData.subjectCode, base64String, type)
                    .then((res) => {
                        setPreviewImage(res);
                        setIsLoadingThumbnail(false);
                    })
                    .catch(() => {
                        onOpen();
                        setPreviewImage(null);
                        setAlertMessage('Fail to upload this image!');
                        setIsLoadingThumbnail(false);
                    })
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    React.useEffect(() => {
        if (previewImage) {
            setSubjectData({
                ...subjectData,
                thumbnail: previewImage
            })
        }
    }, [previewImage]);

    const handleCreateSubject = () => {
        const timeCreate = new Date();

        createSubject({
            ...subjectData,
            createAt: timeCreate,
            studentIds: [],
            lectureIds: [],
            postIds: []
        })
            .then((res) => {
                setAlertMessage('Successfully create subject!');
                onOpen();
                setOpenSubjectCreate(false);
                loadSubject();
                resetSubjectData();
            })
            .catch((err) => {
                setAlertMessage('Fail to create subject!');
                onOpen();
            })
    }

    const resetSubjectData = () => {
        setSubjectData({
            subjectCode: null,
            createAt: null,
            studentIds: [],
            lectureIds: [],
            department: null,
            postIds: [],
            thumbnail: null
        });

        setPreviewImage('');
    }


    const [subjectData, setSubjectData] = React.useState({
        department: null,
        subjectName: null,
        subjectCode: null
    });
    const handleDepartment = (val) => {
        setSubjectData({
            ...subjectData,
            department: val
        })
    }

    const handleSubjectName = (val) => {
        setSubjectData({
            ...subjectData,
            subjectName: val
        })
    }

    const handleSubjectCode = (val) => {
        setSubjectData({
            ...subjectData,
            subjectCode: val
        })
    }

    const handleJoinSubject = (subject) => {
        if (!subject.studentIds.includes(user.id)) {
            joinSubject(
                subject.subjectCode,
                {
                    email: user.email,
                    id: user.id
                }
            )
                .then(() => {
                    updateUser({
                        ...user,
                        subjects: [
                            ...user.subjects,
                            subject.subjectCode
                        ]
                    }).then(() => {
                        setAlertMessage(`Successfully join subject ${subject.subjectCode}!`);
                        onOpen();
                        loadSubjectsJoined();
                    }).catch(() => {
                        setAlertMessage(`Fail to join subject ${subject.subjectCode}!`);
                        onOpen();
                    })
                })
                .catch(() => {
                    setAlertMessage(`Fail to join subject ${subject.subjectCode}!`);
                    onOpen();
                })
        } else {
            setAlertMessage(`You already join subject ${subject.subjectCode}!`);
            onOpen();
        }
    }

    return (
        <>
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
                        <Button borderRadius={15} width='100px' colorScheme='red' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
                ref={finalRef}
            >
                <Flex
                    margin={6}
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap={15}
                >
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Create subject</Text>
                    <Button onClick={() => setOpenSubjectCreate(true)} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Create</Button>
                </Flex>
            </Card>

            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
            >
                <Box margin={6}>
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Invitations</Text>
                </Box>

                <CardBody>
                    <Flex
                        flexDirection='column'
                        rowGap={15}
                    >
                        <Flex
                            flexDirection='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Flex
                                flexDirection='row'
                                columnGap={3}
                            >
                                <Image src={Subject1} width={50} height={50} borderRadius={8} />
                                <Box>
                                    <Text textAlign='left' fontSize='md' fontWeight='semibold'>IT  /  PRJ301</Text>
                                    <Text textAlign='left' fontSize='sm' color='gray.500' noOfLines={1} textOverflow='ellipsis'>HoaDNT invited you to this subject</Text>
                                    <Flex
                                        flexDirection='row'
                                        alignItems='center'
                                    >
                                        <LinkIcon width={18} height={18} />
                                        <Text fontSize='x-small' color='gray.500'>Nguyen Thi Thuy Dung and 500 others</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex
                                columnGap={15}
                            >
                                <Button borderRadius={15}>Ignore</Button>
                                <Button borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Accept</Button>
                            </Flex>
                        </Flex>

                        <Flex
                            flexDirection='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Flex
                                flexDirection='row'
                                columnGap={3}
                            >
                                <Image src={Subject1} width={50} height={50} borderRadius={8} />
                                <Box>
                                    <Text textAlign='left' fontSize='md' fontWeight='semibold'>IT  /  PRJ301</Text>
                                    <Text textAlign='left' fontSize='sm' color='gray.500' noOfLines={1} textOverflow='ellipsis'>HoaDNT invited you to this subject</Text>
                                    <Flex
                                        flexDirection='row'
                                        alignItems='center'
                                    >
                                        <LinkIcon width={18} height={18} />
                                        <Text fontSize='x-small' color='gray.500'>Nguyen Thi Thuy Dung and 500 others</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex
                                columnGap={15}
                            >
                                <Button borderRadius={15}>Ignore</Button>
                                <Button borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Accept</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>

            {/* Subjects joined */}
            {
                subjectsJoined.length !== 0 &&
                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    width='100%'
                >
                    <Box margin={6}>
                        <Text textAlign='left' fontSize='xl' fontWeight='semibold'>My subjects</Text>
                    </Box>
                    <CardBody>
                        <Grid
                            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                        >
                            {
                                subjectsJoined.map((subject) => (
                                    <GridItem
                                        bg={bg}
                                        borderRadius={20}
                                    >
                                        <Flex
                                            justifyContent='center'
                                            alignItems='center'
                                            position='relative'
                                            margin='20px'
                                            flexDirection='column'
                                        >
                                            <Image src={SubjectDecor1}
                                                maxHeight={75}
                                                borderRadius={20}
                                                objectFit='cover'
                                                position='absolute'
                                                top={0}
                                                left={0}
                                                width='100%'
                                            />
                                            <Image objectFit='cover' marginTop={30} src={subject?.thumbnail} width={100} height={100} borderRadius={14} zIndex={10} />
                                            <Text marginTop={3} fontWeight='semibold' fontSize='xl'>{subject?.subjectCode}</Text>
                                            <Text marginTop={3} fontWeight='semibold' fontSize='sm' lineHeight='15px'>{subject?.subjectName}</Text>
                                            <Flex
                                                flexDirection='row'
                                                alignItems='center'
                                            >
                                                <LinkIcon width={18} height={18} />
                                                <Text textAlign='center' fontSize='x-small' color='gray.500'>Dung and 500 others</Text>
                                            </Flex>
                                            <Link onClick={() => handleJoinSubject(subject)}><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Go to subject</Text></Link>
                                        </Flex>
                                    </GridItem>
                                ))
                            }
                        </Grid>
                    </CardBody>
                </Card >
            }

            {/* Subject recommend */}
            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
            >
                <Box margin={6}>
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Subjects you may like</Text>
                </Box>
                <CardBody>
                    <Grid
                        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                    >
                        {
                            subjects.map((subject) => (
                                <GridItem
                                    bg={bg}
                                    borderRadius={20}
                                >
                                    <Flex
                                        justifyContent='center'
                                        alignItems='center'
                                        position='relative'
                                        margin='20px'
                                        flexDirection='column'
                                    >
                                        <Image src={SubjectDecor1}
                                            maxHeight={75}
                                            borderRadius={20}
                                            objectFit='cover'
                                            position='absolute'
                                            top={0}
                                            left={0}
                                            width='100%'
                                        />
                                        <Image objectFit='cover' marginTop={30} src={subject?.thumbnail} width={100} height={100} borderRadius={14} zIndex={10} />
                                        <Text marginTop={3} fontWeight='semibold' fontSize='xl'>{subject?.subjectCode}</Text>
                                        <Text marginTop={3} fontWeight='semibold' fontSize='sm' lineHeight='15px'>{subject?.subjectName}</Text>
                                        <Flex
                                            flexDirection='row'
                                            alignItems='center'
                                        >
                                            <LinkIcon width={18} height={18} />
                                            <Text textAlign='center' fontSize='x-small' color='gray.500'>Dung and 500 others</Text>
                                        </Flex>
                                        <Link onClick={() => handleJoinSubject(subject)}><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Link>
                                    </Flex>
                                </GridItem>
                            ))
                        }
                    </Grid>
                </CardBody>
            </Card >

            {/* Dialog create subject */}
            <Modal scrollBehavior='inside' closeOnOverlayClick={false} isOpen={openSubjectCreate} onClose={() => setOpenSubjectCreate(false)}>
                <ModalOverlay />
                <ModalContent
                    borderRadius={20}
                    overflow='hidden'
                >
                    <ModalHeader>Create subject</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <Flex
                            justifyContent='center'
                            alignItems='center'
                            position='relative'
                            margin='20px'
                            flexDirection='column'
                            width={240}
                            marginX='auto'
                        >
                            <Box
                                position='relative'
                            >
                                <input ref={previewImageRef} onChange={handlePickerImage} type="file" accept="image/*" name='avatar' id='avatar_picker' style={{ display: 'none' }} />
                                <Image objectFit='cover' backgroundColor='#1E1E1E20' borderWidth={0} src={previewImage ? previewImage : PlaceholderImage} width={200} height={200} borderRadius={20} zIndex={10} />
                                <Stack
                                    position='absolute'
                                    right={2}
                                    bottom={2}
                                    borderRadius={30}
                                    backgroundColor='#FFF'
                                    cursor='pointer'
                                    boxShadow='2xl'
                                    onClick={() => previewImageRef.current.click()}
                                >
                                    {
                                        isLoadingThumbnail ?
                                            <Spinner /> :
                                            <CameraIcon color='#1E1E1E' width={30} height={30} />
                                    }
                                </Stack>
                            </Box>
                            <Input onChange={(e) => handleSubjectCode(e.target.value)} backgroundColor='#1E1E1E20' marginTop={3} width='100%' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='Subject code' />
                            <Input onChange={(e) => handleSubjectName(e.target.value)} backgroundColor='#1E1E1E20' marginTop={3} width='100%' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='Subject name' />
                            <Stack marginTop={3} width='100%'>
                                <Menu>
                                    <MenuButton borderRadius={15} width='100%' iconSpacing={2} as={Button} rightIcon={<FaChevronDown size={12} />}>
                                        <Text textAlign='left' fontSize='sm'>{subjectData.department ? subjectData.department : 'Department'}</Text>
                                    </MenuButton>
                                    <MenuList
                                        padding={1}
                                        borderRadius={12}
                                        boxShadow='xl'
                                        minWidth='fit-content'
                                    >
                                        <MenuItem onClick={() => handleDepartment('Software Engineering')} borderWidth={0} fontSize='sm' borderRadius={8}>Software Engineering</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Artificial Intelligence')} borderWidth={0} fontSize='sm' borderRadius={8}>Artificial Intelligence</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Business')} borderWidth={0} fontSize='sm' borderRadius={8}>Bussiness</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Hospitality')} borderWidth={0} fontSize='sm' borderRadius={8}>Hospitality</MenuItem>
                                        <MenuItem onClick={() => handleDepartment('Digital Art')} borderWidth={0} fontSize='sm' borderRadius={8}>Digital Art</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Flex width='100%' justifyContent='center'>
                            <Button borderRadius={15} width='100px' mr={3} onClick={handleCreateSubject}>
                                Create
                            </Button>
                            <Button borderRadius={15} width='100px' colorScheme='red' onClick={() => setOpenSubjectCreate(false)}>
                                Cancel
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}