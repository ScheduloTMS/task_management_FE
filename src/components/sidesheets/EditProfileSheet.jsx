import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './EditProfileSheet.css';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../states/authState';
import { updateUserProfilePhoto } from "../../services/userService.js";

const EditProfileSheet = ({ onClose }) => {
  const auth = useRecoilValue(authState); // ✅ Hook must be called outside useEffect
  const setAuth = useSetRecoilState(authState);
  const { token } = useRecoilValue(authState);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("modal-open");

    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("userId");

    setName(storedName || "");
    setEmail(storedEmail || "");
    setUserId(storedId || "");

    if (auth?.photo) {
      setPreviewUrl(`data:image/png;base64,${auth.photo}`);
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [auth]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image smaller than 2MB");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    if (!profileImage) {
      onClose();
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await updateUserProfilePhoto(profileImage, token);
      console.log("Profile updated:", response);
      alert("Profile photo updated successfully!");

      if (response?.body?.photo) {
        localStorage.setItem("photo", response.body.photo);

        setAuth((prev) => ({
          ...prev,
          photo: response.body.photo,
        }));
      }

      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile photo.");
    }
  };

  return (
    <>
      <div className="modal-backdrop show"></div>

      <div className="modal fade show d-block custom-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content animate-popup">
            <div className="modal-header">
              <h5 className="modal-title">Profile</h5>
              <button type="button" className="close1" onClick={onClose}>x</button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <div className="profile-picture-container">
                  <div className="profile-preview-round">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile preview" className="preview-image-round" />
                    ) : (
                      <div className="empty-preview-round">
                        <FontAwesomeIcon icon={faUserCircle} className="fallback-icon-round" />
                      </div>
                    )}
                  </div>
                  <div className="profile-upload">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <button className="upload-button" onClick={handleUploadClick}>
                      Upload Image
                    </button>
                    <p className="max-size">max 2MB</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">ID</label>
                <input type="text" className="form-control" value={userId} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} readOnly />
              </div>

              <button className="custom-save-button" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileSheet;