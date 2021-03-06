### Getting Started

```
PS. I want us to do most of the data processing on the backend so that we can
cache it there say on redis and just export out data sets ready to be visualized
by our chart functions.
Even on the front end we can cache data in session storage
```

## list of chart types we intend to use

* Bar chart
* pie charts
* line charts
* etc

### TODO
* Create a class for formatting data into chart data formats
* Methods for merging facebook and twitter Data
* Use a logger instead of console.log
* Writing tests for un-tested code


### Initial Focus
* visualize current twitter political data
* chart to compare terms being used by both candidates -- done
* geo-plot places where most tweets are coming from --done
* geo-plot current campaign trail if we can get the data
* chart plotting tweet activity on both candidates with time as a dimension -- done
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

```
Deploy should be a simple command such as npm run deploy --production
but for now i haven't fully set it up
```

For more information see `tools/deploy.js`.


### How to Test
I am using mocha for server side and General testing
I intend to use enzyme for react component testing
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```
