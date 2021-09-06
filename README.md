A decentralized P2P rent-anything platform.
![home](./home.png)
![home](./marketplace.png)

Instructions to run locally (make sure to update the .env file):

```
git clone -b main https://github.com/eremitik/renty.git
cd renty && npm i
cp .env.example .env        //copy in your creds
npm run dev
```

EC2 Setup instructions:

1. Create free instance of EC2, Ubuntu 18.04. Set security change with HTTP.
2. SSH into EC2, and do the following:

[install node, nginx, pm2]

```
curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash
```

[update node]

```
npm cache clean -f
npm install -g n
sudo n stable
```

[clone repo, prep]

```
git clone -b main https://github.com/eremitik/renty.git
cd renty && sudo npm i
sudo cp .env.example .env   //copy in your creds, change environment to 'PROD'
sudo vim .env               //enter DB password + JWT token
sudo npm run build
```

[setup nginx]

```
sudo vim /etc/nginx/sites-available/default
```

amend file as:

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name localhost;
  root /home/ubuntu/renty/build;
  index index.html;

  location /users/ {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }

  location /items/ {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }

  location /order/ {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }

  location /stripe/ {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
}

```

[start server + nginx]

```
sudo pm2 start server/index.js
sudo systemctl start nginx
```
