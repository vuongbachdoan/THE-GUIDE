import React from "react";

import { CONTROLS } from "./config";
import { MdAspectRatio, MdClose, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { Button } from "@chakra-ui/react";

export const PlayerControls = ({
  controls,
  muted,
  onClose,
  onResize,
  onMute
}) => {
  const renderControl = (control, key) => {
    let Icon;
    let callback;

    switch (control) {
      case CONTROLS.close:
        Icon = <MdClose />;
        callback = onClose;
        break;
      case CONTROLS.mute:
        Icon = muted ? <MdVolumeOff /> : <MdVolumeUp />;
        callback = onMute;
        break;
      case CONTROLS.resize:
        Icon = <MdAspectRatio />;
        callback = onResize;
        break;
      default:
        return null;
    }

    return (
      <Button key={key} className="PlayerControls-button" onClick={callback}>
        {
          Icon
        }
      </Button>
    );
  };

  return (
    <div className="PlayerControls">
      {controls.map((control, i) => renderControl(control, i))}
    </div>
  );
};
