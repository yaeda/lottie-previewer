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
    <div className="container">
      <header className="header">
        <h1 className="title">Lottie Previewer</h1>
        <p className="lead monospace">
          <span className="keyword">SIMPLE</span>: just drop lottie file
        </p>
        <p className="lead monospace">
          <span className="keyword">SECURE</span>: don't send/store your data
          anywhere
        </p>
      </header>
      <div
        className={`content ${isDragActive ? "drag_active" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="monospace">Drop the files here ...</p>
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
          <p className="monospace">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      <footer className="footer monospace">
        by
        <a
          href="https://twitter.com/yaeda"
          target="_blank"
          rel="noopener noreferrer"
        >
          @yaeda
        </a>
        on
        <a
          href="https://github.com/yaeda/lottie-previewer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://unpkg.com/simple-icons@3.3.0/icons/github.svg"
            alt="GitHub Logo"
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
