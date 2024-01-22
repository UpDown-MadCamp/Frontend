import React from 'react';
import styles from './FileList.module.css';

const FileList = ({ files, totalSize }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>My uploaded files</div>
      {files.map((file, index) => (
        <div key={index} className={styles.fileItem}>
          <span className={styles.fileName}>{index + 1}. {file.name}</span>
          <span className={styles.fileKey}>{file.key}</span>
          <span className={styles.fileSize}>{file.size}</span>
        </div>
      ))}
      <div className={styles.totalSize}>{totalSize}</div>
    </div>
  );
};

export default FileList;