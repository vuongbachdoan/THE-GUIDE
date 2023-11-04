import React from "react";
const {
    isPlayerSupported,
    create: createMediaPlayer,
    PlayerState,
    PlayerEventType
} = window.IVSPlayer;
const { ENDED, PLAYING, READY, BUFFERING } = PlayerState;
const { ERROR } = PlayerEventType;

export const LivestreamViewer = () => {
    const playbackUrl = 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';
    const player = React.useRef(null);
    const video = React.useRef();
    const [loading, setLoading] = React.useState(true);

    // Generic PlayerState event listener
    const onStateChange = React.useCallback(() => {
        const newState = player.current.getState();
        setLoading(newState !== PLAYING);
        // console.log(`Player ${pid.current} State - ${newState}`);
    }, [setLoading]);

    const destroy = React.useCallback(() => {
        if (!player.current) return;

        // remove event listeners
        player.current.removeEventListener(READY, onStateChange);
        player.current.removeEventListener(PLAYING, onStateChange);
        player.current.removeEventListener(BUFFERING, onStateChange);
        player.current.removeEventListener(ENDED, onStateChange);
        // player.current.removeEventListener(ERROR, onError);

        // delete and nullify player
        player.current.pause();
        player.current.delete();
        player.current = null;
        video.current.removeAttribute('src'); // remove possible stale src

        // reset player state controls to initial values
        // resetControls();

        create();
    }, [onStateChange]);

    React.useEffect(() => {
        create();
    }, [])

    const create = () => {
        if (!isPlayerSupported) return;

        // If a player instnace already exists, destroy it before creating a new one
        if (player.current) destroy();

        player.current = createMediaPlayer();
        video.current.crossOrigin = 'anonymous';
        player.current.attachHTMLVideoElement(video.current);

        // player.current.addEventListener(READY, onStateChange);
        // player.current.addEventListener(PLAYING, onStateChange);
        // player.current.addEventListener(BUFFERING, onStateChange);
        // player.current.addEventListener(ENDED, onStateChange);
        // player.current.addEventListener(ERROR, onError);

        player.current.load(playbackUrl)
    }

    return (
        <video ref={video} playsInline muted />
    );
}
