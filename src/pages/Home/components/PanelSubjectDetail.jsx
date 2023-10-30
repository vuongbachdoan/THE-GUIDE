import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
import Subject1 from '../../../assets/images/PRJ301.png';
import SubjectDecor1 from '../../../assets/images/subject_decor_1.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { updateSubjectThumbnail } from '../../../core/services/photo';
import { createSubject, getSubject, getSubjects, getSubjectsJoined, joinSubject } from '../../../core/services/subject';
import { useSelector } from 'react-redux';
import { getUser, updateUser } from '../../../core/services/user';
import DecorGreen from '../../../assets/images/decor_role_green.png';
import DecorOrage from '../../../assets/images/decor_role_orange.png';

const { LinkIcon, CameraIcon } = icons;

export const PanelSubjectDetail = () => {
    const location = useLocation();
    const subject = location.state;

    const user = useSelector((state) => state.profileData.data);
    const [openSubjectCreate, setOpenSubjectCreate] = React.useState(false);
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertMessage, setAlertMessage] = React.useState(null);
    const previewImageRef = React.useRef();
    const [subjects, setSubjects] = React.useState([]);
    const [subjectsJoined, setSubjectsJoined] = React.useState([]);
    const navigate = useNavigate();

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

    const toSubjectPage = (subject) => {
        navigate('/subject/detail', {
            state: subject
        });
    }

    const [lectures, setLectures] = React.useState([]);
    const [students, setStudents] = React.useState([]);
    React.useEffect(() => {
        setLectures(subject.lectureIds);
        setStudents(subject.studentIds);
    }, [subject])

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
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>{subject?.subjectCode} / {subject?.subjectName}</Text>
                    <Button onClick={() => { }} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Leave</Button>
                </Flex>
            </Card>

            {/* List lecture */}
            {
                lectures.length !== 0 &&
                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    width='100%'
                >
                    <Box margin={6}>
                        <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Lectures</Text>
                    </Box>
                    <CardBody>
                        <Grid
                            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                        >
                            {
                                lectures.map((lectureId) => (
                                    <UserCard userId={lectureId} isLecture={true}/>
                                ))
                            }
                        </Grid>
                    </CardBody>
                </Card >
            }

            {/* List students */}
            {
                students.length !== 0 &&
                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    width='100%'
                >
                    <Box margin={6}>
                        <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Students</Text>
                    </Box>
                    <CardBody>
                        <Grid
                            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                        >
                            {
                                students.map((studentId) => (
                                    <UserCard userId={studentId} isLecture={false}/>
                                ))
                            }
                        </Grid>
                    </CardBody>
                </Card >
            }
        </>
    );
}

const UserCard = ({ userId, isLecture }) => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const [userData, setUserData] = React.useState(null);
    React.useEffect(() => {
        getUser(userId)
            .then((res) => {
                setUserData(res);
            })
            .catch((err) => console.error(err));
    }, [userId]);

    return (
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
                <Image src={isLecture ? DecorGreen : DecorOrage}
                    maxHeight={75}
                    borderRadius={20}
                    objectFit='cover'
                    position='absolute'
                    top={0}
                    left={0}
                    width='100%'
                />
                <Image objectFit='cover' marginTop={30} src={userData?.avatar} width={100} height={100} borderRadius={14} zIndex={10} />
                <Text marginTop={3} fontWeight='semibold' fontSize='medium' lineHeight='15px' textTransform='uppercase'>{userData?.userCode}</Text>
                <Text marginTop={3} fontWeight='semibold' fontSize='sm'>{userData?.username}</Text>
                <Link to='/profile' state={userId}><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>View</Text></Link>
            </Flex>
        </GridItem>
    );
}