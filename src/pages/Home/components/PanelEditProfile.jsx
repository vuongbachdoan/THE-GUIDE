import { Box, Button, Flex, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { posts } from '../../../mocks/data';
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../../assets/images/student1.png';
import icons from '../../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { updateUser } from '../../../core/services/user';
import { setProfileData } from '../../../core/store/user/profileData';
import { CameraIcon } from '../../../assets/icons/CameraIcon';
import { updateUserAvatar } from '../../../core/services/photo';
const { MailIcon, LinkedinIcon, GithubIcon } = icons;

export const PanelEditProfile = () => {
    const dispatch = useDispatch();
    const bg = useColorModeValue('#FFF', 'gray.700');
    const user = useSelector((state) => state.profileData.data);
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertMessage, setAlertMessage] = React.useState(null);
    const previewImageRef = React.useRef();

    const [updatedData, setUpdatedData] = React.useState(null);
    React.useEffect(() => {
        if (user) {
            setUpdatedData(user);
        }
    }, [user]);

    const handleUsername = (val) => {
        setUpdatedData({
            ...updatedData,
            username: val
        })
    }

    const handleStudentCode = (val) => {
        setUpdatedData({
            ...updatedData,
            studentCode: val
        })
    }

    const handleEmail = (val) => {
        setUpdatedData({
            ...updatedData,
            email: val
        })
    }

    const handleLinkedIn = (val) => {
        setUpdatedData({
            ...updatedData,
            linkedin: val
        })
    }

    const handleGithub = (val) => {
        setUpdatedData({
            ...updatedData,
            github: val
        })
    }

    const handleWebsite = (val) => {
        setUpdatedData({
            ...updatedData,
            website: val
        })
    }

    const handleUpdateProfile = () => {
        updateUser(updatedData)
            .then((res) => {
                dispatch(setProfileData(res));
                onOpen();
                setAlertMessage('Successfully updated profile!');
            })
            .catch(() => {
                onOpen();
                setAlertMessage('Fail to update profile!')
            })
    }

    const handleCloseMessage = () => {
        onClose();
        setAlertMessage(null);
    }

    const [previewImage, setPreviewImage] = React.useState(null);
    const handlePickerImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            setPreviewImage(reader.result);

            const type = file.type.split('/')[1];

            updateUserAvatar(user.id, base64String, type)
                .then((res) => {
                    setPreviewImage(res);
                })
                .catch(() => {
                    onOpen();
                    setAlertMessage('Fail to upload this image!')
                })
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    React.useEffect(() => {
        if(previewImage) {
            setUpdatedData({
                ...updatedData,
                avatar: previewImage
            })
        }
    }, [previewImage])

    return (
        <>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
                        <Button borderRadius={15} colorScheme='red' onClick={handleCloseMessage}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box
                bg={bg}
                width='100%'
                padding={6}
                borderRadius={20}
                ref={finalRef}
            >
                <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap={15}
                >
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Edit profile</Text>
                    <Button onClick={handleUpdateProfile} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Save</Button>
                </Flex>

            </Box>
            <Flex
                flexDirection='column'
                rowGap={3}
                flex={1}
                width='100%'
            >
                <Box
                    bg={bg}
                    borderRadius={20}
                    padding={30}
                >
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
                            <Image objectFit='cover' backgroundColor='#1E1E1E20' borderWidth={0} src={previewImage ? previewImage : updatedData?.avatar} width={200} height={200} borderRadius={20} zIndex={10} />
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
                                <CameraIcon color='#1E1E1E' width={30} height={30} />
                            </Stack>
                        </Box>
                        <Input value={updatedData?.username} onChange={(e) => handleUsername(e.target.value)} backgroundColor='#1E1E1E20' marginTop={3} width='100%' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='xl' placeholder='username' />
                        <Input value={updatedData?.studentCode} onChange={(e) => handleStudentCode(e.target.value)} backgroundColor='#1E1E1E20' marginTop={3} width='100%' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='xl' placeholder='user code' />
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                            marginTop={3}
                        >
                            <Button padding={0} size='md' backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white' leftIcon={<MailIcon color='#FFF' width={18} height={18} />} iconSpacing={0} />
                            <Input value={updatedData?.email} onChange={(e) => handleEmail(e.target.value)} backgroundColor='#1E1E1E20' width='fit-content' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='email' />
                        </Flex>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                            marginTop={3}
                        >
                            <Button padding={0} size='md' backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white' leftIcon={<LinkedinIcon color='#FFF' width={18} height={18} />} iconSpacing={0} />
                            <Input value={updatedData?.linkedin} onChange={(e) => handleLinkedIn(e.target.value)} backgroundColor='#1E1E1E20' width='fit-content' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='linkedin.com/in/user' />
                        </Flex>
                        <Flex
                            flexDirection='row'
                            justifyContent='flex-start'
                            width='100%'
                            alignItems='center'
                            columnGap={3}
                            marginTop={3}
                        >
                            <Button padding={0} size='md' backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white' leftIcon={<GithubIcon color='#FFF' width={18} height={18} />} iconSpacing={0} />
                            <Input value={updatedData?.github} onChange={(e) => handleGithub(e.target.value)} backgroundColor='#1E1E1E20' width='fit-content' borderRadius={15} boxShadow='none' _hover={{ outline: 'none' }} borderWidth={0} fontWeight='semibold' fontSize='sm' placeholder='github.com/user' />
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}