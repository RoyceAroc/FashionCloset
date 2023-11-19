import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";
import React, { ReactNode, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [isRecording, setIsRecording] = React.useState(false);
  const frameTimestampsRef = React.useRef([]);
  const fpsIntervalRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const currentTimestamp = Date.now();
    frameTimestampsRef.current.push(currentTimestamp);
    const imageData = {
      instanceId: "randomString",
      imageSrc: imageSrc,
    };

    Streamlit.setComponentValue({ imageData });
  }, [webcamRef, setImageSrc]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  useEffect(() => {
    if (isRecording) {
      const captureFrame = () => {
        capture();
      };

    } else {
      cancelAnimationFrame(fpsIntervalRef.current);
      frameTimestampsRef.current = [];
    }

    return () => {
      cancelAnimationFrame(fpsIntervalRef.current);
      frameTimestampsRef.current = [];
    };
  }, [isRecording, triggerCapture]);  // Include triggerCapture as a dependency
  return (
    <>
      <Webcam
        ref={webcamRef}
        forceScreenshotSourceSize
        screenshotFormat="image/jpeg"
        videoConstraints={{
          height: 720,
          width: 1280,
        }}
        height="360"
        width="640"
        audio={false}
        mirrored={true}
        video={isRecording}
      />
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      {imageSrc && <img src={imageSrc} alt="captured" />}
    </>
  );
};

class MyComponent extends StreamlitComponentBase {
  state = { isFocused: false };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  render = (): ReactNode => {
    const { theme } = this.props;
    const style: React.CSSProperties = {};

    if (theme) {
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`;
      style.border = borderStyling;
      style.outline = borderStyling;
    }

    return (
      <div>
        <WebcamCapture />
      </div>
    );
  };
}

export default withStreamlitConnection(MyComponent);
