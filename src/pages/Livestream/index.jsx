import { Box, Button, Flex, Input, InputGroup, InputRightElement, Stack, VStack, useColorModeValue } from '@chakra-ui/react';
import IVSBroadcastClient, { BASIC_LANDSCAPE } from 'amazon-ivs-web-broadcast'
import { useEffect, useState } from 'react';
import { MdCallEnd, MdVideocamOff, MdVideocam, MdSettings } from 'react-icons/md';
import { IoMdMicOff, IoMdMic } from 'react-icons/io';
import { LivestreamChat } from './components/LivestreamChat';

export const Livestream = () => {
    const [client, setClient] = useState(null);
    const bg = useColorModeValue('#FFF', 'gray.700');

    useEffect(() => {
        handlePermissions()
            .then(() => {
                setClient(IVSBroadcastClient.create({
                    streamConfig: {
                        maxResolution: {
                            width: 1080,
                            height: 1920,
                        },
                        maxFramerate: 30,
                        /**
                         * maxBitrate is measured in kbps
                         */
                        maxBitrate: 3500,
                    },
                    streamConfig: BASIC_LANDSCAPE,
                    ingestEndpoint: process.env.REACT_APP_INGEST_ENPOINT,
                }));
            })
    }, []);

    useEffect(() => {
        attachMediaDevice();
    }, [client]);

    const attachMediaDevice = async () => {
        if (client) {
            const previewEl = document.getElementById('preview');
            client.attachPreview(previewEl);
            const devices = await navigator.mediaDevices.enumerateDevices();
            window.videoDevices = devices.filter((d) => d.kind === 'videoinput');
            window.audioDevices = devices.filter((d) => d.kind === 'audioinput');
            const streamConfig = IVSBroadcastClient.BASIC_LANDSCAPE;

            Promise.all([
                window.microphoneStream = await navigator.mediaDevices.getUserMedia({
                    audio: { deviceId: window.audioDevices[0].deviceId },
                }),
                window.cameraStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: window.videoDevices[0].deviceId,
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
                client.addAudioInputDevice(window.microphoneStream, 'MIC_1')
                client.addVideoInputDevice(window.cameraStream, 'CAMERA_1', { index: 0 })
            })
        }
    }


    const [joiningStatus, setJoiningStatus] = useState('NONE');
    useEffect(() => {
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

    const handlePermissions = async () => {
        let permissions = {
            audio: false,
            video: false,
        };
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            for (const track of stream.getTracks()) {
                track.stop();
            }
            permissions = { video: true, audio: true };
        } catch (err) {
            permissions = { video: false, audio: false };
            alert(err.message);
        }
        // If we still don't have permissions after requesting them display the error message
        if (!permissions.video) {
            alert('Failed to get video permissions.');
        } else if (!permissions.audio) {
            alert('Failed to get audio permissions.');
        }
    }

    const [isMute, setIsMute] = useState(false);
    useEffect(() => {
        handleMute();
    }, [isMute]);
    const handleMute = () => {
        if (client) {
            let audioStream = client.getAudioInputDevice('MIC_1');
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
            let videoStream = client.getVideoInputDevice('CAMERA_1').source;
            if (isCameraOn) {
                videoStream.getVideoTracks()[0].enabled = true;
            } else {
                videoStream.getVideoTracks()[0].enabled = false;
            }
        }
    }

    return (
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
                        <canvas id='preview' style={{height: '100%'}}></canvas>
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
                            <Button borderRadius={15}><MdSettings size={22} /></Button>
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
    );
}
