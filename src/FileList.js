import React, { useState } from 'react';
import styles from './FileList.module.css';
import UploadModal from './uploadModal';

const FileList = ({ files, totalSize, currentPage_r }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', key: '', size: ''});
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const handleOpenModal = (file) => () => {
    setFormData(file);
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const lastFileIndex = currentPage * filesPerPage;
  const firstFileIndex = lastFileIndex - filesPerPage;
  const currentFiles = files.slice(firstFileIndex, lastFileIndex);

  const totalPages = Math.ceil(files.length / filesPerPage);

  const handlePrevClick = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(current => Math.min(current + 1, totalPages));
  };
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>My uploaded files</div>
      {currentFiles.map((file, index) => (
        <div key={index} className={styles.fileItem} onClick={handleOpenModal(file)}>
          <span className={styles.fileName}>{firstFileIndex + index + 1}. {truncate(file.filename,15)}</span>
          <span className={styles.fileKey}>{file.key}</span>
          <span className={styles.fileSize}>{(file.size/1024).toFixed(2)}KB</span>
        </div>
      ))}
      <div className={styles.totalSize}>{totalSize}</div>
      <div className={styles.pagination}>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>&lt;</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>&gt;</button>
      </div>
      {isModalOpen && <UploadModal formData={formData} onClose={handleCloseModal} />}
    </div>
  );
};

export default FileList;