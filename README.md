### Getting Started

``
Just clone the repo and start hacking:
We are using ploty.js for charting
I am thinking for more interactive dashboards we could use dc.js
``

## list of chart types we intend to use

* Bar chart
* pie charts
* line charts
* etc

### TODO
* Create plotly.js react components
* Change home page and css to our current respectively
* Create a class for formatting data into chart data formats
* Methods for merging facebook and twitter Data
* Class for geo-coding locations in twitter data and caching co-ordinates in db
* Writing mongoose models for the data
* Writing tests

### Initial Focus
* visualize current twitter political data on Museveni and Besigye
* chart to compare terms being used by both candidates
* geo-plot places where most tweets are coming from
* geo-plot current campaign trail if we can get the data
* chart plotting tweet activity on both candidates with time as a dimension
* chart plotting sentiments on both candidates with time and location as a dimension

### How to Build

```
shell
$ npm run build                 
# or, `npm run build -- --release`
```

By default, it builds in *debug* mode. If you need to build in release
mode, just add a `-- --release` flag. This will optimize the output bundle for
production.

### How to Run

```shell
$ npm start                     # or, `npm start -- --release`
```

This will start a light-weight development server with "live reload" and
synchronized browsing across multiple devices and browsers.

### How to Deploy

```shell
$ npm run deploy                # or, `npm run deploy -- --production`
```

For more information see `tools/deploy.js`.


### How to Test
I am using mocha for server side and General testing
I intend to use enzyme for react component testing
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```
### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /api/                   # REST API / Relay endpoints
│   ├── /components/            # React components
│   ├── /constants/             # Constants (action types etc.)
│   ├── /content/               # Static content (plain HTML or Markdown, Jade, you name it)
│   ├── /core/                  # Core framework and utility functions
│   ├── /decorators/            # Higher-order React components
│   ├── /public/                # Static files which are copied into the /build/public folder
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /client.js              # Client-side startup script
│   ├── /config.js              # Global application settings
│   ├── /routes.js              # Universal (isomorphic) application routes
│   └── /server.js              # Server-side startup script
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /deploy.js              # Deploys your web application
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /runServer.js           # Launches (or restarts) Node.js server
│   ├── /start.js               # Launches the development web server with "live reload"
│   └── /webpack.config.js      # Configurations for client-side and server-side bundles
│── package.json                # The list of 3rd party libraries and utilities

```
