# ai-react project 

This repo contains the react UI components website react front end.

### Running

To run the container:

    ./docker/server.sh

This will watch the `src` directory, and rebuild the files every time a
file is saved. The output is in the `build` directory. Hot reloading is
supported, so changes will be reflected in your browser immediately.

To quit the process, press `CTL-C`.

#### Unit tests

To run unit tests:

    ./docker/test.sh

This will monitor your `src` directory for changes and run unit tests on
every change. Put your tests in the `test` directory, and use the
"<UNIT_UNDER_TEST>-test.js" naming convention for your test files.

To run tests just once:

    ./docker/unit_test.sh

#### Environments

We need the react app to know about what environment it is in. For example,
it needs to know whether to look for the API in the local, dev,
or prod environment.

This is accomplished with the `NODE_ENV` environment variable. Default is
"local."

You can access this variable in your react code as `process.env.NODE_ENV`.

To specify "prod" as the environment for webpack, you would run the container
as follows:

    ./docker/server.sh prod

### Building

    docker build -t mac-react-app .

If you make any changes to the Dockerfile, such as adding npm packages, you'll
need to rebuild the image.

When you merge a pull request in github, TeamCity will automatically build the
latest version of the image, and if tests pass, will push that new version
to quay.io

## Design Architecture

This app follows the react-flux design pattern:

![alt text](doc/react-flux.png "React-Flux: Unidirectional Data Flow")

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

See: 'src/entry.js'.

Global imports and URL routing are configured here.
