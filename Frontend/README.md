# Employee Management System (Front end)

## Pre requirement

- docker

## Set up

Run `docker-compose up` to start the application.

## Structure

- `src` All the source files
- `Dockerfile` Dockerfile
- `docker-compose.yml` docker compose file. contain all the docker services configuration
  - `php-apache`: php server. port `8000`
  - `json-server`: fake REST API test server. port `8080`
