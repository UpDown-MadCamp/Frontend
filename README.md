
![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/6d7107e1-ac34-49fc-8187-bd3e8a43f935)

# UpDown

***편리한 파일 업로드/다운로드 플랫폼***

→ 프린트 카페 등에서 간단한 한글 개인키만으로 로그인 없이 다운로드 가능

→ 대용량 파일도 업로드/다운로드가 가능한 드라이브 서비스

[UpDown-MadCamp](https://github.com/UpDown-MadCamp)

---

## 개발 환경

**Frontend** : React

**Backend** : NodeJS

**Database** : mongoDB ATLAS

---

## 팀원

**양준원:** 카이스트 산업공학과 22학번

[yangjunwon5899 - Overview](https://github.com/yangjunwon5899)

**조서윤**: 고려대학교 컴퓨터학과 22학번

[seoyuncho - Overview](https://github.com/seoyuncho)

---

## 주요 기능

### 회원가입&로그인

- 로그인 페이지에서 회원 가입 및 로그인
    - 로그인 버튼 눌러서 로그인
    - 구글 로그인 가능
        - 로그인 시 입력한 이메일과 연동
    - 미 가입 시 회원 가입 버튼 눌러 회원가입
        - 비밀번호는 해시 처리되어 저장
    - 로그인 성공 시 로그인 버튼 마이페이지로 변경

![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/d8b918b3-5155-4bf5-ba2a-54e7c1474681)

![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/8e63ba20-8f5d-47b9-9b87-7046ef724cd1)

![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/c96d14e2-e357-4e04-917b-fd27b89fe916)

-9928-26d2e10eb0fc/13a939a8-a264-41f2-9c4f-5eacc5f2923f/Untitled.png)

### 업로드

- 로그인 후 내 파일 업로드
    - 파일 선택하기로 파일 선택, 업로드로 파일 업로드
    - 스위치로 저용량 / 대용량 업로드 모드 변경 가능
        - 저용량: Atlas Cloud 내에 파일을 String으로 저장하는 방식
        - 대용량: GridFs를 이용하여 파일을 쪼개어 저장하는 방식
    - 업로드 시 한글 개인키가 발급되어 파일 리스트에서 확인 가능
        - 형용사 + 명사 (동물이름 / 식물이름) 조합의 한글 개인키
        - 한글 개인키는 중복 발급되지 않음
    - 파일 리스트를 클릭해 파일 이름 수정, 파일 삭제 가능
  
![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/3c253bbc-ec0f-4f8f-b335-3d75bacd08c7)

![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/1df6cdc3-5d04-42bd-9a70-f070f9523cef)

![image](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/6389e45c-816b-4b05-81d1-a99455797edb)

### 다운로드

- 프린트 카페에 방문한 상황
    - 로그인, 파일 다운로드 과정이 번거롭고, 개인정보 유출이 우려됨
- 로그인 없이 한글 개인키로 직접 다운로드
    - 업로드 시 발급받은 한글 개인키를 입력창에 입력
    - download 버튼을 누르면 개인키에 해당하는 파일 바로 다운로드
    - 다양한 파일 형식 지원
        - txt, image(png, jpeg ..), pdf, word(doc, docx, hwp, hwpx), ppt, pptx, mp4, mp3, C ..  등

![image](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/0c340968-035a-4b38-8613-8f3b1bb25b4f)

### 마이페이지

- 업로드 한 파일 한눈에 보고, 회원 정보 수정
    - 내 이름, 이메일 정보 보기
    - 내 정보 수정하기 버튼
        - 이름 변경 가능 (이메일은 사용자 식별 정보이므로 변경 불가)
    - 메일 보내기 버튼
        - 내가 업로드한 모든 파일 내역과 각 개인키를 회원 정보에 등록된 이메일로 받기
        - html, css 형식으로 꾸며진 이메일
    - 전체 업로드 용량, 요금
    - 업로드한 문서 형식을 테이블과 차트로 한 눈에 보기
        - 파일 개수 분포 그래프
        - 파일 용량별 분포 그래프

![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/7f816d29-d944-4e02-8a02-7c9723a189e1)

![Untitled](https://github.com/UpDown-MadCamp/Frontend/assets/103191590/60ff8d3a-95a7-4a51-9702-e5215cfe410f)
