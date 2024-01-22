import axios from 'axios';
import { useAuth } from './AuthContext';



// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:5000', // API의 기본 URL을 설정
  withCredentials: true, // CORS 관련 설정
  headers: {
    'Content-Type': 'application/json',
    
  },
});


// 로그인 요청 함수
const login = async (username_c, password) => {
  
  try {
    const response = await api.post('/auth/login', { username: username_c, password: password });
    if (response.status === 200){
    console.log('로그인 성공:', response.data);
    return response;
    } else {
      //setIsLoggedIn(false);
      console.log( response.data);
      return response;
    }
  } catch (error) {
    // 오류 처리
    console.error('로그인 오류:', error);
    throw error;
  }
};

export { login };


const download = async (private_key) => {
  
  try {
    const response = await api.post('/download', { private_key: private_key });
    if (response.status === 200){
    console.log('다운로드 성공:', response.data);
    return response;
    } else {
      //setIsLoggedIn(false);
      console.log( response.data);
      return response;
    }
  } catch (error) {
    // 오류 처리
    console.error('다운로드 오류:', error);
    throw error;
  }
};

export { download };

const email = sessionStorage.getItem('email');
const files_local = [
  { name: 'file_name1.pdf', size: '15KB', key:'failed to get upload files table' }
];

const setFiles = async () => {
  try{
    const response = await api.post('/files/find',{email : email}, {
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    if (response.status === 200) {
      sessionStorage.removeItem('files');
      sessionStorage.setItem('files', JSON.stringify(response.data.files));
      window.location.reload();
    } else {
      sessionStorage.removeItem('files');
      sessionStorage.setItem('files', JSON.stringify(files_local));
      window.location.reload();
    }

  } catch (error) {
    alert('업로드 목록 불러오기 실패');
    console.error('error',error);
  }
}

export {setFiles};
