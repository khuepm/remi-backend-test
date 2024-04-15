#Development

Go to each service folder and install dependencies

```sh
cd ws-server && npm install && cd -
```

Install Docker then run

```sh
docker-compose up
```

#Flow

![Screenshot](notification-service.png)

#Folder Structure

```
.
├── Dockerfile
├── README.md
├── docker-compose.dev.yml      // For development purpose
├── deploy-services             // Deploy this folder on server
│   ├── Dockerfile
│   ├── docker-compose.prod.yml
│   ├── mongo
│   └── redis
├── publisher
│   ├── nodemon.json
│   └── src
├── receiver
│   └── src
└── ws-server
    └── src
```

# To Deploy

Go to each folder you want to deploy, run `npm run deploy`

Update: Folder `./deploy-services` is being deprecated
