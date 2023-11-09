import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
const IVSPackage = window.IVSPlayer;

const LivestreamViewer = ({ stream }) => {
    const videoElement = useRef(null);
    const player = useRef(null);

    useEffect(() => {
        if (!IVSPackage.isPlayerSupported) {
            throw new Error('IVS Player is not supported in this browser');
        }

        player.current = IVSPackage.create();
        player.current.attachHTMLVideoElement(videoElement.current);
        attachListeners();

        loadAndPlay(stream);

        // Clean up on unmount
        // return () => {
        //     if (player.current) {
        //         player.current.removeEventListener();
        //         player.current = null;
        //     }
        // };
    }, [stream]);

    const loadAndPlay = (stream) => {
        player.current.setAutoplay(true);
        player.current.load(stream);
    }

    const attachListeners = () => {
        const { ErrorType, PlayerEventType, PlayerState } = IVSPackage;
    
        for (let state of Object.values(PlayerState)) {
            player.current.addEventListener(state, () => {
                console.log(state);
            });
        }
    
        player.current.addEventListener(PlayerEventType.INITIALIZED, () => {
            console.log('INITIALIZED');
        });
    
        player.current.addEventListener(PlayerEventType.ERROR, (error) => {
            const statusTooManyRequests = 429;
            if (error.type === ErrorType.NOT_AVAILABLE && error.code === statusTooManyRequests) {
                console.error('Concurrent-viewer limit reached', error);
            } else {
                console.error('ERROR', error);
            }
        });
    
        player.current.addEventListener(PlayerEventType.QUALITY_CHANGED, (quality) => {
            console.log('QUALITY_CHANGED', quality);
        });
    
        // This event fires when text cues are encountered, such as captions or subtitles
        player.current.addEventListener(PlayerEventType.TEXT_CUE, (cue) => {
            console.log('TEXT_CUE', cue.startTime, cue.text);
        });
    
        // This event fires when embedded Timed Metadata is encountered
        player.current.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
            console.log('Timed metadata', cue.text);
        });
    }

    return (
        <video id="video-player" ref={videoElement}/>
    );
}

export const LivestreamViewerJoin = () => {
    const [stream, setStream] = useState('https://0bf28f2401c9.us-east-1.playback.live-video.net/api/video/v1/us-east-1.955228589631.channel.v4c7evGHqxKq.m3u8');
    const [showPlayer, setShowPlayer] = useState(false);

    const handleNextClick = () => {
        setShowPlayer(true);
    }

    if (showPlayer) {
        return <LivestreamViewer stream={stream} />;
    }

    return (
        <Flex
            flexDirection='row'
            columnGap={1}
            width='100%'
        >
            <Input borderRadius={15} type="text" value={stream} onChange={e => setStream(e.target.value)} />
            <Button backgroundColor='#FF8F46' _hover={{backgroundColor: '#FF8F46'}} borderRadius={15} onClick={handleNextClick}>Next</Button>
        </Flex>
    );
}