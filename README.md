# Node.js-MySQL
nodejs + express(ejs) + mysql를 이용하여 구축한 간단한 웹사이트입니다.

## 설정 
1. 저장소 복제 
```bash
git clone https://github.com/your-username/node-express-mysql-example.git
```

2. 의존성 설치
```bash
cd node-express-mysql-example
npm install
```

3. MySQL 데이터베이스 설정
   
- 새로운 MySQL 데이터베이스를 생성합니다.
config/db.js에서 데이터베이스 구성을 자신의 데이터베이스 자격 증명으로 업데이트합니다.

5. 실행
```bash
npm start
```

5. 브라우저를 열고 `http://localhost:5000`로 이동하여 어플리케이션을 확인하세요.

## 프로젝트 구조
- app.js: 어플리케이션의 주 진입점.
- routes/: 라우트 정의가 포함된 디렉토리.
- views/: HTML을 렌더링하기 위한 EJS 템플릿.
- public/: 정적 파일 (CSS, 이미지 등).
- config/: 데이터베이스 구성.
- models/: 데이터베이스 모델.
  
## 종속성:
- express: Node.js의 웹 프레임워크.
- ejs: 동적 콘텐츠를 렌더링하기 위한 템플릿 엔진.
- mysql2: Node.js용 MySQL 라이브러리.

