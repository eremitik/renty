The Mercari for Renting.

EC2 Setup instx:

- Create free instance of EC2, Ubuntu 18.04. Set security change with HTTP.
- SSH into EC2, and do the following:

[install node, nginx, pm2]
curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash

[update node]
npm cache clean -f
npm install -g n
sudo n stable

[clone repo, prep]
git clone https://github.com/eremitik/renty.git
cd renty && sudo npm i
sudo cp .env.example .env
sudo vim .env (enter DB password + JWT token)
sudo npm run build

[setup nginx]
sudo vim /etc/nginx/sites-available/default
amend file as:

```

[start server + nginx]
sudo pm2 start server/index.js
sudo systemctl start nginx
```
