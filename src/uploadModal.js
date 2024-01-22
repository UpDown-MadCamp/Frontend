import React, { useState } from 'react';
import './SignInModal.css';
import axios from 'axios';

function UploadModal({ formData, onClose }) {

  //const [formData, setFormData] = useState({props.formData});
  const handleChange = () => {

  };
  const handleSubmit = () => {

  }

  const delete_file = () => {

  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>{formData.name}</h4>
        <h5>size : {formData.size}B</h5>
        <h5>key : {formData.key}</h5>
        <form onSubmit={handleSubmit}>      
          <div className="modal-actions">
            <button type="button" onClick={onClose}>취소</button>
            <button type="submit" onClick={delete_file}>삭제</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;