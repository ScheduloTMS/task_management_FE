import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from "react-icons/fa";
import "./Uploads.css";
import { uploadAssignment } from "../../services/uploadService";

const Uploads = ({ taskId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async () => {
    if (!taskId || files.length === 0) {
      alert("No file or taskId missing");
      return;
    }

    setUploading(true);
    try {
      const res = await uploadAssignment(files[0].file, taskId);
      console.log("Upload success:", res.data);
      alert("Assignment uploaded successfully!");
      setFiles([]);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
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
        <input type="file" id="fileInput" onChange={handleFileSelect} hidden />
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

      {files.length > 0 && (
        <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Assignment"}
        </button>
      )}
    </div>
  );
};

export default Uploads;
