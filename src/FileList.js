import React, { useState } from 'react';
import styles from './FileList.module.css';
import UploadModal from './uploadModal';

const FileList = ({ files, totalSize }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    size: ''
  });

  const handleOpenModal = (file) => () => {
    setFormData(file);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>My uploaded files</div>
      {files.map((file, index) => (
        <div key={index} className={styles.fileItem} onClick={handleOpenModal(file)}>
          <span className={styles.fileName}>{index + 1}. {file.name}</span>
          <span className={styles.fileKey}>{file.key}</span>
          <span className={styles.fileSize}>{file.size}</span>
        </div>
      ))}
      <div className={styles.totalSize}>{totalSize}</div>
      {isModalOpen && <UploadModal formData={formData} onClose={handleCloseModal} />}
    </div>
  );
};

export default FileList;