# Employee Management System (Backend)

## Prerequisites

- Docker
- npm

## Setup

`npm install` to install dependencies

## Start

- `npm start` to start the server.
- `npm start-dev` to start the server in development mode. It use `nodemon` for instance restart.

### Database

If you are using Visual Studio Code, right click `docker-compose.yml` and select `Compose up` to start the server. If you are using terminal, run `docker-compose up` in the root directory.

- Default username: `user`. Default password: `password`.
- `db.sql` contains sample data. Load `db.sql` after your database is created.

More information about database can be found in [here](docs/database.md).

## API

Detail of the API can be found in [API Documentation](docs/API.md)
