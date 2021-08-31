# 이미지 full
FROM node:latest

RUN npm install -g pm2 node-gyp sequelize-cli

#/app 디렉토리 생성
RUN mkdir -p /api
# /app 디렉토리를 WORKDIR로 설정
WORKDIR /api

# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /api
# npm install 을 실행
RUN npm install

# 환경변수 NODE_ENV의 값을 production로 설정
ENV NODE_ENV "production"

# 가상 머신에 오픈할 포트
EXPOSE 3000

# 컨테이너에서 실행될 명령을 지정
# CMD ["npm", "start"]
CMD ["pm2-docker", "./bin/server.js"]
#CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
