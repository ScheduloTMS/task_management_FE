import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from "react-icons/fa";
import "./Uploads.css";

const Uploads = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files).map(file => ({
      file,
      preview: URL.createObjectURL(file), 
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview); 
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="upload-container">
      
      <div 
        className="drop-zone" 
        onDrop={handleDrop} 
        onDragOver={(e) => e.preventDefault()}
      >
        <FaCloudUploadAlt className="upload-icon" />
        <p>Drag & Drop files here or <label htmlFor="fileInput">browse</label></p>
        <input type="file" id="fileInput" multiple onChange={handleFileSelect} hidden />
      </div>

      
      <div className="file-list">
        {files.map((item, index) => (
          <div key={index} className="file-item">
            <a href={item.preview} target="_blank" rel="noopener noreferrer" className="file-link">
              {item.file.type.startsWith("image/") ? (
                <img src={item.preview} alt="Preview" className="file-preview" />
              ) : (
                <FaFileAlt className="file-icon" />
              )}
              <span className="file-name">{item.file.name}</span>
            </a>
            <FaTimes className="remove-icon" onClick={() => removeFile(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;