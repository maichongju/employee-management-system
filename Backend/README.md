# Employee Management System (Backend)

## Prerequisites

- Docker
- nodejs
- Tool to access MySQL database ([HeidiSQL](https://www.heidisql.com/))

## Setup

1. `npm install` to install dependencies
2. Create a file named `.env` in the root directory of the project. Add the following line to the file: `DATABASE_URL="mysql://user:password@localhost:3306/db"`
3. Execute `npx prisma generate`

## Start

- `npm run start` to start the server.
- `npm run start-dev` to start the server in development mode. It use `nodemon` for instance restart.

### Database

If you are using Visual Studio Code, right click `docker-compose.yml` and select `Compose up` to start the server. If you are using terminal, run `docker-compose up` in the root directory.

- Default username: `user`. Default password: `password`.
- `db.sql` contains sample data. Load `db.sql` after your database is created. You can use any MySQL client to load the file.

More information about database can be found in [here](docs/database.md).

## API

Detail of the API can be found in [API Documentation](docs/API.md)

## TODO

- [ ] Add API key check
