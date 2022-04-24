# Employee Management System

Employee Management System is a web application that allows employee schedule be auto generated. The program is split into two parts: frontend and backend. The backend is a REST API server that handles all the requests from the frontend. Where the frontend can be any client that sent the request to the backend endpoint.

- Backend API detail [API.md](Backend/docs/API.md)
- Backend Database detail [Database.md](Backend/docs/Database.md)

## Prerequisites

Following software is required for this project:

- [Docker](https://docs.docker.com/get-docker/)

Unzip the `backend/data.zip` file and make sure the unzipped file is located in the root directory of `backend/data`.

## Setup

> Make sure prerequisites software is install and `data.zip` is unzipped

1. Open a terminal and ensure that you are in the root directory of the project.
2. `docker-compose up` starts the program.
3. Access the program at [http://localhost:8080](http://localhost:8080)
