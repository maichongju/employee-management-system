# Employee Management System (Backend)

## Prerequisites

- Docker
- nodejs
- Tool to access MySQL database ([HeidiSQL](https://www.heidisql.com/)) (Optional)

## Setup

Unzip `data.zip` into `data` folder.

## Start (Backend Only)

There are three services in `docker-compose.yml`, where `mysql` database and `supertokens` must start in the docker.

- `app`: backend app (Optional)
- `mysql`: mysql database store all information (MUST START)
- `supertokens`: authentication backend (MUST START)

### Start backend app locally

1. `npm install` to install dependencies
2. Create a file named `.env` in the root directory of the project. See [Environment Variables](#environment-variables) for more detail.

3. Execute `docker-compose -f "docker-compose.yml" up -d --build mysql supertoken`
4. Execute `npx prisma generate`
5. `npm start` to start the server in development mode. It use `nodemon` for instance restart.
6. backend app can be access by `http://localhost:3000`

### Start everything in docker

1. Create a file named `.env-docker` in the root directory of the project. See [Environment Variables](#environment-variables) for more detail.
2. Execute `docker-compose up -d`
3. backend app can be access by `http://localhost:3000`

### Environment Variables

`.env` file is used to configure environment variables. It should located in the root of the project. The file should including the following variables:
> For `.env-docker`, `localhost` MUST replace with the container name. By default, `mysql` for database, `supertoken` for supertokens authentication.

- `PORT`: port of the backend app
- `DATABASE_URL`: connection string of the database. See [Connection Strings](https://www.prisma.io/docs/reference/database-reference/connection-urls) for more detail.
- `SUPERTOKENS_URL`: connection string of the authentication. 
- `OPENWEATHERMAP_API_KEY`: API key of [OpenWeatherMap](https://openweathermap.org/api).
- `WEATHERBIT_API_KEY`: API key of [WeatherBit](https://www.weatherbit.io/).
- `NODE_ENV`: environment mode. It should be `development` or `production`.
- `DISABLE_SESSION_VERIFICATION`: If it is `true`, the session will not be verified. FOR DEVELOPMENT ONLY.

Sample `.env` file:

```text
PORT = 3000
DATABASE_URL="mysql://user:password@localhost:3306/db"
SUPERTOKENS_URL="http://localhost:3567"
OPENWEATHERMAP_API_KEY="YOUR_API_KEY"
WEATHERBIT_API_KEY="YOUR_API_KEY"
NODE_ENV="development"
DISABLE_SESSION_VERIFICATION="true"
```

Sample `.env-docker` file:

```text
PORT = 3000
DATABASE_URL="mysql://user:password@mysql:3306/db"
SUPERTOKENS_URL="http://supertoken:3567"
OPENWEATHERMAP_API_KEY="YOUR_API_KEY"
WEATHERBIT_API_KEY="YOUR_API_KEY"
NODE_ENV="development"
DISABLE_SESSION_VERIFICATION="false"
```

### Database

`data.zip` contain the physical copy of the database. Unzip the data.zip into `data` folder. Make sure all the file are in the root directory of the data folder.

More information about database can be found in [here](docs/database.md).

## API

Detail of the API can be found in [API Documentation](docs/API.md)

## TODO

- [x] Add API key check (supertokens)
