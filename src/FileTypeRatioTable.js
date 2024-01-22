import React from 'react';
import styles from './FileList.module.css';

const FileTypeRatioTable = ({ fileTypeRatio }) => {
  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr className={styles.fileItem}>
          <th className={styles.fileName}>파일 타입</th>
          <th className={styles.fileName}>비율 (%)</th>
        </tr>
      </thead>
      <tbody >
        {Object.entries(fileTypeRatio).map(([type, ratio]) => (
          <tr key={type} className={styles.fileItem}>
            <td className={styles.fileName}>{type}</td>
            <td className={styles.fileName}>{ratio.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTypeRatioTable;