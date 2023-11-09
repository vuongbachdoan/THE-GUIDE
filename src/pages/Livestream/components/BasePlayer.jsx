import React, { useEffect, useRef } from "react";

export const BasePlayer = (props) => {
  const videoPlayer = useRef(null);

  useEffect(() => {
    props.initializePlayer(videoPlayer.current);
  }, []);

  return (
    <video
      className="js-plyr plyr"
      playsInline
      ref={videoPlayer}
      style={{ width: "100%", height: "100%" }}
    />
  );
};