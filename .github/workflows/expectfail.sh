#!/bin/bash

if ! mocha tests/*.js; then
    echo "Failed as expected"
    exit 0
else
    echo "FALSE POSITIVE! Expected failure but succeeded"
    exit 1
fi
