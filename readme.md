# Air Quality Monitoring API
---
## Description

This is an API Service responsible for exposing "the air quality information" of a nearest city to GPS coordinates using **iqair** API. The API also exposes an endpoint to get the air quality information of Paris city every 1 minute using a cron job.
### Technology
- Nodejs
- Fastify Framework
- Mongo Database
- Docker
- Docker Compose


## Architecture Overview

![Alt text](https://github.com/mostafaSalah12/air_quality/blob/master/docs/architecture.png "air quality architecture")

The App consist of:
- **Core NodeJs Service** built using **Fastify** framework.
_ **iqair API Service** which provides the air quality data.
- **Mongo DB** which is responsible for storing the data. 

API Service is built with **Fastify**, a web framework that supports plugin architecture. It is inspired by Hapi and Express. There is one main module in the Service, which is the **Air Quality Module (Core)**. This module is responsible for fetching data from the **iqair API Service**, exposing API endpoints and handling business logic.

The App Structure is as follows:
app
- **Core** (Air Quality Module)
    - **Controller** (API Logic)
    - **IQAir Service** (IQAir API Service Wrapper)
    - **Models** (Data Models)
    - **Routes** (API Routes)
    - **Paris Cron Job** (Cron Job to fetch Paris Air Quality Data)
- **Database** (Database Connection)
    - **Mongo** (Mongo Connection)
- **Utils** (Utility Functions)
    - **Logger** (Logger Utility using Pino)
    - **Faults** (Custom Error Handling Utility)
    - **Config** (Config Utility for loading environment variables)
- **Plugins** (App Plugins)
    - **Swagger** (Swagger Plugin)
    - **Not Found** (Handle Not Found Routes)
    - **Error** (Handle Errors)
- **app.js** (App Entry Point)
- **server.js** (Server Configuration Point)

---

## How to run the app

### Using Docker Compose
- Clone the repo
- Add the API Key sent in the email to docker compose file in **IQAIR_API_KEY** environment variable
- Run `docker-compose up` in the root directory
- The app will be running on `http://localhost:3000`

### Using NodeJs

- Clone the repo
- make sure you have **mongo db** installed and running on port **27017**
- Run `npm install` in the root directory
- Add the API Key sent in the email to .env file in **IQAIR_API_KEY** environment variable
- Run `npm start` in the root directory
- The app will be running on `http://localhost:3000`


## How to run the tests

- Run ``` npm test ``` in the root directory

## How to run the app in development mode

- Run ``` npm run dev ``` in the root directory


## Documentation for API Endpoints

All URIs are relative to *http://localhost:3000*

Name  | HTTP request | Method |Description
------------ | ------------- | ------------- | -------------
*Get Pollution Nearest City* | /api/pollution/nearest_city?lat=0&lon=0 | GET | Get the air quality information of the nearest city to GPS coordinates
*Get Paris Pollution* | /api/pollution/paris | Get | Get the air quality information of Paris city every 1 minute using a cron job


The API Documentation is generated using **Swagger** and can be accessed using the following link:
http://localhost:3000/docs