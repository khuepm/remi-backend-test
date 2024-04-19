#Development

Go to each service folder and install dependencies

```sh
cd ws-server && yarn
```

### Development

Just run and visit http://localhost:3000/
Just run and visit http://localhost:3020/ for check websocket is OK

```bash
yarn dev
```

### Test

To test the App, run

```bash
yarn test
```


### Build

To build the App, run

```bash
yarn build
```

And you will see the generated file in `dist` that ready to be served.


### Docker
Install Docker then run

```sh
docker-compose up
```

#Folder Structure

```
.
├── Dockerfile
├── README.md
├── docker-compose.yml      // For development purpose
└── ws-server
    └── src
```

# To Deploy

Go to each folder you want to deploy, run `npm run deploy`
