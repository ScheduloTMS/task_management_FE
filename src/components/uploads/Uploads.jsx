import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from "react-icons/fa";
import "./Uploads.css";
import { submitAssignment } from "../../services/assignmentService";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";

const Uploads = ({ taskId }) => {
  const auth = useRecoilValue(authState);
  const token = auth?.token;
  const userId = auth?.userId;

  const [files, setFiles] = useState([]);
  const [uploadingIndexes, setUploadingIndexes] = useState([]);

  const handleFiles = async (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    for (let i = 0; i < newFiles.length; i++) {
      const item = newFiles[i];
      setFiles((prev) => [...prev, item]);
      setUploadingIndexes((prev) => [...prev, files.length + i]);

      const formData = new FormData();
      formData.append("taskId", taskId);
      formData.append("userId", userId);
      formData.append("files", item.file);

      try {
        await submitAssignment(formData, token);
        console.log(`Uploaded: ${item.file.name}`);
      } catch (err) {
        console.error(`Failed to upload ${item.file.name}`, err);
      } finally {
        setUploadingIndexes((prev) => prev.filter(index => index !== (files.length + i)));
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleFileSelect = (event) => {
    handleFiles(event.target.files);
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
        <p>
          Drag & Drop files here or <label htmlFor="fileInput">browse</label>
        </p>
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
            {uploadingIndexes.includes(index) ? (
              <span className="uploading-text">Uploading...</span>
            ) : (
              <FaTimes className="remove-icon" onClick={() => removeFile(index)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;
