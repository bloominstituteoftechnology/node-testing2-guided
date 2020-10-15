# Node Server Testing Guided Project

Guided project for **Node Server Testing** Module.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds automated tests to the API.

## Testing an API

- run the server on a port
- make an request to the endpoint (may or may not include data)
- inspect the result to the endpoint to see if it is what I expected

- npm i supertest jest
- add test script : "test": "jest --watch"
- add environment : "jest":{ "testEnvironment":"node"}

Jest will default to running code in an environment similar to a web browser. For testing node servers, we need to change that option.
