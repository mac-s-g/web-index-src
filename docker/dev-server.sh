#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-dev-server}
echo "Running with NODE_ENV=$NODE_ENV"

# stop and remove the containers if they are running
stop_and_remove_container()
{
    docker stop mac-react
    docker rm mac-react
}
stop_and_remove_container || true

# run the workbench container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/entrypoints:/react/entrypoints \
    -v $(pwd)/webpack.config.js:/react/webpack.config.js \
    --name=mac-react \
    -e NODE_ENV=$NODE_ENV \
    --publish 3001:3001 \
    --entrypoint=/react/entrypoints/dev-server.sh \
    -t mac-react