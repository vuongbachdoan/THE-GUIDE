import { Box, Button, Flex, Input, InputGroup, InputRightElement, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Stack, Text, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import IVSBroadcastClient, { BASIC_LANDSCAPE } from 'amazon-ivs-web-broadcast'
import React, { useEffect, useState } from 'react';
import { MdCallEnd, MdVideocamOff, MdVideocam, MdSettings } from 'react-icons/md';
import { IoMdMicOff, IoMdMic } from 'react-icons/io';
import { LivestreamChat } from './components/LivestreamChat';
import { ChevronDownIcon, Menu } from 'lucide-react';

export const Livestream = () => {
    const [client, setClient] = useState(null);
    const bg = useColorModeValue('#FFF', 'gray.700');
    const [currentTab, setCurrentTab] = React.useState('Audio');
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAllowedAudio, setIsAllowedAudio] = React.useState(false);
    const [isAllowedVideo, setIsAllowedVideo] = React.useState(false);
    const [currentAudioDevice, setCurrentAudioDevice] = React.useState(null);
    const [currentVideoDevice, setCurrentVideoDevice] = React.useState(null);

    React.useEffect(() => {
        handlePermissions(isAllowedVideo, isAllowedAudio)
            .then(() => {
                if (isAllowedAudio || isAllowedVideo) {
                    setClient(IVSBroadcastClient.create({
                        streamConfig: BASIC_LANDSCAPE,
                        ingestEndpoint: process.env.REACT_APP_INGEST_ENPOINT,
                    }));
                }
            })
    }, [isAllowedAudio, isAllowedVideo]);

    useEffect(() => {
        if (client) {
            attachMediaDevice();
        }
    }, [client]);

    const [audioDevices, setAudioDevices] = React.useState([]);
    const [videoDevices, setVideoDevices] = React.useState([]);

    const attachMediaDevice = async () => {
        if (client) {
            const previewEl = document.getElementById('preview');
            client.attachPreview(previewEl);
            const devices = await navigator.mediaDevices.enumerateDevices();

            let videoDevices = devices.filter((d) => d.kind === 'videoinput');
            window.videoDevices = videoDevices;
            setVideoDevices(videoDevices);

            let audioDevices = devices.filter((d) => d.kind === 'audioinput');
            window.audioDevices = audioDevices;
            setAudioDevices(audioDevices);
        }
    }

    React.useEffect(() => {
        if (videoDevices.length !== 0) {
            setCurrentVideoDevice(videoDevices[0].deviceId);
        }
    }, [videoDevices]);
    React.useEffect(() => {
        if (audioDevices.length !== 0) {
            setCurrentAudioDevice(audioDevices[0].deviceId);
        }
    }, [audioDevices])

    React.useEffect(() => {
        if (currentAudioDevice) {
            handleAttachAudio();
        }
    }, [currentAudioDevice]);

    React.useEffect(() => {
        if (currentVideoDevice) {
            handleAttachVideo();
        }
    }, [currentVideoDevice]);

    const handleAttachAudio = async () => {
        Promise.all([
            window.microphoneStream = await navigator.mediaDevices.getUserMedia({
                audio: { deviceId: currentAudioDevice },
            })
        ]).then(() => {
            client.addAudioInputDevice(window.microphoneStream, currentAudioDevice)
                .catch(() => console.warn('Audio already registered!'))
        })
    }

    const handleAttachVideo = async () => {
        const streamConfig = IVSBroadcastClient.BASIC_LANDSCAPE;
        Promise.all([
            window.cameraStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: currentVideoDevice,
                    width: {
                        ideal: streamConfig.maxResolution.width,
                        max: streamConfig.maxResolution.width,
                    },
                    height: {
                        ideal: streamConfig.maxResolution.height,
                        max: streamConfig.maxResolution.height,
                    },
                },
            })
        ]).then(() => {
            // Try to remove the video device.
            try {
                client.removeVideoInputDevice(currentVideoDevice);
            } catch (error) {
                console.warn('Video not registered!');
            }
    
            // Add the new video device.
            client.addVideoInputDevice(window.cameraStream, currentVideoDevice, { index: 0 })
                .then(() => console.log('Video device added'))
                .catch(() => console.warn('Video already registered!'))
        })
    }
    
    const [joiningStatus, setJoiningStatus] = useState('NONE');
    React.useEffect(() => {
        if (joiningStatus === 'PENDING') {
            joinStream();
        } else if (joiningStatus === 'END') {
            client.stopBroadcast();
            setJoiningStatus('NONE');
        }
    }, [joiningStatus])

    const joinStream = async () => {
        if (client) {
            client
                .startBroadcast(process.env.REACT_APP_STREAM_KEY)
                .then(() => {
                    setJoiningStatus('JOINING')
                })
                .catch((error) => {
                    alert('Something drastically failed while broadcasting!', error);
                })
        }
    }

    const handlePermissions = async (allowVideo, allowAudio) => {
        let permissions = {
            audio: allowAudio,
            video: allowVideo,
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(permissions);
            for (const track of stream.getTracks()) {
                track.stop();
            }
        } catch (err) {
            setIsAllowedAudio(false);
            setIsAllowedVideo(false);
        }
    }

    const [isMute, setIsMute] = useState(false);
    useEffect(() => {
        handleMute();
    }, [isMute]);
    const handleMute = () => {
        if (client) {
            let audioStream = client.getAudioInputDevice(currentAudioDevice);
            if (isMute) {
                audioStream.getAudioTracks()[0].enabled = false;
            } else {
                audioStream.getAudioTracks()[0].enabled = true;
            }
        }
    }

    const [isCameraOn, setIsCameraOn] = useState(true);
    useEffect(() => {
        handleCameraOn();
    }, [isCameraOn]);

    const handleCameraOn = () => {
        if (client) {
            let videoStream = client.getVideoInputDevice(currentVideoDevice).source;
            if (isCameraOn) {
                videoStream.getVideoTracks()[0].enabled = true;
                console.log('Camera turned on');
            } else {
                videoStream.getVideoTracks()[0].enabled = false;
                console.log('Camera turned off');
            }
        }
    }

    const handleAllowMedia = () => {
        setIsAllowedAudio(true);
        setIsAllowedVideo(true);
    }

    return (
        <>
            {
                (isAllowedAudio || isAllowedVideo) ?
                    <>
                        <Box
                            overflow='hidden'
                            width='100%'
                            height='100vh'
                        >
                            <Flex
                                flexDirection='row'
                                width='100%'
                                columnGap={15}
                                padding={3}
                                paddingBottom={3}
                            >
                                <Flex
                                    flex={1}
                                    flexDirection='column'
                                    rowGap={3}
                                >
                                    <Flex
                                        width='100%'
                                        backgroundColor='#000'
                                        borderRadius={20}
                                        overflow='hidden'
                                        flex={1}
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        <canvas id='preview' style={{ height: '100%' }}></canvas>
                                    </Flex>

                                    {
                                        joiningStatus === 'NONE' &&
                                        <InputGroup
                                            size='md'
                                        >
                                            <Input
                                                pr='4.5rem'
                                                type='text'
                                                placeholder='Enter stream key'
                                                borderRadius={12}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button
                                                    isLoading={joiningStatus === 'PENDING'}
                                                    h={30} colorScheme='red'
                                                    onClick={() => setJoiningStatus('PENDING')}
                                                    w='auto'
                                                >
                                                    Join
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    }

                                    {
                                        // (joiningStatus === 'PENDING' || joiningStatus === 'JOINING') &&
                                        true &&
                                        <Flex
                                            flexDirection='row'
                                            width='100%'
                                            // backgroundColor='#CCC'
                                            borderRadius={20}
                                            justifyContent='center'
                                            columnGap={15}
                                        >
                                            <Button borderRadius={15} colorScheme='red' onClick={() => setJoiningStatus('END')}><MdCallEnd size={22} /></Button>
                                            <Button borderRadius={15} onClick={() => {
                                                const status = !isCameraOn;
                                                setIsCameraOn(status)
                                            }}>
                                                {isCameraOn ? <MdVideocam size={22} /> : <MdVideocamOff size={22} />}
                                            </Button>
                                            <Button borderRadius={15} onClick={() => {
                                                const status = !isMute;
                                                setIsMute(status)
                                            }}>
                                                {isMute ? <IoMdMicOff size={22} /> : <IoMdMic size={22} />}
                                            </Button>
                                            <Button onClick={onOpen} borderRadius={15}><MdSettings size={22} /></Button>
                                        </Flex>
                                    }
                                </Flex>

                                <Stack
                                    width={320}
                                    backgroundColor={bg}
                                    borderRadius={15}
                                >
                                    <LivestreamChat />
                                </Stack>
                            </Flex>
                        </Box>

                        <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent
                                borderRadius={20}
                                maxWidth='900px'
                                minHeight='75vh'
                            >
                                <ModalHeader>Settings</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <Flex columnGap={3}>
                                        <Flex
                                            flexDirection='column'
                                            justifyContent='flex-start'
                                            rowGap={1}
                                        >
                                            <Button onClick={() => setCurrentTab('Audio')} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm'>Audio</Text></Button>
                                            <Button onClick={() => setCurrentTab('Video')} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm'>Video</Text></Button>
                                            <Button onClick={() => setCurrentTab('Transcript')} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm'>Transcript</Text></Button>
                                        </Flex>
                                        <Flex flex={1} flexDirection='column'>
                                            {
                                                currentTab === 'Audio' &&
                                                <Select onChange={(e) => setCurrentAudioDevice(e.target.value)} placeholder={currentAudioDevice?.label}>
                                                    {
                                                        audioDevices?.map((item) => (
                                                            <option
                                                                style={{
                                                                    padding: '5px'
                                                                }} value={item.deviceId} key={item.deviceId}>{item.label}</option>
                                                        ))
                                                    }
                                                </Select>
                                            }
                                            {
                                                currentTab === 'Video' &&
                                                <Select onChange={(e) => setCurrentVideoDevice(e.target.value)} placeholder={currentVideoDevice?.label}>
                                                    {
                                                        videoDevices?.map((item) => (
                                                            <option
                                                                style={{
                                                                    padding: '5px'
                                                                }} value={item.deviceId} key={item.deviceId}>{item.label}</option>
                                                        ))
                                                    }
                                                </Select>
                                            }
                                        </Flex>
                                    </Flex>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </>
                    :
                    <Button backgroundColor='#FF8F46' _hover={{ backgroundColor: '#FF8F46' }} onClick={handleAllowMedia} borderRadius={10}>Allow using Camera & Audio</Button>
            }
        </>
    );
}
