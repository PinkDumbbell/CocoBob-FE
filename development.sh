echo "> FE Code Deployed"

docker build -t dev-app .

docker run -d --name dev-app 3000:80 dev-app

docker ps -a