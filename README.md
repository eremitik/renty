The Mercari for Renting.

EC2 Setup instx:

- Create free instance of EC2, Ubuntu 18.04. Set security change with `HTTP`.
- SSH into EC2, and run this script to install node, mongoDB, pm2, nginx:
  `curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash`
- Git clone this repo into root of EC2
- `cd renty && sudo npm i`
- Create `.env` file in the folder `renty`, using `.env.example` as guide
- `sudo vim /etc/nginx/sites-available/default` and amend file as:
  ``

- `sudo pm2 start server/index.js`
- `sudo npm run build`
- `sudo systemctl start nginx`
-
