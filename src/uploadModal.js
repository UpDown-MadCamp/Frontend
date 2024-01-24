import React, { useState } from 'react';
import './SignInModal.css';
import axios from 'axios';
import { setFiles } from './api';

function UploadModal({ formData, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [filename, setFilename] = useState(formData.filename);
  const handleChange = () => {

  };
  const handleSubmit = () => {

  }

  const handleFilenameClick = () => {
    setIsEditing(true);
    const newFilename = window.prompt('Enter new filename:', filename);
    if (newFilename) {
      
      setFilename(newFilename+"."+ formData.filename.split('.').pop().toLowerCase());
    }
    setIsEditing(false);
  };

  const delete_file = async () => {
    console.log(formData.key)
    try {
      const response = await axios.delete('/api/files/delete/' + formData.key);
      setFiles();
      alert("File deleted successfully");
      console.log(response.message);
  } catch (error) {
      console.error(error);
      alert("Error deleting the file");
  }
  }

const edit_file = async () => {
    console.log(formData.key)
    if (filename === formData.filename) {
        alert('파일 제목을 눌러 수정해주세요');
        return;
    }

    try {
        const response = await axios.put('/api/files/edit/' + formData.key, {
            newFilename: filename
        });
        setFiles();
        console.log(response.data.message);
    } catch (error) {
        console.error(error);
        alert("Error editing the file");
    }
}

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4 onClick={handleFilenameClick}>{filename}</h4>
        <h5>size : {formData.size}B</h5>
        <h5>key : {formData.key}</h5>
        <h5>extension : {formData.filename.split('.').pop().toLowerCase()}</h5>
        <h5>gridFS : {formData.isGrid? ("true"):("false")}</h5>
        <form onSubmit={handleSubmit}>      
          <div className="modal-actions">
            <button type="button" onClick={edit_file} style={{marginRight:"40%"}}>수정</button>
            <button type="button" onClick={onClose} style={{marginLeft: "10%"}}>취소</button>
            <button type="button" onClick={delete_file} style={{backgroundColor:"lightcoral", marginLeft: "5%"}}>삭제</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;