import React, { useState } from 'react';
import './SignInModal.css';
import axios from 'axios';
import { setFiles } from './api';

function UploadModal({ formData, onClose }) {

  //const [formData, setFormData] = useState({props.formData});
  const handleChange = () => {

  };
  const handleSubmit = () => {

  }

  const delete_file = async () => {
    console.log(formData.key)
    try {
      const response = await axios.delete('http://localhost:5000/files/delete/' + formData.key);
      setFiles();
      alert("File deleted successfully");
      console.log(response.message);
  } catch (error) {
      console.error(error);
      alert("Error deleting the file");
  }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>{formData.filename}</h4>
        <h5>size : {formData.size}B</h5>
        <h5>key : {formData.key}</h5>
        <h5>extension : {formData.filename.split('.').pop().toLowerCase()}</h5>
        <form onSubmit={handleSubmit}>      
          <div className="modal-actions">
            <button type="button" onClick={onClose}>취소</button>
            <button type="button" onClick={delete_file}>삭제</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;