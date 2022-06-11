#!/bin/bash

DOCKER_BUILDKIT=1 docker compose -p fastify-api up --build --abort-on-container-exit
