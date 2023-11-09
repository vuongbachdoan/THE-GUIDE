import React, { useState, useRef } from "react";
import { registerIVSQualityPlugin, registerIVSTech } from "amazon-ivs-player";
import videojs from "video.js";
import { Box, Button, Flex, Input, Spinner } from "@chakra-ui/react";

const DEFAULT_POSITION = "auto";
const TRANSITION = "100ms ease-in-out";

export const LivestreamViewerJoin = () => {
    const divEl = React.useRef(null);
    const videoEl = React.useRef(null);
    const [isJoin, setIsJoin] = React.useState(false);
    const [linkUrl, setLinkUrl] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (isJoin && linkUrl) {
            setIsLoading(true);
            const script = document.createElement('script');

            script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js';
            script.async = true;

            document.body.appendChild(script);

            script.onload = () => {
                // eslint-disable-next-line no-undef
                if (IVSPlayer.isPlayerSupported) {
                    // eslint-disable-next-line no-undef
                    const player = IVSPlayer.create();
                    player.attachHTMLVideoElement(document.getElementById('video-player'));
                    player.load(linkUrl);
                    player.play();
                    setIsLoading(false);
                }
            }

            return () => {
                document.body.removeChild(script);
            }
        }
    }, [isJoin]);


    return (
        <>
            {
                isJoin ?
                    <div ref={divEl}>
                        <video
                            id="video-player"
                            ref={videoEl}
                            playsInline
                            autoPlay
                            height={300}
                            muted
                        />
                    </div>
                    :
                    <Flex
                        flexDirection='row'
                        columnGap={3}
                        width='100%'
                        margin={3}
                        maxWidth={1024}
                    >
                        <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} borderRadius={10} placeholder="Room URL" />
                        <Button borderRadius={10} backgroundColor='#FF8F46' _hover={{backgroundColor: '#FF8F46'}} onClick={() => setIsJoin(true)}>{isLoading ? <Spinner/> : 'Join room'}</Button>
                    </Flex>
            }
        </>

    );
};
