import React, { useCallback, useState } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import Lottie from "react-lottie";

function App() {
  const [lottieData, setLottieData] = useState<Object[]>([]);
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          setLottieData([data]);
        } catch {
          // TODO: show error in UI
        }
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/json",
    // TODO: support multiple files
    multiple: false,
  });

  return (
    <div className="container" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : lottieData.length > 0 ? (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: lottieData[0],
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          width={400}
          height={400}
        />
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default App;
