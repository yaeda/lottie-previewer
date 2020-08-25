import React, { useCallback } from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

function App() {
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/json",
    multiple: false,
  });

  return (
    <div className="container" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default App;
