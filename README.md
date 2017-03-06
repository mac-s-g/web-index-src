# web app source code

This repo contains the source code required to build my github user index single-page-application.  The app is built with react and relies on [react-toolbox](https://github.com/react-toolbox/react-toolbox) for material-ui components. 

### Requirements
1. Install docker
2. Pull this repository
3. cd into this repository
..* `cd git/web-index-src`
4. Build the container:
⋅⋅* `docker build -t mac-react .`
5. Access the app from localhost on port 2000 in your browser:
..* `localhost:2000`

### Running

To run the container, run :

```
cd git/web-index-src
./docker/server.sh
```

This wil run the mac-react container and serve the web app on port 2000.  Webpack-dev-server watches the `src` directory, and rebuilds every time a file is saved. Webpack outputs build content to `build/assets/`. Hot reloading is supported, so changes will be reflected in your browser immediately.

To quit the process, press `CTL-C`.

#### Unit tests

To run unit tests:

    ./docker/test.sh

This will monitor your `src` directory for changes and run unit tests on
every change. Put your tests in the `test` directory, and use the
"<UNIT_UNDER_TEST>-test.js" naming convention for your test files.

To run tests just once:

    ./docker/unit_test.sh

### Building

    docker build -t mac-react-app .

If you make any changes to the Dockerfile, such as adding npm packages, you'll
need to rebuild the image.
```
cd git/web-index-src
docker build -t mac-react .
```

### React Views and Components

See: `src/js/views` and `src/js/components`.

Views and components extend `React.component` and always include a `render()` 
method.  View & component instances are created and destroyed based on routing 
changes.  React components call actions to trigger API interaction and subscribe 
to state changes emmitted by stores.

### Actions

See: `src/js/actions/`.

Action files contain all ajax interaction with external API's.  
Actions publish asynchronous events via the dispatcher.

### Stores

See: `src/js/stores/`.

Stores are singletons that persist between routing changes. Because stores are 
persistent, they can hold state data for React components.
Stores subscribe to dispatched events from actions and emit state changes to views.

### Helpers

See: `src/js/actions/`.

These are stateless helper methods that can help manipulate strings, numbers, etc.

### Entrypoint

See: 'src/js/entry.js'.

This is the entrypoint for the web app.  Global imports and URL routing are configured here.
