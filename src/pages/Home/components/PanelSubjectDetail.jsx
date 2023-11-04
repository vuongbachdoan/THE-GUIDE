import { Box, Button, Card, CardBody, Flex, Grid, GridItem, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { getSubject, leaveSubject } from '../../../core/services/subject';
import { useSelector } from 'react-redux';
import { getUser, leaveUser } from '../../../core/services/user';
import DecorGreen from '../../../assets/images/decor_role_green.png';
import DecorOrage from '../../../assets/images/decor_role_orange.png';
import { IoMdSettings } from 'react-icons/io';
import { DialogManageSubject } from './DialogManageSubject';
import icons from '../../../assets/icons';
import { getPostsBelongSubject } from '../../../core/services/post';
import { PostCard } from './PostCard';
const { ExpandIcon } = icons;

export const PanelSubjectDetail = () => {
    const location = useLocation();
    const subject = location.state;
    const navigate = useNavigate();
    const user = useSelector((state) => state.profileData.data);

    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertMessage, setAlertMessage] = React.useState(null);

    const [lectures, setLectures] = React.useState([]);
    const [students, setStudents] = React.useState([]);
    React.useEffect(() => {
        loadSubject();
    }, [location.state]);

    React.useEffect(() => {
        loadSubject();
    }, []);

    const handleUserCardAlert = (message) => {
        navigate('/subject/detail', {
            state: subject
        });
        setAlertMessage(message);
        onOpen();
    }

    const handleLeaveSubject = () => {
        leaveSubject(subject?.subjectCode, user?.id)
            .then(() => {
                leaveUser(user?.id, subject?.subjectCode)
                    .then(() => {
                        setAlertMessage(`You leaved ${subject.subjectCode}!`);
                        onOpen();
                        loadSubject();
                        setTimeout(() => {
                            navigate('/subject');
                        }, 3000);
                    })
                    .catch(() => {
                        setAlertMessage(`Fail to leave ${subject.subjectCode}!`);
                        onOpen();
                    });
            })
            .catch(() => {
                setAlertMessage(`Fail to leave ${subject.subjectCode}!`);
                onOpen();
            })
    }

    const loadSubject = () => {
        getSubject(subject?.subjectCode)
            .then((res) => {
                setLectures(res.lectureIds);
                setStudents(res.studentIds);
            })
            .catch((err) => console.error(err))
    }

    const [isOpenManageSubject, setIsOpenManageSubject] = React.useState(false);
    const handleCloseManageSubject = () => {
        setIsOpenManageSubject(false);
    }

    const [isStudentsExpand, setIsStudentsExpand] = React.useState(true);
    const [isLecturesExpand, setIsLecturesExpand] = React.useState(true);

    const [postsBelongSubject, setPostsBelongSubject] = React.useState([]);
    React.useEffect(() => {
        if (subject) {
            getPostsBelongSubject(subject?.subjectCode)
                .then((res) => {
                    setPostsBelongSubject(res);
                })
                .catch((err) => console.error(err));
        }
    }, [subject]);

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

            <DialogManageSubject canOpen={isOpenManageSubject} close={handleCloseManageSubject} leave={handleLeaveSubject} />

            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
                ref={finalRef}
            >
                <Flex
                    margin={5}
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap={15}
                >
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>{subject?.subjectCode} / {subject?.subjectName}</Text>
                    <Button onClick={() => setIsOpenManageSubject(true)} width='40px' height='40px' borderRadius={15} _hover={{ transform: 'rotate(720deg)', transitionDuration: '0.5s' }} iconSpacing={0} variant='ghost' leftIcon={<IoMdSettings size={20} />} />
                    {/* <Button onClick={handleLeaveSubject} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Leave</Button> */}
                </Flex>
            </Card>

            {/* List lecture */}
            {
                lectures?.length !== 0 &&
                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    width='100%'
                >
                    <Flex flexDirection='row' justifyContent='space-between' alignItems='center' margin={5}>
                        <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Lectures ({lectures.length})</Text>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<ExpandIcon width={20} height={20} />}
                            onClick={() => setIsLecturesExpand(!isLecturesExpand)}
                        />
                    </Flex>
                    {
                        isLecturesExpand &&
                        <CardBody>
                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                            >
                                {
                                    lectures?.map((lectureId) => (
                                        <UserCard userId={lectureId} isLecture={true} handleAlert={(message) => handleUserCardAlert(message)} onClose={onClose} />
                                    ))
                                }
                            </Grid>
                        </CardBody>
                    }
                </Card >
            }

            {/* List students */}
            {
                students?.length !== 0 &&
                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    width='100%'
                >
                    <Flex flexDirection='row' justifyContent='space-between' alignItems='center' margin={5}>
                        <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Students ({students.length})</Text>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<ExpandIcon width={20} height={20} />}
                            onClick={() => setIsStudentsExpand(!isStudentsExpand)}
                        />
                    </Flex>
                    {
                        isStudentsExpand &&
                        <CardBody>
                            <Grid
                                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                            >
                                {
                                    students?.map((studentId) => (
                                        <UserCard userId={studentId} isLecture={false} handleAlert={(message) => handleUserCardAlert(message)} onClose={onClose} />
                                    ))
                                }
                            </Grid>
                        </CardBody>
                    }
                </Card >
            }

            {/* Posts belong to this subject */}
            {
                postsBelongSubject.map((post) => {
                    if(user?.role === 'Lecture') {
                        return (
                            <PostCard key={post.id} postId={post.id} />
                        )
                    } else {
                        if(post?.status === 'published')  {
                            return (
                                <PostCard key={post.id} postId={post.id} />
                            )
                        }
                    }
                })
            }
        </>
    );
}

const UserCard = ({ userId, isLecture, handleAlert, onClose }) => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const [userData, setUserData] = React.useState(null);
    const user = useSelector((state) => state.profileData.data);
    const location = useLocation();
    const subject = location.state;

    React.useEffect(() => {
        getUser(userId)
            .then((res) => {
                setUserData(res);
            })
            .catch((err) => console.error(err));
    }, [userId]);

    const handleLeaveSubject = () => {
        leaveSubject(subject.subjectCode, userId)
            .then(() => {
                leaveUser(userId, subject.subjectCode)
                    .then(() => {
                        handleAlert(`User ${userId} leaved ${subject.subjectCode}!`);
                    })
                    .catch((err) => {
                        handleAlert(`Fail to leave ${subject.subjectCode}!`);
                    });
            })
            .catch(() => {
                handleAlert(`Fail to leave ${subject.subjectCode}!`);
            })
    }

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
                {
                    (userData?.role === 'Student' && (user?.role === 'Admin' || user?.role === 'Lecture')) &&
                    <Button onClick={handleLeaveSubject} marginTop={3} borderRadius={15} width='100px' colorScheme='red'>
                        Delete
                    </Button>
                }
            </Flex>
        </GridItem>
    );
}