[![CI](https://github.com/iniva/fastify-api-base/actions/workflows/ci.yml/badge.svg)](https://github.com/iniva/fastify-api-base/actions/workflows/ci.yml)

# Fastify API Base
Opinionated API based on [Fastify](https://www.fastify.io) <img src="https://www.fastify.io/images/fastify-logo-inverted.2180cc6b1919d47a.png" width="80" alt="Fastify Logo" />

## Included
- [ ] **Authentication**
- [x] **Database**: Postgres (using Knex + Knex migrations)
- Endpoints:
  - [x] Healthcheck
  - [x] Posts
  - [ ] ...
- Docker:
  - [x] **local**: for development
  - [x] **test-integration**: for integration tests
  - [x] **live**: for deployment (dev, staging, prod, etc.)
- [ ] **CI**: GitHub workflow with running tests:
  - [x] lint
  - [ ] coverage
  - [x] integration

## Local Setup
- Clone this repo
- Duplicate `.env.example` and rename it to `.env`. Update variables as you need.
- Run the `run.sh` script from inside `docker/local` folder. This will build & start the API container (alongside with the database container)
  ```sh
  cd docker/local && bash run.sh
  ```
- By default, the API is listening on port `8091`. You can change this in the `.env` file.

# Running Tests
- **Lint**
  > run `yarn` or `yarn install` if you haven't already
  ```sh
  yarn test:lint

  # for automatic lint fixes
  yarn test:lint-fix
  ```
- **Integration**
  ```sh
  cd docker/test-integration && bash run.sh
  ```
