# Employee Management System (Backend)

## Prerequisites

- Docker
- nodejs
- Tool to access MySQL database ([HeidiSQL](https://www.heidisql.com/))

## Setup

Unzip `data.zip` into `data` folder.

## Start

There are three services in `docker-compose.yml`, where `mysql` database and `supertokens` must start in the docker.

- `app`: backend app (Optional)
- `mysql`: mysql database store all information (MUST START)
- `supertokens`: authentication backend (MUST START)

### Start backend app locally

1. `npm install` to install dependencies
2. Create a file named `.env` in the root directory of the project. Add the following line to the file: `DATABASE_URL="mysql://user:password@localhost:3306/db"`
3. Execute `docker-compose -f "docker-compose.yml" up -d --build mysql supertoken`
4. Execute `npx prisma generate`
5. `npm start` to start the server in development mode. It use `nodemon` for instance restart.
6. backend app can be access by `http://localhost:3000`

### Start everything in docker

1. Execute `docker-compose up -d`
2. backend app can be access by `http://localhost:3000`

### Database

`db.sql` contain the database schema for backend app. `data.zip` contain the physical copy of the database. 

More information about database can be found in [here](docs/database.md).

## API

Detail of the API can be found in [API Documentation](docs/API.md)

## TODO

- [x] Add API key check (supertokens)
