#!/usr/bin/env bash

SCRIPT_DIR=$(dirname "$0")
cd ${SCRIPT_DIR}

docker build -t openrecord/chrome-headless .