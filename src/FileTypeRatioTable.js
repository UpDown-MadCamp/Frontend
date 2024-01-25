import React from 'react';
import styles from './FileList.module.css';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
const FileTypeRatioTable = ({ fileTypeRatio, fileSizeRatio }) => {
  const data = {
    labels: ['jpg', 'png'],
    datasets: [
      {
        label: 'File Type Distribution',
        data: [50, 50], // Assuming 50% jpg and 50% png
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Light green
          'rgba(54, 162, 235, 0.6)', // Light blue
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const transformRatiosToChartData = (ratios) => {
    console.log(ratios);
    // Extract file types and their corresponding ratios
    const labels = Object.keys(ratios);
    const data = Object.values(ratios);
    //console.log(labels);
    // Define colors for the chart
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const backgroundColors = labels.map((label) => label === 'jpg'||label === 'jpeg' ? 'rgba(75, 192, 192, 0.6)' : 
                                                    label ==='png' ? 'rgba(54, 162, 235, 0.6)' : 
                                                    label ==='pdf' ? 'rgba(208, 215, 211, 0.53)' : 
                                                    label ==='ppt'||label==='pptx' ? 'rgba(235, 207, 248, 0.65)' : 
                                                    label ==='xls'||label ==='xlsx' ? 'rgba(253, 208, 195, 0.67)' : 
                                                    label ==='doc'||label==='docx' ? 'rgba(254, 234, 235, 0.62)' : 
                                                    label ==='hwp'||label==='hwpx' ? 'rgba(239, 196, 215, 0.51)' :
                                                    label ==='mp3' ? 'rgba(199, 207, 254, 0.82)' :   
                                                    label ==='mp4' ?  'rgba(200, 215, 213, 0.54)' : 
                                                    `rgba(${r}, ${g}, ${b}, 0.6)`);
    const borderColors = labels.map((label) => label === 'jpg' ? 'rgba(75, 192, 192, 1)' : 
                                                label ==='png' ? 'rgba(54, 162, 235, 0.6)' :
                                                label ==='pdf' ? 'rgba(208, 215, 211, 0.53)' : 
                                                label ==='ppt'||label==='pptx' ? 'rgba(235, 207, 248, 0.65)' : 
                                                label ==='xls'||label ==='xlsx' ? 'rgba(253, 208, 195, 0.67)' : 
                                                label ==='doc'||label==='docx' ? 'rgba(254, 234, 235, 0.62)' : 
                                                label ==='hwp'||label==='hwpx' ? 'rgba(239, 196, 215, 0.51)' :
                                                label ==='mp3' ? 'rgba(199, 207, 254, 0.82)' :   
                                                label ==='mp4' ?  'rgba(200, 215, 213, 0.54)' : 
                                                `rgba(${r}, ${g}, ${b}, 0.6)`);
    
    // Construct the data object for the chart
    return {
      labels,
      datasets: [
        {
          label: 'File Type Distribution',
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  };

  const transformSizeRatiosToChartData = (sizeRatios) => {
    const labels = Object.keys(sizeRatios);
    const data = Object.values(sizeRatios);
  
    // 차트 색상을 정의합니다. 필요에 따라 수정하실 수 있습니다.
    const backgroundColors = labels.map((label) => {
      switch (label) {
        case 'jpg': case 'jpeg':
          return 'rgba(75, 192, 192, 0.6)';
        case 'png':
          return 'rgba(54, 162, 235, 0.6)';
        // 나머지 파일 타입에 대한 색상을 정의하십시오.
        default:
          return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      }
    });
  
    const borderColors = backgroundColors.map(color => color.replace('0.6', '1'));
  
    return {
      labels,
      datasets: [
        {
          label: 'File Size Distribution',
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  };
  
  const data_r = transformRatiosToChartData(fileTypeRatio);
  const fileSizeChartData = transformSizeRatiosToChartData(fileSizeRatio);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  
  return (
    <>
    <table className={styles.container}>
      <thead className={styles.header}>
        <tr className={styles.fileItem}>
          <th className={styles.fileName}>파일 타입</th>
          <th className={styles.fileName}>비율 (%)</th>
          <th className={styles.fileName}>용량 별 비율 (%)</th>
        </tr>
      </thead>
      
      <tbody >
        {Object.entries(fileTypeRatio).map(([type, ratio]) => (
          <tr key={type} className={styles.fileItem}>
            <td className={styles.fileName}>{type}</td>
            <td className={styles.fileName}>{ratio.toFixed(2)}</td>
            <td className={styles.fileName}>{fileSizeRatio[type] ? fileSizeRatio[type].toFixed(2) : '0.00'}</td>
          </tr>
        ))}
      </tbody>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h3>파일 개수 분포</h3>
        <div style={{ maxWidth: '25%', margin: '5%' }}>
          <Pie data={data_r} options={options} />
        </div>
        <h3>파일 용량 분포</h3>
        <div style={{ maxWidth: '25%', margin: '5%' }}>
          <Pie data={fileSizeChartData} options={options} />
        </div>
      </div>
    </table>
    
    </>
  );
};

export default FileTypeRatioTable;