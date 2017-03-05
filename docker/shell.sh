#!/bin/bash
# runs shell in react container

NODE_ENV=${1:-local}
echo "Running with NODE_ENV=$NODE_ENV"

# run the workbench container
docker run \
    --rm \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/test:/react/test \
    -e NODE_ENV=$NODE_ENV \
    --entrypoint=/bin/bash \
    -ti mac-react
