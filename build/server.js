require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _this2 = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(2);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDomServer = __webpack_require__(5);
  
  var _reactDomServer2 = _interopRequireDefault(_reactDomServer);
  
  var _routes = __webpack_require__(6);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _componentsHtml = __webpack_require__(87);
  
  var _componentsHtml2 = _interopRequireDefault(_componentsHtml);
  
  var _assets = __webpack_require__(88);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(14);
  
  var _compression = __webpack_require__(89);
  
  var _compression2 = _interopRequireDefault(_compression);
  
  var _bodyParser = __webpack_require__(90);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _apiJobsTwitterJob = __webpack_require__(91);
  
  var _apiJobsTwitterJob2 = _interopRequireDefault(_apiJobsTwitterJob);
  
  var _mongoose = __webpack_require__(94);
  
  var _mongoose2 = _interopRequireDefault(_mongoose);
  
  var _cron = __webpack_require__(96);
  
  var _cron2 = _interopRequireDefault(_cron);
  
  var _morgan = __webpack_require__(97);
  
  var _morgan2 = _interopRequireDefault(_morgan);
  
  var CronJob = _cron2['default'].CronJob;
  var server = global.server = (0, _express2['default'])();
  
  server.use(_bodyParser2['default'].json());
  // logger
  if (process.env.NODE !== 'production') server.use((0, _morgan2['default'])('combined'));
  
  server.use((0, _compression2['default'])());
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  // Register Data analysis API middleware
  // -----------------------------------------------------------------------------
  server.use('/api', __webpack_require__(98));
  
  // Register API middleware
  
  // -----------------------------------------------------------------------------
  server.use('/api/content', __webpack_require__(103));
  
  function connect() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return _mongoose2['default'].connect(_config.MONGO_URL, options).connection;
  }
  
  // cron job
  var job = new CronJob({
    cronTime: '00 45 * * * *',
    onTick: function onTick() {
      (0, _apiJobsTwitterJob2['default'])();
    },
    start: true
  });
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      var _this = this;
  
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap((function callee$1$0() {
            var statusCode, data, css, context, html;
            return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  statusCode = 200;
                  data = { title: '', description: '', css: '', body: '', entry: _assets2['default'].main.js };
                  css = [];
                  context = {
                    insertCss: function insertCss(styles) {
                      return css.push(styles._getCss());
                    },
                    onSetTitle: function onSetTitle(value) {
                      return data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      return statusCode = 404;
                    }
                  };
                  context$2$0.next = 6;
                  return regeneratorRuntime.awrap(_routes2['default'].dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                    data.body = _reactDomServer2['default'].renderToString(component);
                    data.css = css.join('');
                  }));
  
                case 6:
                  html = _reactDomServer2['default'].renderToStaticMarkup(_react2['default'].createElement(_componentsHtml2['default'], data));
  
                  res.status(statusCode).send('<!doctype html>\n' + html);
  
                case 8:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this);
          })());
  
        case 3:
          context$1$0.next = 8;
          break;
  
        case 5:
          context$1$0.prev = 5;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this2, [[0, 5]]);
  });
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    connect().on('error', console.log).on('disconnected', connect).once('open', function () {
      console.log('using mongodb ' + _config.MONGO_URL);
      // initial twitter job to get aggregated data
      (0, _apiJobsTwitterJob2['default'])();
      try {
        job.start();
      } catch (ex) {
        console.log('cron pattern not valid' + ex.toString());
      }
    });
    console.log('The server is running at http://localhost:' + _config.port + '/ PID is ' + process.pid);
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-core/polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRoutingSrcRouter = __webpack_require__(7);
  
  var _reactRoutingSrcRouter2 = _interopRequireDefault(_reactRoutingSrcRouter);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _componentsApp = __webpack_require__(15);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsContentPage = __webpack_require__(43);
  
  var _componentsContentPage2 = _interopRequireDefault(_componentsContentPage);
  
  var _componentsContactPage = __webpack_require__(46);
  
  var _componentsContactPage2 = _interopRequireDefault(_componentsContactPage);
  
  var _componentsBlogPage = __webpack_require__(49);
  
  var _componentsBlogPage2 = _interopRequireDefault(_componentsBlogPage);
  
  var _componentsNotFoundPage = __webpack_require__(52);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  var _componentsErrorPage = __webpack_require__(55);
  
  var _componentsErrorPage2 = _interopRequireDefault(_componentsErrorPage);
  
  var _componentsDataPage = __webpack_require__(58);
  
  var _componentsDataPage2 = _interopRequireDefault(_componentsDataPage);
  
  var router = new _reactRoutingSrcRouter2['default'](function (on) {
    on('*', function callee$1$0(state, next) {
      var component;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(next());
  
          case 2:
            component = context$2$0.sent;
            return context$2$0.abrupt('return', component && _react2['default'].createElement(
              _componentsApp2['default'],
              { context: state.context },
              component
            ));
  
          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/contact', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsContactPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/data', function callee$1$0(state) {
      var res, html;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/content?path=' + state.path));
  
          case 2:
            res = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(res.json());
  
          case 5:
            html = context$2$0.sent;
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsDataPage2['default'], html));
  
          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/blog', function callee$1$0(state) {
      var res, html;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/content?path=' + state.path));
  
          case 2:
            res = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(res.json());
  
          case 5:
            html = context$2$0.sent;
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsBlogPage2['default'], html));
  
          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('*', function callee$1$0(state) {
      var response, content;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/content?path=' + state.path));
  
          case 2:
            response = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(response.json());
  
          case 5:
            content = context$2$0.sent;
            return context$2$0.abrupt('return', content && _react2['default'].createElement(_componentsContentPage2['default'], content));
  
          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsNotFoundPage2['default'], null)
      ) : _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsErrorPage2['default'], null)
      );
    });
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _Route = __webpack_require__(8);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  var emptyFunction = function emptyFunction() {};
  
  var Router = (function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      _classCallCheck(this, Router);
  
      this.routes = [];
      this.events = Object.create(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
    _createClass(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2['default'](path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(state, cb) {
        var routes, handlers, value, result, done, next;
        return regeneratorRuntime.async(function dispatch$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              next = function next() {
                var _handlers$next;
  
                var _value, _value2, match, handler;
  
                return regeneratorRuntime.async(function next$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        context$3$0.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = _slicedToArray(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        context$3$0.next = 12;
                        break;
                      }
  
                      context$3$0.next = 9;
                      return regeneratorRuntime.awrap(handler(state, next));
  
                    case 9:
                      context$3$0.t0 = context$3$0.sent;
                      context$3$0.next = 15;
                      break;
  
                    case 12:
                      context$3$0.next = 14;
                      return regeneratorRuntime.awrap(handler(state));
  
                    case 14:
                      context$3$0.t0 = context$3$0.sent;
  
                    case 15:
                      return context$3$0.abrupt('return', context$3$0.t0);
  
                    case 16:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, null, this);
              };
  
              if (typeof state === 'string' || state instanceof String) {
                state = { path: state };
              }
              cb = cb || emptyFunction;
              routes = this.routes;
              handlers = regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      context$3$0.prev = 3;
                      _iterator = routes[Symbol.iterator]();
  
                    case 5:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        context$3$0.next = 38;
                        break;
                      }
  
                      route = _step.value;
                      match = route.match(state.path);
  
                      if (!match) {
                        context$3$0.next = 35;
                        break;
                      }
  
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      context$3$0.prev = 12;
                      _iterator2 = match.route.handlers[Symbol.iterator]();
  
                    case 14:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        context$3$0.next = 21;
                        break;
                      }
  
                      handler = _step2.value;
                      context$3$0.next = 18;
                      return [match, handler];
  
                    case 18:
                      _iteratorNormalCompletion2 = true;
                      context$3$0.next = 14;
                      break;
  
                    case 21:
                      context$3$0.next = 27;
                      break;
  
                    case 23:
                      context$3$0.prev = 23;
                      context$3$0.t0 = context$3$0['catch'](12);
                      _didIteratorError2 = true;
                      _iteratorError2 = context$3$0.t0;
  
                    case 27:
                      context$3$0.prev = 27;
                      context$3$0.prev = 28;
  
                      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                      }
  
                    case 30:
                      context$3$0.prev = 30;
  
                      if (!_didIteratorError2) {
                        context$3$0.next = 33;
                        break;
                      }
  
                      throw _iteratorError2;
  
                    case 33:
                      return context$3$0.finish(30);
  
                    case 34:
                      return context$3$0.finish(27);
  
                    case 35:
                      _iteratorNormalCompletion = true;
                      context$3$0.next = 5;
                      break;
  
                    case 38:
                      context$3$0.next = 44;
                      break;
  
                    case 40:
                      context$3$0.prev = 40;
                      context$3$0.t1 = context$3$0['catch'](3);
                      _didIteratorError = true;
                      _iteratorError = context$3$0.t1;
  
                    case 44:
                      context$3$0.prev = 44;
                      context$3$0.prev = 45;
  
                      if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                      }
  
                    case 47:
                      context$3$0.prev = 47;
  
                      if (!_didIteratorError) {
                        context$3$0.next = 50;
                        break;
                      }
  
                      throw _iteratorError;
  
                    case 50:
                      return context$3$0.finish(47);
  
                    case 51:
                      return context$3$0.finish(44);
  
                    case 52:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, callee$2$0, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
              })();
              value = undefined, result = undefined, done = false;
  
            case 6:
              if (done) {
                context$2$0.next = 16;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(next());
  
            case 9:
              result = context$2$0.sent;
  
              if (!result) {
                context$2$0.next = 14;
                break;
              }
  
              state.statusCode = 200;
              cb(state, result);
              return context$2$0.abrupt('return');
  
            case 14:
              context$2$0.next = 6;
              break;
  
            case 16:
              if (!this.events.error) {
                context$2$0.next = 32;
                break;
              }
  
              context$2$0.prev = 17;
  
              state.statusCode = 404;
              context$2$0.next = 21;
              return regeneratorRuntime.awrap(this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.')));
  
            case 21:
              result = context$2$0.sent;
  
              cb(state, result);
              context$2$0.next = 32;
              break;
  
            case 25:
              context$2$0.prev = 25;
              context$2$0.t0 = context$2$0['catch'](17);
  
              state.statusCode = 500;
              context$2$0.next = 30;
              return regeneratorRuntime.awrap(this.events.error(state, context$2$0.t0));
  
            case 30:
              result = context$2$0.sent;
  
              cb(state, result);
  
            case 32:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this, [[17, 25]]);
      }
    }]);
  
    return Router;
  })();
  
  exports['default'] = Router;
  module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pathToRegexp = __webpack_require__(9);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(11);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  var Route = (function () {
    function Route(path, handlers) {
      _classCallCheck(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2['default'])(path, this.keys = []);
    }
  
    _createClass(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2['default'](this, path, this.keys, m) : null;
      }
    }]);
  
    return Route;
  })();
  
  exports['default'] = Route;
  module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(10)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 11 */
/***/ function(module, exports) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var Match = function Match(route, path, keys, match) {
    _classCallCheck(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = Object.create(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports['default'] = Match;
  module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _nodeFetch = __webpack_require__(13);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(14);
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2['default'])(localUrl(url), options);
  }
  
  exports['default'] = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 14 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var port = process.env.PORT || 5000;
  exports.port = port;
  var host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  exports.host = host;
  var googleAnalyticsId = 'UA-72716212-1';
  exports.googleAnalyticsId = googleAnalyticsId;
  var REDIS_ADDR = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
  exports.REDIS_ADDR = REDIS_ADDR;
  var REDIS_PORT = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
  exports.REDIS_PORT = REDIS_PORT;
  var MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1';
  exports.MONGO_ADDR = MONGO_ADDR;
  var MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;
  exports.MONGO_PORT = MONGO_PORT;
  var MONGO_URL = 'mongodb://' + MONGO_ADDR + ':' + MONGO_PORT + '/mine';
  exports.MONGO_URL = MONGO_URL;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fbjsLibEmptyFunction = __webpack_require__(16);
  
  var _fbjsLibEmptyFunction2 = _interopRequireDefault(_fbjsLibEmptyFunction);
  
  var _AppScss = __webpack_require__(17);
  
  var _AppScss2 = _interopRequireDefault(_AppScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Header = __webpack_require__(22);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(37);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(40);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var App = (function (_Component) {
    _inherits(App, _Component);
  
    function App() {
      _classCallCheck(this, App);
  
      _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _fbjsLibEmptyFunction2['default'],
          onSetTitle: context.onSetTitle || _fbjsLibEmptyFunction2['default'],
          onSetMeta: context.onSetMeta || _fbjsLibEmptyFunction2['default'],
          onPageNotFound: context.onPageNotFound || _fbjsLibEmptyFunction2['default']
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.removeCss = this.props.context.insertCss(_AppScss2['default']);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(_AppScss2['default'].wrapper, 'container-fluid') },
          _react2['default'].createElement(_Header2['default'], null),
          this.props.children,
          _react2['default'].createElement(_Feedback2['default'], null),
          _react2['default'].createElement(_Footer2['default'], null)
        ) : this.props.children;
      }
    }], [{
      key: 'propTypes',
      value: {
        context: _react.PropTypes.shape({
          insertCss: _react.PropTypes.func,
          onSetTitle: _react.PropTypes.func,
          onSetMeta: _react.PropTypes.func,
          onPageNotFound: _react.PropTypes.func
        }),
        children: _react.PropTypes.element.isRequired,
        error: _react.PropTypes.object
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        insertCss: _react.PropTypes.func.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onSetMeta: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })(_react.Component);
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(18);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./App.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./App.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio, canvas, progress, video {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden], template {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active, a:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb, strong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton, input, optgroup, select, textarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton, select {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled], html input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd, th {\n  padding: 0;\n}\n\n/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml, body {\n  color: #222;\n  width: 100%;\n  height: 100%;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Lato','Segoe UI','HelveticaNeue-Light',sans-serif;\n  line-height: 1.375; /* ~22px */\n  background-color: #5B798E;\n}\n.App_wrapper_1PG {\n  color: white;\n  line-height: 1.2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio, canvas, iframe, img, svg, video {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.App_browserupgrade_1t4 {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *, *:before, *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a, a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after, a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre, blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr, img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p, h2, h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"wrapper": "App_wrapper_1PG",
  	"browserupgrade": "App_browserupgrade_1t4"
  };

/***/ },
/* 19 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 20 */
/***/ function(module, exports) {

  'use strict';
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  var canUseURL = typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function';
  
  /**
   * Remove style/link elements for specified Module IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] === 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
            if (canUseURL && elem.tagName === 'STYLE' && elem.href) {
              URL.revokeObjectURL(elem.href);
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var _Object$assign = Object.assign({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
  
    try {
  
      for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 4);
  
        var id = _step2$value[0];
        var css = _step2$value[1];
        var media = _step2$value[2];
        var sourceMap = _step2$value[3];
  
        if (inserted[id]) {
          if (!replace) {
            inserted[id]++;
            continue;
          }
        }
  
        inserted[id] = 1;
  
        var elem = document.getElementById(prefix + id);
        var create = false;
  
        if (!elem) {
          create = true;
  
          if (sourceMap && canUseURL) {
            elem = document.createElement('link');
            elem.setAttribute('rel', 'stylesheet');
          } else {
            elem = document.createElement('style');
            elem.setAttribute('type', 'text/css');
          }
  
          elem.id = prefix + id;
  
          if (media) {
            elem.setAttribute('media', media);
          }
        }
  
        if (elem.tagName === 'STYLE') {
          if ('textContent' in elem) {
            elem.textContent = css;
          } else {
            elem.styleSheet.cssText = css;
          }
        } else {
          var blob = new Blob([css + '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'], { type: 'text/css' });
  
          var href = elem.href;
          elem.href = URL.createObjectURL(blob);
  
          if (href) {
            URL.revokeObjectURL(href);
          }
        }
  
        if (create) {
          if (prepend) {
            document.head.insertBefore(elem, document.head.childNodes[0]);
          } else {
            document.head.appendChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  
    return removeCss.bind(null, styles.map(function (x) {
      return x[0];
    }));
  }
  
  module.exports = insertCss;

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderScss = __webpack_require__(23);
  
  var _HeaderScss2 = _interopRequireDefault(_HeaderScss);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Navigation = __webpack_require__(26);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var Header = (function (_Component) {
    _inherits(Header, _Component);
  
    function Header() {
      _classCallCheck(this, _Header);
  
      _get(Object.getPrototypeOf(_Header.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Header, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'section',
          { className: _HeaderScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _HeaderScss2['default'].container },
            _react2['default'].createElement(_Navigation2['default'], { className: _HeaderScss2['default'].nav })
          )
        );
      }
    }]);
  
    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderScss2['default'])(Header) || Header;
    return Header;
  })(_react.Component);
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(24);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Header.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Header.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Header_root_14I {\n}\n\n.Header_container_izf {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: 1000px;\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_14I",
  	"container": "Header_container_izf"
  };

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  function withStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
  
    return function (BaseComponent) {
      return (function (_Component) {
        _inherits(StyledComponent, _Component);
  
        function StyledComponent() {
          _classCallCheck(this, StyledComponent);
  
          _get(Object.getPrototypeOf(StyledComponent.prototype), 'constructor', this).apply(this, arguments);
        }
  
        _createClass(StyledComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.removeCss = this.context.insertCss.apply(undefined, styles);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.removeCss();
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(BaseComponent, this.props);
          }
        }], [{
          key: 'contextTypes',
          value: {
            insertCss: _react.PropTypes.func.isRequired
          },
          enumerable: true
        }]);
  
        return StyledComponent;
      })(_react.Component);
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _NavigationScss = __webpack_require__(27);
  
  var _NavigationScss2 = _interopRequireDefault(_NavigationScss);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(29);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _reactBootstrap = __webpack_require__(36);
  
  var Navigation = (function (_Component) {
    _inherits(Navigation, _Component);
  
    function Navigation() {
      var _this = this;
  
      _classCallCheck(this, _Navigation);
  
      _get(Object.getPrototypeOf(_Navigation.prototype), 'constructor', this).apply(this, arguments);
  
      this.handleScroll = function () {
        _this.nav = _this.refs.nav;
        _this.nav.className += ' ' + _NavigationScss2['default']['nav-scroll'];
        window.removeEventListener('scroll', _this.handleScroll);
      };
    }
  
    _createClass(Navigation, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // window.removeEventListener('scroll', this.handleScroll);
        // if (this.nav) this.nav.className.remove(s['nav-scroll']);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          _reactBootstrap.Navbar,
          { id: 'navbar-override', fixedTop: true, className: (0, _classnames2['default'])('navbar', _NavigationScss2['default'].navbar), ref: 'nav' },
          _react2['default'].createElement(
            _reactBootstrap.Navbar.Header,
            null,
            _react2['default'].createElement(_reactBootstrap.Navbar.Toggle, null)
          ),
          _react2['default'].createElement(
            _reactBootstrap.Navbar.Collapse,
            null,
            _react2['default'].createElement(
              _reactBootstrap.Nav,
              null,
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _NavigationScss2['default'].link, to: '/' },
                  'Home'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _NavigationScss2['default'].link, to: '/data' },
                  'Data Center'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _NavigationScss2['default'].link, to: '/blog' },
                  'Blog'
                )
              )
            ),
            _react2['default'].createElement(
              _reactBootstrap.Nav,
              { pullRight: true },
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _NavigationScss2['default'].link, to: '/contact' },
                  'Contact Us'
                )
              )
            )
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    var _Navigation = Navigation;
    Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationScss2['default'])(Navigation) || Navigation;
    return Navigation;
  })(_react.Component);
  
  exports['default'] = Navigation;
  module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(28);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Navigation.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Navigation.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n.Navigation_root_2Gx {}\n\n.Navigation_nav-scroll_1Bv {\n  background-color: rgba(245,245,245,0.5);\n};\n.Navigation_navbar_20N .Navigation_link_12k {\n  color: #ffffff;\n};\n.Navigation_link_12k {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em;\n  /* ~18px */\n};\n.Navigation_link_12k, .Navigation_link_12k:active, .Navigation_link_12k:visited {\n  color: rgba(255, 255, 255, .6);\n};\n.Navigation_link_12k:hover {\n  color: rgba(255, 255, 255, 1);\n};\n.Navigation_navbar_20N .Navigation_link_12k:focus, .Navigation_navbar_20N .Navigation_link_12k:hover {\n  color: #243442;\n  background-color: transparent;\n};\n.Navigation_collapse_22x {\n  margin-top: 0.5em;\n}\n.Navigation_highlight_2cu {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, .15);\n  color: #fff;\n}\n.Navigation_highlight_2cu:hover {\n  background: rgba(0, 0, 0, .3);\n}\n.Navigation_spacer_2MV {\n  color: rgba(255, 255, 255, .3);\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_2Gx",
  	"nav-scroll": "Navigation_nav-scroll_1Bv",
  	"navbar": "Navigation_navbar_20N",
  	"link": "Navigation_link_12k",
  	"collapse": "Navigation_collapse_22x",
  	"highlight": "Navigation_highlight_2cu",
  	"spacer": "Navigation_spacer_2MV"
  };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _historyLibParsePath = __webpack_require__(30);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _coreLocation = __webpack_require__(31);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = (function (_Component) {
    _inherits(Link, _Component);
  
    function Link() {
      _classCallCheck(this, Link);
  
      _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
  
        var props = _objectWithoutProperties(_props, ['to', 'query']);
  
        return _react2['default'].createElement('a', _extends({ href: _coreLocation2['default'].createHref(to, query), onClick: Link.handleClick.bind(this) }, props));
      }
    }], [{
      key: 'propTypes',
      value: {
        to: _react.PropTypes.string.isRequired,
        query: _react.PropTypes.object,
        state: _react.PropTypes.object,
        onClick: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'handleClick',
      value: function value(event) {
        var allowTransition = true;
        var clickResult = undefined;
  
        if (_this.props && _this.props.onClick) {
          clickResult = _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (clickResult === false || event.defaultPrevented === true) {
          allowTransition = false;
        }
        // bootstrap navbar-collapse
        if ($('.navbar-collapse')) $('.navbar-collapse').collapse('hide');
  
        event.preventDefault();
  
        if (allowTransition) {
          var link = event.currentTarget;
          if (_this.props && _this.props.to) {
            _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])(_this.props.to), {
              state: _this.props && _this.props.state || null
            }));
          } else {
            _coreLocation2['default'].push({
              pathname: link.pathname,
              search: link.search,
              state: _this.props && _this.props.state || null
            });
          }
        }
      },
      enumerable: true
    }]);
  
    return Link;
  })(_react.Component);
  
  exports['default'] = Link;
  module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("history/lib/parsePath");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fbjsLibExecutionEnvironment = __webpack_require__(32);
  
  var _historyLibCreateBrowserHistory = __webpack_require__(33);
  
  var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);
  
  var _historyLibCreateMemoryHistory = __webpack_require__(34);
  
  var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
  
  var _historyLibUseQueries = __webpack_require__(35);
  
  var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
  
  var location = (0, _historyLibUseQueries2['default'])(_fbjsLibExecutionEnvironment.canUseDOM ? _historyLibCreateBrowserHistory2['default'] : _historyLibCreateMemoryHistory2['default'])();
  
  exports['default'] = location;
  module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("react-bootstrap");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FeedbackScss = __webpack_require__(38);
  
  var _FeedbackScss2 = _interopRequireDefault(_FeedbackScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var Feedback = (function (_Component) {
    _inherits(Feedback, _Component);
  
    function Feedback() {
      var _this = this;
  
      _classCallCheck(this, _Feedback);
  
      _get(Object.getPrototypeOf(_Feedback.prototype), 'constructor', this).apply(this, arguments);
  
      this.findOutMore = function callee$2$0(event) {
        var name, email, response, data;
        return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              event.preventDefault();
              name = this.refs.name.value;
              email = this.refs.email.value;
  
              if (!(name.length > 2 && email.length > 5)) {
                context$3$0.next = 11;
                break;
              }
  
              context$3$0.next = 6;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/inquiries', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email })
              }));
  
            case 6:
              response = context$3$0.sent;
              context$3$0.next = 9;
              return regeneratorRuntime.awrap(response.json());
  
            case 9:
              data = context$3$0.sent;
  
              if (data.status === 'success') alert('your Inquiry has been received');
  
            case 11:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this);
      };
  
      this.render = function () {
        return _react2['default'].createElement(
          'div',
          { className: _FeedbackScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _FeedbackScss2['default'].container },
            _react2['default'].createElement(
              'section',
              null,
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'header',
                  { className: 'text-center center spacing-sm' },
                  _react2['default'].createElement(
                    'h3',
                    { className: 'spacing' },
                    'Find out More'
                  )
                ),
                _react2['default'].createElement(
                  'form',
                  { className: 'form-inline  spacing text-center', id: 'inquiry', method: 'POST' },
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('form-group', _FeedbackScss2['default'].fgroup) },
                    _react2['default'].createElement('input', { type: 'text', className: 'form-control', id: 'username', ref: 'name', placeholder: 'name', required: true })
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('form-group', _FeedbackScss2['default'].fgroup) },
                    _react2['default'].createElement('input', { type: 'email', className: 'form-control', id: 'useremail', ref: 'email', placeholder: 'email', required: true })
                  ),
                  _react2['default'].createElement(
                    'button',
                    { type: 'submit', onClick: _this.findOutMore.bind(_this), className: (0, _classnames2['default'])('btn', 'btn-default', _FeedbackScss2['default'].btn), id: 'find_out_more' },
                    'submit'
                  )
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'row spacing-sm' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-sm-2' },
                  _react2['default'].createElement(
                    'h3',
                    null,
                    'Akilihub'
                  )
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'col-sm-2 col-sm-offset-8 social' },
                  _react2['default'].createElement(
                    'a',
                    { href: 'https://www.facebook.com/akilihubio-1053352951374980' },
                    _react2['default'].createElement('i', { className: 'fa fa-facebook' })
                  ),
                  _react2['default'].createElement(
                    'a',
                    { href: 'https://twitter.com/akilihub_io' },
                    _react2['default'].createElement('i', { className: 'fa fa-twitter' })
                  )
                )
              )
            )
          )
        );
      };
    }
  
    var _Feedback = Feedback;
    Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackScss2['default'])(Feedback) || Feedback;
    return Feedback;
  })(_react.Component);
  
  exports['default'] = Feedback;
  module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(39);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Feedback.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Feedback.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Feedback_root_LW7 {\n}\n\n.Feedback_container_3dV {\n  margin: 0 auto;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Feedback_link_17l, .Feedback_link_17l:active, .Feedback_link_17l:hover, .Feedback_link_17l:visited {\n  color: #333;\n  text-decoration: none;\n}\n.Feedback_fgroup_2Xx{\n  margin-left: 1em;\n}\n.Feedback_btn_2h9{\n  margin-left: 1em;\n}\n.Feedback_link_17l:hover {\n  text-decoration: underline;\n}\n\n.Feedback_spacer_Iut {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_LW7",
  	"container": "Feedback_container_3dV",
  	"link": "Feedback_link_17l",
  	"fgroup": "Feedback_fgroup_2Xx",
  	"btn": "Feedback_btn_2h9",
  	"spacer": "Feedback_spacer_Iut"
  };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(41);
  
  var _FooterScss2 = _interopRequireDefault(_FooterScss);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(29);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var Footer = (function (_Component) {
    _inherits(Footer, _Component);
  
    function Footer() {
      _classCallCheck(this, _Footer);
  
      _get(Object.getPrototypeOf(_Footer.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Footer, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _FooterScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _FooterScss2['default'].container },
            _react2['default'].createElement(
              'span',
              { className: _FooterScss2['default'].text },
              '© Akilihub'
            ),
            _react2['default'].createElement(
              'span',
              { className: _FooterScss2['default'].spacer },
              '·'
            ),
            _react2['default'].createElement(
              'a',
              { className: _FooterScss2['default'].link, href: '/', onClick: _Link2['default'].handleClick },
              'Home'
            )
          )
        );
      }
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterScss2['default'])(Footer) || Footer;
    return Footer;
  })(_react.Component);
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(42);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Footer.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Footer.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Footer_root_3dP {\n  background: rgba(0,0,0,.5);\n  color: #fff;\n  height: 3em;\n  padding-top: -2em;\n  border-radius: 1em;\n}\n\n.Footer_container_26p {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Footer_container_26p .Footer_form-group_1r6{margin-left: 1em;}\n\n.Footer_text_tTp {\n  color: rgba(255, 255, 255, .5);\n}\n\n.Footer_textMuted_1h3 {\n  color: rgba(255, 255, 255, .3);\n}\n\n.Footer_spacer_3n7 {\n  color: rgba(255, 255, 255, .3);\n}\n\n.Footer_text_tTp, .Footer_link_NoJ {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.Footer_link_NoJ, .Footer_link_NoJ:active, .Footer_link_NoJ:visited {\n  color: rgba(255, 255, 255, .6);\n  text-decoration: none;\n}\n\n.Footer_link_NoJ:hover {\n  color: rgba(255, 255, 255, 1);\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3dP",
  	"container": "Footer_container_26p",
  	"form-group": "Footer_form-group_1r6",
  	"text": "Footer_text_tTp",
  	"textMuted": "Footer_textMuted_1h3 Footer_text_tTp",
  	"spacer": "Footer_spacer_3n7",
  	"link": "Footer_link_NoJ"
  };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContentPageScss = __webpack_require__(44);
  
  var _ContentPageScss2 = _interopRequireDefault(_ContentPageScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var ContentPage = (function (_Component) {
    _inherits(ContentPage, _Component);
  
    function ContentPage() {
      _classCallCheck(this, _ContentPage);
  
      _get(Object.getPrototypeOf(_ContentPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ContentPage, [{
      key: 'render',
      value: function render() {
        this.context.onSetTitle(this.props.title);
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(_ContentPageScss2['default'].root) },
          _react2['default'].createElement(
            'div',
            null,
            this.props.path === '/' ? null : _react2['default'].createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _react.PropTypes.string.isRequired,
        content: _react.PropTypes.string.isRequired,
        title: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContentPage = ContentPage;
    ContentPage = (0, _decoratorsWithStyles2['default'])(_ContentPageScss2['default'])(ContentPage) || ContentPage;
    return ContentPage;
  })(_react.Component);
  
  exports['default'] = ContentPage;
  module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(45);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContentPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContentPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.ContentPage_root_1Kg {\n\n}\n\n.ContentPage_container_1JT {\n}\n\n.ContentPage_icon-cover_2i4{\n    border: solid;\n    border-radius: 6em;\n    height: 14em;\n  }\n.ContentPage_fa-5x_341 {\n    font-size: 13em;\n}\n\n.ContentPage_home-main_3Fs{margin-top:9em}\n\n.ContentPage_products_227{\n    margin-top:24em;\n}\n\n.ContentPage_products_227 p{line-height:2em}\n.ContentPage_footer-nav_2gg{\n  background-color:white;\n    border-radius: 1em;\n    height: 50px;;\n\n\n}\n.ContentPage_footer-nav_2gg li{display: inline;padding:4em}\n.ContentPage_footer-nav_2gg a{color:white;font-size:1.1em}\n.ContentPage_social_1ok {\n  margin-top: -1em;;\n}\n.ContentPage_social_1ok a{color:white;font-size:2.0em}\n\n.ContentPage_btn_1uZ {\n  background-color: #B76565;\n  color: white\n}\n.ContentPage_btn-default_AF6.ContentPage_active_ju8, .ContentPage_btn-default_AF6.ContentPage_focus_2X4, .ContentPage_btn-default_AF6:active, .ContentPage_btn-default_AF6:focus, .ContentPage_btn-default_AF6:hover, .ContentPage_open_2rC>.ContentPage_dropdown-toggle_Qa3.ContentPage_btn-default_AF6 {\n    color:#B76565;\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "ContentPage_root_1Kg",
  	"container": "ContentPage_container_1JT",
  	"icon-cover": "ContentPage_icon-cover_2i4",
  	"fa-5x": "ContentPage_fa-5x_341",
  	"home-main": "ContentPage_home-main_3Fs",
  	"products": "ContentPage_products_227",
  	"footer-nav": "ContentPage_footer-nav_2gg",
  	"social": "ContentPage_social_1ok",
  	"btn": "ContentPage_btn_1uZ",
  	"btn-default": "ContentPage_btn-default_AF6",
  	"active": "ContentPage_active_ju8",
  	"focus": "ContentPage_focus_2X4",
  	"open": "ContentPage_open_2rC",
  	"dropdown-toggle": "ContentPage_dropdown-toggle_Qa3"
  };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContactPageScss = __webpack_require__(47);
  
  var _ContactPageScss2 = _interopRequireDefault(_ContactPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Contact Us';
  
  var ContactPage = (function (_Component) {
    _inherits(ContactPage, _Component);
  
    function ContactPage() {
      _classCallCheck(this, _ContactPage);
  
      _get(Object.getPrototypeOf(_ContactPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ContactPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _ContactPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _ContactPageScss2['default'].container },
            _react2['default'].createElement(
              'h2',
              { className: 'spacing-sm' },
              'Coming Soon...'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Please Contact us through our Social Media Channels or leave us Your email through the Find out more form Below'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Thanks For Your Interest'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContactPage = ContactPage;
    ContactPage = (0, _decoratorsWithStyles2['default'])(_ContactPageScss2['default'])(ContactPage) || ContactPage;
    return ContactPage;
  })(_react.Component);
  
  exports['default'] = ContactPage;
  module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(48);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContactPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContactPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.ContactPage_root_c4z {\n\n}\n\n.ContactPage_container_2pQ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "ContactPage_root_c4z",
  	"container": "ContactPage_container_2pQ"
  };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _BlogPageScss = __webpack_require__(50);
  
  var _BlogPageScss2 = _interopRequireDefault(_BlogPageScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(29);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var title = 'Blog Page';
  
  var AboutPage = (function (_Component) {
    _inherits(AboutPage, _Component);
  
    _createClass(AboutPage, null, [{
      key: 'propTypes',
      value: {
        content: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function AboutPage(props) {
      _classCallCheck(this, _AboutPage);
  
      _get(Object.getPrototypeOf(_AboutPage.prototype), 'constructor', this).call(this, props);
    }
  
    _createClass(AboutPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(_BlogPageScss2['default'].root, 'container-fluid') },
          _react2['default'].createElement(
            'h1',
            { className: 'page-title' },
            'AKILIHUB Blogs'
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'header',
            { className: 'row' },
            _react2['default'].createElement(
              'ul',
              { id: 'sub-menu-override', className: (0, _classnames2['default'])('nav', 'navbar-nav', 'navbar-center', 'sub-menu', _BlogPageScss2['default'].nav) },
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _BlogPageScss2['default'].link, to: '/blog' },
                  'Data Visualisation'
                )
              )
            )
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'section',
            { className: (0, _classnames2['default'])(_BlogPageScss2['default'].container) },
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_BlogPageScss2['default'].main) },
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-md-9' },
                  _react2['default'].createElement(
                    'article',
                    { className: (0, _classnames2['default'])('articles') },
                    _react2['default'].createElement(
                      'header',
                      null,
                      _react2['default'].createElement(
                        'h2',
                        null,
                        ' Twitter data Visualisation Dashboard: The hows and whats '
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'text-justify' },
                      _react2['default'].createElement('div', { className: 'text-justify', dangerouslySetInnerHTML: { __html: this.props.content || '' } })
                    ),
                    _react2['default'].createElement('hr', null)
                  )
                ),
                _react2['default'].createElement(
                  'div',
                  { className: (0, _classnames2['default'])('col-md-3', _BlogPageScss2['default'].sidebar) },
                  _react2['default'].createElement(
                    'header',
                    { className: 'row' },
                    _react2['default'].createElement(
                      'h3',
                      null,
                      'Top Articles'
                    ),
                    _react2['default'].createElement('hr', null)
                  ),
                  _react2['default'].createElement(
                    'section',
                    null,
                    _react2['default'].createElement(
                      'div',
                      { className: 'row spacing' },
                      _react2['default'].createElement(
                        'header',
                        null,
                        _react2['default'].createElement(
                          _Link2['default'],
                          { className: _BlogPageScss2['default'].link, to: '/blog' },
                          ' Twitter data Visualisation Dashboard'
                        )
                      ),
                      _react2['default'].createElement('hr', null)
                    )
                  )
                )
              )
            )
          )
        );
      }
    }]);
  
    var _AboutPage = AboutPage;
    AboutPage = (0, _decoratorsWithStyles2['default'])(_BlogPageScss2['default'])(AboutPage) || AboutPage;
    return AboutPage;
  })(_react.Component);
  
  exports['default'] = AboutPage;
  module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(51);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./BlogPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./BlogPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n.BlogPage_root_1ob {\n  margin-top: 2em;\n  color: #777;\n  background-color: white;\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.BlogPage_root_1ob h2 {color: #6B6969;}\n.BlogPage_logo_TR7 {\n  padding-left: 4em;\n  padding-bottom: 2em;\n  padding-top: 2em;\n}\n\n.BlogPage_main_255 {\n  margin-right: solid 1px;\n  background-color: white;;\n}\n\n.BlogPage_main_255 hr {color: #777;}\n\n.BlogPage_main_255 h3 {color: #374048;padding-bottom: 2em;}\n.BlogPage_spacing_2OA {\n  margin-top: 5em;\n  margin-bottom: 1em;\n}\n.BlogPage_sidebar_2tQ h3, .BlogPage_sidebar_2tQ a {\n  padding-left: 1em;\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "BlogPage_root_1ob",
  	"logo": "BlogPage_logo_TR7",
  	"main": "BlogPage_main_255",
  	"spacing": "BlogPage_spacing_2OA",
  	"sidebar": "BlogPage_sidebar_2tQ"
  };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFoundPageScss = __webpack_require__(53);
  
  var _NotFoundPageScss2 = _interopRequireDefault(_NotFoundPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Page Not Found';
  
  var NotFoundPage = (function (_Component) {
    _inherits(NotFoundPage, _Component);
  
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
  
      _get(Object.getPrototypeOf(_NotFoundPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageScss2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })(_react.Component);
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(54);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./NotFoundPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./NotFoundPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n* {\n  margin: 0;\n  line-height: 1.2;\n}\n\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\n\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n", ""]);
  
  // exports


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPageScss = __webpack_require__(56);
  
  var _ErrorPageScss2 = _interopRequireDefault(_ErrorPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Error';
  
  var ErrorPage = (function (_Component) {
    _inherits(ErrorPage, _Component);
  
    function ErrorPage() {
      _classCallCheck(this, _ErrorPage);
  
      _get(Object.getPrototypeOf(_ErrorPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ErrorPage = ErrorPage;
    ErrorPage = (0, _decoratorsWithStyles2['default'])(_ErrorPageScss2['default'])(ErrorPage) || ErrorPage;
    return ErrorPage;
  })(_react.Component);
  
  exports['default'] = ErrorPage;
  module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(57);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ErrorPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ErrorPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n* {\n  margin: 0;\n  line-height: 1.2;\n}\n\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\n\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n\n  }\n\n}\n", ""]);
  
  // exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _DataPageScss = __webpack_require__(59);
  
  var _DataPageScss2 = _interopRequireDefault(_DataPageScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _storesDataPageStore = __webpack_require__(61);
  
  var _storesDataPageStore2 = _interopRequireDefault(_storesDataPageStore);
  
  var _Link = __webpack_require__(29);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _actionsDataPageActions = __webpack_require__(67);
  
  var _actionsDataPageActions2 = _interopRequireDefault(_actionsDataPageActions);
  
  var _workerWorker = __webpack_require__(68);
  
  var _workerWorker2 = _interopRequireDefault(_workerWorker);
  
  var _Loader = __webpack_require__(69);
  
  var _Loader2 = _interopRequireDefault(_Loader);
  
  var _TimeRange = __webpack_require__(72);
  
  var _TimeRange2 = _interopRequireDefault(_TimeRange);
  
  var _moment = __webpack_require__(74);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var isBrowser = typeof window !== 'undefined';
  
  var Charts = isBrowser ? __webpack_require__(75) : undefined;
  // import $ from 'jquery';
  // import testData from './data';
  
  function getStateFromStores() {
    return _storesDataPageStore2['default'].getStoreState();
  }
  
  var title = 'Data Center';
  
  var DataCenterPage = (function (_Component) {
    _inherits(DataCenterPage, _Component);
  
    _createClass(DataCenterPage, null, [{
      key: 'propTypes',
      value: {
        content: _react.PropTypes.string.isRequired,
        path: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function DataCenterPage(props) {
      var _this = this;
  
      _classCallCheck(this, _DataCenterPage);
  
      _get(Object.getPrototypeOf(_DataCenterPage.prototype), 'constructor', this).call(this, props);
  
      this.onInitialDataReceived = function (worker) {
        worker.onmessage = function (event) {
          // console.log(event);
          /* eslint-disable no-unused-expressions*/
          _this.isInitialData ? _actionsDataPageActions2['default'].getData(event.data) : _actionsDataPageActions2['default'].update(event.data.data, false);
          _this.isInitialData = false;
        };
      };
  
      this.onNewUpdateDate = function (worker) {
        worker.onmessage = function (event) {
          // console.log(event);
          if (event.data.length) {
            _actionsDataPageActions2['default'].update(event.data, _this.isFirstNewDataPayload);
            if (_this.isFirstNewDataPayload) _this.isFirstNewDataPayload = false;
          } else {
            $('#loader').hide();
            // alert('we may not be having some or all the date for this time range or date');
          }
        };
      };
  
      this.onTimeClick = function (range) {
        var end = range.split('-')[1];
        var now = new Date(_this.currentDate);
        _this.isFirstNewDataPayload = true;
        now.setHours(parseInt(end, 10));
        now.setMinutes(0);
        $('.active').removeClass('active');
        // this.rangeOfHoursToFetch(now);
        _this.getNewData(now.getTime());
      };
  
      this.getNewData = function (unixStartTime) {
        // highling currenly selected time node
        var numberOfWorkers = _this.timeInterval;
        var api = 'http://' + window.location.host + '/api/social/twdata/?';
        $('#loader').show();
        _this.fetchDataUsingWorkers(unixStartTime, {
          timeInterval: _this.timeInterval,
          numberOfWorkers: numberOfWorkers,
          api: api,
          callback: _this.onNewUpdateDate });
      };
  
      this.getNewDateData = function (unixDate) {
        var now = new Date(unixDate);
        // this.timeInterval = 2;
        // setting upper limit hour to 22hr
        now.setHours(12);
        _this.currentDate = now;
        _this.isFirstNewDataPayload = true;
        _this.rangeOfHoursToFetch(now);
        // const unixStartTime = now.getTime() - (this.timeInterval * this.hour);
        _this.getNewData(now.getTime());
      };
  
      this.fetchDataUsingWorkers = function (start, options) {
        var hourParts = options.timeInterval / options.numberOfWorkers;
        for (var i = 0; i < options.numberOfWorkers; i++) {
          var startTime = start + hourParts * i * _this.hour;
          var endTime = start + hourParts * (i + 1) * _this.hour;
          var worker = new _workerWorker2['default']();
          var url = options.api + 'start=' + startTime + '&end=' + endTime;
          worker.postMessage(url);
          options.callback(worker);
        }
      };
  
      this.initalDataFetch = function (numberOfWorkers) {
        // let n = numberOfWorkers;
        var now = new Date();
        if (now.getHours() < 3) {
          // TODO not working as intended
          now.setHours(new Date().getHours() - 3);
        }
        // TODO hack
        now.setHours(new Date().getHours() - 710);
        // higlight time
        var upperEndHour = _this.rangeOfHoursToFetch(now);
        if (upperEndHour) now.setHours(upperEndHour);
        console.log('now : ' + now);
        _this.currentDate = now;
        var unixStartTime = now.getTime() - _this.timeInterval * _this.hour;
        var api = 'http://' + window.location.host + '/api/social/twdata/all/?';
        _this.fetchDataUsingWorkers(unixStartTime, {
          timeInterval: _this.timeInterval,
          numberOfWorkers: numberOfWorkers,
          api: api,
          callback: _this.onInitialDataReceived });
      };
  
      this.rangeOfHoursToFetch = function (now) {
        var endHour = new Date(now).getHours();
        var node = _this.initialTimeNode(endHour);
        while (!node) {
          endHour -= 1;
          _this.nodeNameCounter++;
          // arbitrary set our node time to avoid a stack overflow issue
          node = _this.initialTimeNode(endHour);
          if (_this.nodeNameCounter > _this.timeInterval) {
            endHour = null;
            break;
          }
        }
        _this.nodeNameCounter = 0;
        if (endHour && node) node.className += ' active';
        return endHour;
      };
  
      this.createDcCharts = function (data) {
        // chart container ids and callbacks
        var chartOptions = {
          row: [{ id: 'hashtags', field: 'hashtags' }, { id: 'terms', field: 'terms' }, { id: 'emotions', field: 'emotions' }],
          pie: 'pie',
          map: 'map',
          table: 'table',
          composite: 'composite',
          range: 'range',
          getNewData: _this.getNewDateData,
          postRedraw: function postRedraw() {
            $('#loader').hide();
          },
          postRender: function postRender() {
            $('.' + _DataPageScss2['default'].chart).css('opacity', 1);
            $('#loader').hide();
          }
        };
        _this.charts = new Charts(data, _this.state.aggregate, chartOptions);
        _this.charts.init();
      };
  
      this._onChange = function () {
        _this.setState(getStateFromStores());
      };
  
      this.render = function () {
        var divStyle = isBrowser ? _this.computeMapDivWidth() : null;
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(_DataPageScss2['default'].root, 'container-fluid') },
          _react2['default'].createElement(
            'h1',
            { className: 'page-title' },
            ' AKILIHUB Data Innovation Center'
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'header',
            { className: 'row' },
            _react2['default'].createElement(
              'ul',
              { id: 'sub-menu-override', className: (0, _classnames2['default'])('nav', 'navbar-nav', 'navbar-center', 'sub-menu', _DataPageScss2['default'].nav) },
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _DataPageScss2['default'].link, to: '/data' },
                  'Uganda Decides'
                )
              )
            )
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'section',
            { id: 'main', className: (0, _classnames2['default'])(_DataPageScss2['default'].container) },
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])('col-md-12', _DataPageScss2['default'].main) },
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'article',
                  { className: (0, _classnames2['default'])('articles') },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      'h3',
                      null,
                      'Digging into Uganda\'s social Media Camapaigns related Data'
                    )
                  ),
                  _react2['default'].createElement('div', { className: 'text-justify', dangerouslySetInnerHTML: { __html: _this.props.content || '' } }),
                  _react2['default'].createElement('hr', null)
                ),
                _react2['default'].createElement(
                  'section',
                  { className: (0, _classnames2['default'])(_DataPageScss2['default'].charts, 'charts-dashboard') },
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('row', _DataPageScss2['default'].timeRangeWidget, 'spacing-xsm', _DataPageScss2['default'].chart) },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-6 col-md-offset-3' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        'Select a time range for whose data you would like to fetch '
                      ),
                      _react2['default'].createElement(
                        'p',
                        null,
                        'Viewing Data for : ',
                        _this.currentMomentDate()
                      ),
                      _react2['default'].createElement(_TimeRange2['default'], { clickHandler: _this.onTimeClick, timeInterval: _this.timeInterval })
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('row', 'spacing-xsm', _DataPageScss2['default'].chart) },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-6' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        'Total volume of tweets For particular dates'
                      ),
                      _react2['default'].createElement('div', { id: 'range' }),
                      _react2['default'].createElement(
                        'div',
                        { className: _DataPageScss2['default'].description },
                        _react2['default'].createElement(
                          'small',
                          null,
                          ' This chart reperesents total number of mined tweets for particular dates '
                        ),
                        _react2['default'].createElement(
                          'small',
                          null,
                          'click on a bar to fetch in data for that date '
                        )
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-6' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        'Identifying twitter data sentiments'
                      ),
                      _react2['default'].createElement('div', { id: 'emotions' }),
                      _react2['default'].createElement(
                        'div',
                        { className: _DataPageScss2['default'].description },
                        _react2['default'].createElement(
                          'small',
                          null,
                          ' words that are used in conveying emotions are extracted from each tweet and the most common top 5 words are plotted with their frequency'
                        )
                      )
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'row' },
                    _react2['default'].createElement(
                      'div',
                      { id: 'loader', className: (0, _classnames2['default'])(_DataPageScss2['default'].loader, 'col-sm-6', 'col-sm-offset-3') },
                      _react2['default'].createElement(_Loader2['default'], null)
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('row', 'spacing-xsm', _DataPageScss2['default'].chart) },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-4' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        'Twitter Mentions Per Hour'
                      ),
                      _react2['default'].createElement('div', { id: 'composite', className: 'row' }),
                      _react2['default'].createElement(
                        'div',
                        { className: (0, _classnames2['default'])(_DataPageScss2['default'].legend, 'row') },
                        _react2['default'].createElement(
                          'div',
                          { className: _DataPageScss2['default'].yellow },
                          _react2['default'].createElement(
                            'small',
                            null,
                            'museveni',
                            _react2['default'].createElement('i', null)
                          )
                        ),
                        _react2['default'].createElement(
                          'div',
                          { className: _DataPageScss2['default'].blue },
                          _react2['default'].createElement(
                            'small',
                            null,
                            'Besigye ',
                            _react2['default'].createElement('i', null)
                          )
                        ),
                        _react2['default'].createElement(
                          'div',
                          { className: _DataPageScss2['default'].orange },
                          _react2['default'].createElement(
                            'small',
                            null,
                            'Mbabazi',
                            _react2['default'].createElement('i', null),
                            ' '
                          )
                        )
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-4' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        'Twitter Trending Hashtags'
                      ),
                      _react2['default'].createElement('div', { id: 'hashtags' })
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-4' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        'Twitter Most Frequent Terms'
                      ),
                      _react2['default'].createElement('div', { id: 'terms' })
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('row', 'spacing-xsm', _DataPageScss2['default'].chart) },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-8', ref: 'mapCont', id: 'mapCont' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        ' Geolocating possible source of tweets'
                      ),
                      _react2['default'].createElement(
                        'div',
                        { id: 'map', className: _DataPageScss2['default'].chart, ref: 'map', style: divStyle },
                        ' '
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-4' },
                      _react2['default'].createElement(
                        'h4',
                        null,
                        ' Most Active Twitter users '
                      ),
                      _react2['default'].createElement('div', { id: 'pie' })
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: (0, _classnames2['default'])('row', 'spacing-xsm', _DataPageScss2['default'].chart) },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-11 table-cont' },
                      _react2['default'].createElement(
                        'h3',
                        null,
                        ' Twitter data tables'
                      ),
                      _react2['default'].createElement(
                        'table',
                        { id: 'table', className: (0, _classnames2['default'])('table', 'table-hover', 'table-bordered', 'rt', 'cf') },
                        _react2['default'].createElement(
                          'thead',
                          null,
                          _react2['default'].createElement(
                            'tr',
                            { className: _DataPageScss2['default'].header },
                            _react2['default'].createElement(
                              'th',
                              null,
                              'Tweet'
                            ),
                            _react2['default'].createElement(
                              'th',
                              null,
                              'User'
                            ),
                            _react2['default'].createElement(
                              'th',
                              null,
                              'Date'
                            ),
                            _react2['default'].createElement(
                              'th',
                              null,
                              'Location'
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        );
      };
  
      this.hour = 60000 * 60;
      this.state = getStateFromStores();
      this.path = props.path;
      this.isInitialData = true;
      this.timeInterval = 4;
      this.nodeNameCounter = 0;
      this.currentDate = null;
      this.momentDate = null;
      this.getNewData = this.getNewData;
      this.isAlldata = false;
    }
  
    _createClass(DataCenterPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _storesDataPageStore2['default'].addChangeListener(this._onChange);
        this.initalDataFetch(3);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        this.renderCharts();
        if (this.charts && nextState.newData.length) {
          this.charts.updateData(nextState.newData, nextState.isInitialNewDataUpdate);
          this.charts.reRender();
        }
        return true;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.context.onSetTitle(title);
        _storesDataPageStore2['default'].removeChangeListener(this._onChange);
        this.charts.dcMap.map().remove();
      }
    }, {
      key: 'initialTimeNode',
      value: function initialTimeNode(endHour) {
        var startHour = endHour < this.timeInterval ? endHour + this.timeInterval : endHour - this.timeInterval;
        var nodeName = startHour + '-' + endHour;
        var node = document.getElementById(nodeName);
        return node;
      }
    }, {
      key: 'computeMapDivWidth',
      value: function computeMapDivWidth() {
        var width = 500;
        var height = 400;
        if (window.innerWidth < 500) {
          width = window.innerWidth - window.innerWidth * 0.2;
          height = width * 0.9;
        }
        return {
          width: width + 'px',
          height: height + 'px'
        };
      }
    }, {
      key: 'currentMomentDate',
      value: function currentMomentDate() {
        var date = null;
        if (this.currentDate) {
          var momentDate = (0, _moment2['default'])(new Date(this.currentDate));
          date = momentDate.format('ddd MMM Do');
        }
        return date;
      }
    }, {
      key: 'renderCharts',
      value: function renderCharts() {
        // TODO fall back incase the first batch of received ata is empty
        if (this.state.data.length && !this.charts) {
          try {
            // console.log('initial render');
            this.createDcCharts(this.state.data);
          } catch (e) {
            // TODO hack just reload the page this is an error to do with leaflet.js
            if (!e) window.location.assign(this.path);
            /* eslint-disable no-console */
            console.log(e);
          }
        }
      }
    }]);
  
    var _DataCenterPage = DataCenterPage;
    DataCenterPage = (0, _decoratorsWithStyles2['default'])(_DataPageScss2['default'])(DataCenterPage) || DataCenterPage;
    return DataCenterPage;
  })(_react.Component);
  
  exports['default'] = DataCenterPage;
  module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(60);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./DataPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./DataPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**variables*/\n\n//headers\nh1{font-size:1.35em}\nh2{font-size:1.2em}\nh3{font-size:1.1em}\np{font-size: 0.9em}\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n.DataPage_root_1Bn {\n  margin-top: 2em;\n  color: #777;\n  background-color: white;\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.DataPage_root_1Bn table {margin: 0 auto;}\n.DataPage_root_1Bn h2 {color: #6B6969;}\n.DataPage_chart_2dW{\n  opacity: 0;\n}\n.DataPage_description_3oi{ padding-left: 3em; float: left;}\n.DataPage_timeRangeWidget_3ft h4 {margin-bottom: 1em}\n.DataPage_main_1GV {\n  margin-right: solid 1px;\n  background-color: white;;\n}\n.DataPage_main_1GV hr {color: #777;}\n.DataPage_main_1GV h3 {color: #374048;padding-bottom: 2em;}\n.DataPage_spacing_pJZ {\n  margin-top: 5em;\n  margin-bottom: 1em;\n}\n.DataPage_sidebar_2cr h3, .DataPage_sidebar_2cr a {\n  padding-left: 1em;\n}\n\ntable{\n  font-size: 0.9em;\n}\n\ntable span{display: none}\n.DataPage_legend_2e1 {\n  padding-left: 2em;\n}\n.DataPage_legend_2e1 small{\n  text-align: right;\n}\n.DataPage_legend_2e1 i{\n  width: 4em;\n  height: 1px;\n  margin-left: 2em;\n  border: solid;\n  text-align: center;\n  display: inline-block;\n}\n.DataPage_yellow_30z i{\n  color: yellow;\n}\n.DataPage_blue_1Bj i{\n  color: blue;\n}\n.DataPage_orange_36J i{\n  color: orange;\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"root": "DataPage_root_1Bn",
  	"chart": "DataPage_chart_2dW",
  	"description": "DataPage_description_3oi",
  	"timeRangeWidget": "DataPage_timeRangeWidget_3ft",
  	"main": "DataPage_main_1GV",
  	"spacing": "DataPage_spacing_pJZ",
  	"sidebar": "DataPage_sidebar_2cr",
  	"legend": "DataPage_legend_2e1",
  	"yellow": "DataPage_yellow_30z",
  	"blue": "DataPage_blue_1Bj",
  	"orange": "DataPage_orange_36J"
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _coreDispatcher = __webpack_require__(62);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _constantsActionTypes = __webpack_require__(64);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var _events = __webpack_require__(66);
  
  var CHANGE_EVENT = 'change';
  
  var DataPageStore = (function (_EventEmitter) {
    _inherits(DataPageStore, _EventEmitter);
  
    function DataPageStore() {
      _classCallCheck(this, DataPageStore);
  
      _get(Object.getPrototypeOf(DataPageStore.prototype), 'constructor', this).call(this);
      this.data = [];
      this.newData = [];
      this.isInitialNewDataUpdate = true;
    }
  
    _createClass(DataPageStore, [{
      key: 'emitChange',
      value: function emitChange() {
        this.emit(CHANGE_EVENT);
      }
    }, {
      key: 'addChangeListener',
      value: function addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
      }
    }, {
      key: 'removeChangeListener',
      value: function removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
      }
    }, {
      key: 'update',
      value: function update(newData, updateType) {
        this.newData = newData;
        this.isInitialNewDataUpdate = updateType;
      }
    }, {
      key: 'getIntialData',
      value: function getIntialData(raw) {
        // console.log('intial data');
        this.data = raw.data;
        // console.log('fetched initial');
        // there is a possibility that this can be undefined
        // incases where we use update data as initial data
        if (raw.aggregate !== undefined) this.aggregate = raw.aggregate;
      }
    }, {
      key: 'getStoreState',
      value: function getStoreState() {
        return {
          data: this.data,
          newData: this.newData,
          aggregate: this.aggregate,
          isInitialNewDataUpdate: this.isInitialNewDataUpdate
        };
      }
    }]);
  
    return DataPageStore;
  })(_events.EventEmitter);
  
  var store = new DataPageStore();
  
  _coreDispatcher2['default'].register(function (action) {
    switch (action.actionType) {
      case _constantsActionTypes2['default'].DATAPAGE_RECEIVE_DATA:
        store.getIntialData(action.data);
        store.emitChange();
        break;
      case _constantsActionTypes2['default'].DATAPAGE_UPDATE:
        store.update(action.data, action.updateType);
        store.emitChange();
        break;
      default:
        throw new Error('No specified action');
    }
  });
  
  exports['default'] = store;
  module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _flux = __webpack_require__(63);
  
  var dispatcher = new _flux.Dispatcher();
  
  exports['default'] = dispatcher;
  module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("flux");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fbjsLibKeyMirror = __webpack_require__(65);
  
  var _fbjsLibKeyMirror2 = _interopRequireDefault(_fbjsLibKeyMirror);
  
  exports['default'] = (0, _fbjsLibKeyMirror2['default'])({
    DATAPAGE_RECEIVE_DATA: null,
    DATAPAGE_UPDATE: null
  });
  module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/keyMirror");

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("events");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Data source action dispatched as aresult of getting data from data base
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreDispatcher = __webpack_require__(62);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _constantsActionTypes = __webpack_require__(64);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var DataPageActions = (function () {
    function DataPageActions() {
      _classCallCheck(this, DataPageActions);
    }
  
    _createClass(DataPageActions, [{
      key: 'getData',
      value: function getData(raw) {
        _coreDispatcher2['default'].dispatch({
          actionType: _constantsActionTypes2['default'].DATAPAGE_RECEIVE_DATA,
          data: raw
        });
      }
    }, {
      key: 'update',
      value: function update(raw, updateType) {
        _coreDispatcher2['default'].dispatch({
          actionType: _constantsActionTypes2['default'].DATAPAGE_UPDATE,
          data: raw,
          updateType: updateType
        });
      }
    }]);
  
    return DataPageActions;
  })();
  
  exports['default'] = new DataPageActions();
  module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = function() {
  	return new Worker(__webpack_require__.p + "77f827ab61bcf3e4df99.worker.js");
  };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LoaderScss = __webpack_require__(70);
  
  var _LoaderScss2 = _interopRequireDefault(_LoaderScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var Loader = (function (_Component) {
    _inherits(Loader, _Component);
  
    function Loader() {
      _classCallCheck(this, _Loader);
  
      _get(Object.getPrototypeOf(_Loader.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Loader, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'p',
          { className: 'text-center' },
          _react2['default'].createElement(
            'span',
            { className: (0, _classnames2['default'])(_LoaderScss2['default'].ouro, _LoaderScss2['default'].ouo2) },
            _react2['default'].createElement(
              'span',
              { className: _LoaderScss2['default'].left },
              _react2['default'].createElement('span', { className: _LoaderScss2['default'].anim })
            ),
            _react2['default'].createElement(
              'span',
              { className: _LoaderScss2['default'].right },
              _react2['default'].createElement('span', { className: _LoaderScss2['default'].anim })
            )
          )
        );
      }
    }]);
  
    var _Loader = Loader;
    Loader = (0, _decoratorsWithStyles2['default'])(_LoaderScss2['default'])(Loader) || Loader;
    return Loader;
  })(_react.Component);
  
  exports['default'] = Loader;
  module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(71);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Loader.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Loader.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**Spinner**/\n.Loader_ouro_2h9 {\n    position: relative;\n    display:inline-block;\n    height: 46px;\n    width: 46px;\n    margin: 1em;\n    border-radius: 50%;\n    background: none repeat scroll 0 0 #DDDDDD;\n    overflow:hidden;\n    -webkit-box-shadow: 0 0 10px rgba(0,0,0,.1) inset, 0 0 25px rgba(0,0,255,0.075);\n            box-shadow: 0 0 10px rgba(0,0,0,.1) inset, 0 0 25px rgba(0,0,255,0.075);\n}\n\n.Loader_ouro_2h9:after {\n    content: \"\";\n    position: absolute;\n    top: 9px; left: 9px;\n    display: block;\n    height: 28px; width: 28px;\n    background: none repeat scroll 0 0 #F2F2F2;\n    border-radius: 50%;\n    -webkit-box-shadow: 0 0 10px rgba(0,0,0,.1);\n            box-shadow: 0 0 10px rgba(0,0,0,.1);\n}\n.Loader_ouro_2h9 > span {\n    position: absolute;\n    height: 100%; width: 50%;\n    overflow: hidden;\n}\n.Loader_left_Occ  { left:0   }\n.Loader_right_2CJ { left:50% }\n\n.Loader_anim_2a7 {\n    position: absolute;\n    left: 100%; top: 0;\n    height: 100%; width: 100%;\n    border-radius: 999px;\n    background: none repeat scroll 0 0 #508EC3;\n    opacity: 0.8;\n    -webkit-animation: Loader_ui-spinner-rotate-left_kH6 3s infinite;\n    -o-animation: Loader_ui-spinner-rotate-left_kH6 3s infinite;\n       animation: Loader_ui-spinner-rotate-left_kH6 3s infinite;\n    -webkit-transform-origin: 0 50% 0;\n    -ms-transform-origin: 0 50% 0;\n     -o-transform-origin: 0 50% 0;\n        transform-origin: 0 50% 0;\n}\n.Loader_left_Occ .Loader_anim_2a7 {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0;\n}\n.Loader_right_2CJ .Loader_anim_2a7 {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0;\n    left: -100%;\n    -webkit-transform-origin: 100% 50% 0;\n    -ms-transform-origin: 100% 50% 0;\n     -o-transform-origin: 100% 50% 0;\n        transform-origin: 100% 50% 0;\n}\n\n/* v2 */\n.Loader_ouro2_11V .Loader_anim_2a7 {\n   -webkit-animation-delay:0;\n   -o-animation-delay:0;\n      animation-delay:0;\n}\n.Loader_ouro2_11V .Loader_right_2CJ .Loader_anim_2a7{\n   -webkit-animation-delay: 1.5s;\n   -o-animation-delay: 1.5s;\n      animation-delay: 1.5s;\n}\n\n\n/* round variation */\n.Loader_round_1Tl .Loader_ouro_2h9:after {display:none }\n\n/* double variation */\n.Loader_double_2w1 .Loader_ouro_2h9:after {\n  height: 13px; width: 13px;\n  left: 7px; top: 7px;\n  border: 10px solid #ddd;\n  background: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n\n@-webkit-keyframes Loader_ui-spinner-rotate-right_2-Y{\n  0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}\n  25%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}\n  50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}\n  75%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}\n  100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}\n}\n\n@-o-keyframes Loader_ui-spinner-rotate-right_2-Y{\n  0%{-o-transform:rotate(0deg);transform:rotate(0deg)}\n  25%{-o-transform:rotate(180deg);transform:rotate(180deg)}\n  50%{-o-transform:rotate(180deg);transform:rotate(180deg)}\n  75%{-o-transform:rotate(360deg);transform:rotate(360deg)}\n  100%{-o-transform:rotate(360deg);transform:rotate(360deg)}\n}\n\n@keyframes Loader_ui-spinner-rotate-right_2-Y{\n  0%{-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}\n  25%{-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}\n  50%{-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}\n  75%{-webkit-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}\n  100%{-webkit-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}\n}\n@-webkit-keyframes Loader_ui-spinner-rotate-left_kH6{\n  0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}\n  25%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}\n  50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}\n  75%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}\n  100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}\n}\n@-o-keyframes Loader_ui-spinner-rotate-left_kH6{\n  0%{-o-transform:rotate(0deg);transform:rotate(0deg)}\n  25%{-o-transform:rotate(0deg);transform:rotate(0deg)}\n  50%{-o-transform:rotate(180deg);transform:rotate(180deg)}\n  75%{-o-transform:rotate(180deg);transform:rotate(180deg)}\n  100%{-o-transform:rotate(360deg);transform:rotate(360deg)}\n}\n@keyframes Loader_ui-spinner-rotate-left_kH6{\n  0%{-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}\n  25%{-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}\n  50%{-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}\n  75%{-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}\n  100%{-webkit-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}\n}\n", ""]);
  
  // exports
  exports.locals = {
  	"ouro": "Loader_ouro_2h9",
  	"left": "Loader_left_Occ",
  	"right": "Loader_right_2CJ",
  	"anim": "Loader_anim_2a7",
  	"ui-spinner-rotate-left": "Loader_ui-spinner-rotate-left_kH6",
  	"ouro2": "Loader_ouro2_11V",
  	"round": "Loader_round_1Tl",
  	"double": "Loader_double_2w1",
  	"ui-spinner-rotate-right": "Loader_ui-spinner-rotate-right_2-Y"
  };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Item = __webpack_require__(73);
  
  var _Item2 = _interopRequireDefault(_Item);
  
  var TimeRange = (function (_Component) {
    _inherits(TimeRange, _Component);
  
    _createClass(TimeRange, null, [{
      key: 'propTypes',
      value: {
        clickHandler: _react.PropTypes.func.isRequired,
        timeInterval: _react.PropTypes.number
      },
      enumerable: true
    }]);
  
    function TimeRange(props) {
      _classCallCheck(this, TimeRange);
  
      _get(Object.getPrototypeOf(TimeRange.prototype), 'constructor', this).call(this, props);
      this.clickHandler = this.props.clickHandler;
      this.timeInterval = this.props.timeInterval;
    }
  
    _createClass(TimeRange, [{
      key: 'render',
      value: function render() {
        var items = [];
        var timeSpan = 24 / this.timeInterval;
        for (var i = 0; i < timeSpan; i++) {
          var start = i * this.timeInterval;
          var end = start + this.timeInterval;
          var range = start + ' - ' + end;
          items.push(_react2['default'].createElement(_Item2['default'], { key: end, range: range, clickHandler: this.clickHandler }));
        }
        return _react2['default'].createElement(
          'div',
          { className: 'btn-toolbar', role: 'toolbar' },
          items
        );
      }
    }]);
  
    return TimeRange;
  })(_react.Component);
  
  exports['default'] = TimeRange;
  module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var Item = (function (_Component) {
    _inherits(Item, _Component);
  
    _createClass(Item, null, [{
      key: 'propTypes',
      value: {
        range: _react.PropTypes.string,
        clickHandler: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function Item(props) {
      var _this = this;
  
      _classCallCheck(this, Item);
  
      _get(Object.getPrototypeOf(Item.prototype), 'constructor', this).call(this, props);
  
      this.render = function () {
        return _react2['default'].createElement(
          'div',
          { className: 'btn-group btn-group-sm', role: 'group' },
          _react2['default'].createElement(
            'button',
            { type: 'button', className: 'btn btn-default', id: _this.nodeName, onClick: _this.clickHandler.bind(_this, _this.range) },
            _this.range,
            'hrs'
          )
        );
      };
  
      this.range = props.range;
      this.nodeName = props.range.replace(/\s/g, '');
      this.clickHandler = props.clickHandler;
    }
  
    return Item;
  })(_react.Component);
  
  exports['default'] = Item;
  module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = require("moment");

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _dc = __webpack_require__(76);
  
  var _dc2 = _interopRequireDefault(_dc);
  
  var _coreCfHelper = __webpack_require__(81);
  
  var _coreCfHelper2 = _interopRequireDefault(_coreCfHelper);
  
  __webpack_require__(84);
  
  var _moment = __webpack_require__(74);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _c3 = __webpack_require__(85);
  
  var _c32 = _interopRequireDefault(_c3);
  
  __webpack_require__(86);
  
  var DcCharts = (function () {
    function DcCharts(data, aggregate, options) {
      var _this = this;
  
      _classCallCheck(this, DcCharts);
  
      this._tablesRefresh = function () {
        _dc2['default'].events.trigger(function () {
          var alldata = _this.tableDimension.top(Infinity);
          _this.datatable.fnClearTable();
          _this.datatable.fnAddData(alldata);
          _this.datatable.fnDraw();
        });
      };
  
      this._Tablefilter = function () {
        // filter all charts when using the datatables search box
        // TODO use react state lifecycle
        /* eslint-disable func-names*/
        var self = _this;
        $(':input').on('keyup', function () {
          var _this2 = this;
  
          if (this.value !== '') {
            self.tableDimension.filter(function (d) {
              return d.indexOf(_this2.value.toLowerCase()) !== -1;
            });
            self._tablesRefresh();
            _dc2['default'].redrawAll();
          } else {
            self.tableDimension.filterAll();
          }
        });
      };
  
      this.lastDate = null;
      this.charts = null;
      this.options = options;
      this.rowChartsObjs = {};
      this.aggregate = aggregate;
      var transformedData = this._dataTransform(data);
      this.data = _coreCfHelper2['default'].createCrossFilter(transformedData);
      this.hourDim = this.createDimenion('hour');
    }
  
    _createClass(DcCharts, [{
      key: '_dataTransform',
      value: function _dataTransform(data) {
        this.lowerLimit = data[0].timeStamp;
        this.upperLimit = data[data.length - 1].timeStamp;
        data.forEach(function (d) {
          var momentDate = (0, _moment2['default'])(new Date(d.date));
          d.hour = momentDate.hour();
          d.date = momentDate.format('ddd MMM Do, HH:mm');
        });
        return data;
      }
    }, {
      key: 'updateData',
      value: function updateData(raw, isFirstNewDateUpdate) {
        var newData = this._dataTransform(raw);
        // console.log('should update isInitialUpdate: ' + isFirstNewDateUpdate);
        if (isFirstNewDateUpdate) this.data.remove();
        this.data.add(newData);
        this.drawRowCharts(true);
        this.drawPieChart(true);
        // console.log(`updated data ${this.data.size()}`);
      }
    }, {
      key: 'init',
      value: function init() {
        // leaflet map
        this.dcMap = this.drawMap(this.options.map);
        this.dcMap.on('postRender', this.options.postRender);
        this.dcMap.on('postRedraw', this.options.postRedraw);
        this.drawPieChart(false);
        this.createDataTable(this.options.table);
        // row Charts
        this.drawRowCharts(false);
        this.drawComposite(this.options.composite);
        // this.charts.drawRangeChart('range', this.state.aggregate, this.getNewData);
        // const aggregate = this.aggregate.map(d => moment(d.key, 'MM-DD-YYYY'));
        this.rangeChart(this.options.range, this.aggregate, this.options.getNewData);
        _dc2['default'].renderAll();
      }
    }, {
      key: 'computeBestWidth',
      value: function computeBestWidth(width) {
        var w = width;
        if (window.innerWidth < w) w = window.innerWidth - window.innerWidth * 0.2;
        return w;
      }
    }, {
      key: 'reRender',
      value: function reRender() {
        _dc2['default'].redrawAll();
        this._tablesRefresh();
      }
    }, {
      key: 'createDataTable',
      value: function createDataTable(table) {
        this.tableDimension = this.data.dimension(function (d) {
          return d.text + ' ' + d.screen_name;
        });
        this.datatable = $('#' + table);
        // initialize datatable
        this.datatable.dataTable(this._dataTablesOptions());
        // call RefreshTable wshen dc-charts are filtered
        for (var i = 0; i < _dc2['default'].chartRegistry.list().length; i++) {
          var chartI = _dc2['default'].chartRegistry.list()[i];
          chartI.on('filtered', this._tablesRefresh);
        }
        // styling
        $('input,select,.table-cont a').addClass('btn btn-default');
        // initial table refresh/draw
        this._tablesRefresh();
        // table filter
        this._Tablefilter();
      }
    }, {
      key: '_dataTablesOptions',
      value: function _dataTablesOptions() {
        return {
          'responsive': true,
          'pageLength': 5,
          'order': [[2, 'desc']],
          'bSort': true,
          columnDefs: [{
            targets: 0,
            data: function data(d) {
              return d.text;
            },
            defaultContent: ''
          }, {
            targets: 1,
            data: function data(d) {
              return d.screen_name;
            },
            defaultContent: ''
          }, {
            targets: 2,
            data: function data(d) {
              return '<span>' + d.timeStamp + '</span>' + d.date;
            }
          }, {
            targets: 3,
            data: function data(d) {
              return d.location;
            },
            defaultContent: ''
          }]
        };
      }
    }, {
      key: 'createGroup',
      value: function createGroup(dim, attr) {
        return _coreCfHelper2['default'].createSumGroup(dim, attr);
      }
    }, {
      key: 'createDimenion',
      value: function createDimenion(attr) {
        return _coreCfHelper2['default'].createDimension(this.data, attr);
      }
    }, {
      key: 'createGroupAndDimArrayField',
      value: function createGroupAndDimArrayField(attr) {
        return _coreCfHelper2['default'].arrayDimAndGroup(this.data, attr);
      }
    }, {
      key: 'drawRowCharts',
      value: function drawRowCharts(isRedraw) {
        var _this3 = this;
  
        this.options.row.forEach(function (d) {
          var _createGroupAndDimArrayField = _this3.createGroupAndDimArrayField(d.field);
  
          var dim = _createGroupAndDimArrayField.dim;
          var group = _createGroupAndDimArrayField.group;
  
          if (!isRedraw) {
            _this3.rowChartsObjs[d.field] = _this3.rowChart(dim, group, d.id);
          } else {
            _this3.rowChartsObjs[d.field].dimension(dim);
            _this3.rowChartsObjs[d.field].group(group);
          }
        });
      }
    }, {
      key: 'rowChart',
      value: function rowChart(dim, group, rowId) {
        return _dc2['default'].rowChart('#' + rowId).width(this.computeBestWidth(330)).height(300).margins({
          top: 10,
          right: 10,
          bottom: 20,
          left: 40
        }).dimension(dim).group(group).ordering(function (p) {
          return -p.value;
        }).elasticX(true);
      }
    }, {
      key: 'drawMap',
      value: function drawMap(container) {
        if (this.mapDim) this.mapDim.dispose();
        this.mapDim = this.createDimenion('coordinates');
        var mapGroup = this.mapDim.group().reduceCount();
        return this.mapChart(this.mapDim, mapGroup, container);
      }
    }, {
      key: 'mapChart',
      value: function mapChart(dim, grp, mapId) {
        var mapGroup = _coreCfHelper2['default'].fakeGroup(grp, 'key');
        // console.log('map count: '+ mapGroup.all().length);
        return _dc2['default'].leafletMarkerChart('#' + mapId).dimension(dim).group(mapGroup).width(this.computeBestWidth(500)).height(400).zoom(12).fitOnRender(true).fitOnRedraw(true).cluster(true);
      }
    }, {
      key: 'drawPieChart',
      value: function drawPieChart(isRedraw) {
        var dim = this.createDimenion('screen_name');
        var group = dim.group();
        if (!isRedraw) {
          this.pie = this.pieChart(dim, group, this.options.pie);
        } else {
          this.pie.group(_coreCfHelper2['default'].reduceGroupObjs(group));
        }
      }
    }, {
      key: 'pieChart',
      value: function pieChart(dim, grp, pie) {
        return _dc2['default'].pieChart('#' + pie).dimension(dim).group(_coreCfHelper2['default'].reduceGroupObjs(grp)).width(200).height(200).renderLabel(true).renderTitle(true).ordering(function (p) {
          return -p.value;
        });
      }
    }, {
      key: 'drawLineChart',
      value: function drawLineChart(id) {
        // line chart
        var lineGroup = this.createGroup(this.hourDim, 'sentiment');
        this.line = this.lineChart(this.hourDim, lineGroup, id);
      }
    }, {
      key: 'multiLineCharts',
      value: function multiLineCharts(dim, options) {
        options.forEach(function (d) {
          _dc2['default'].lineChart('#' + d.id).width(350).height(250).x(_dc2['default'].d3.scale.linear().domain([0, 24])).elasticY(true).elasticX(true).brushOn(true).renderDataPoints(true).yAxisLabel('Y axis').xUnits(_dc2['default'].d3.time.hours).dimension(dim).group(d.group);
        });
      }
    }, {
      key: 'drawComposite',
      value: function drawComposite(id) {
        var museveniGroup = this.hourDim.group().reduceSum(function (d) {
          return d.museveni;
        });
        var besigyeGroup = this.hourDim.group().reduceSum(function (d) {
          return d.besigye;
        });
        var mbabaziGroup = this.hourDim.group().reduceSum(function (d) {
          return d.mbabazi;
        });
        var groups = [museveniGroup, besigyeGroup, mbabaziGroup];
        this.compositeLineChart(this.hourDim, groups, id);
      }
    }, {
      key: 'lineChartsCompFactory',
      value: function lineChartsCompFactory(composite, dim, group, color) {
        return _dc2['default'].lineChart(composite).dimension(dim).colors(color).brushOn(true).group(group);
      }
    }, {
      key: 'compositeLineChart',
      value: function compositeLineChart(dim, groups, chartId) {
        var composite = _dc2['default'].compositeChart('#' + chartId);
        // const self = this;
        composite.width(this.computeBestWidth(450)).height(300).yAxisLabel('Tweets').xAxisLabel('Hours').renderHorizontalGridLines(true).x(_dc2['default'].d3.scale.linear().domain([0, 24])).xUnits(_dc2['default'].d3.time.hours).elasticY(true).elasticX(true).brushOn(false).compose([this.lineChartsCompFactory(composite, dim, groups[0], 'yellow'), this.lineChartsCompFactory(composite, dim, groups[1], 'blue'), this.lineChartsCompFactory(composite, dim, groups[2], 'orange')]).render();
      }
    }, {
      key: 'lineChart',
      value: function lineChart(dimension, group, chartId) {
        return _dc2['default'].lineChart('#' + chartId).width(this.computeBestWidth(350)).height(250).x(_dc2['default'].d3.scale.linear().domain([new Date(this.lowerLimit), new Date(this.upperLimit)])).elasticY(true).elasticX(true).brushOn(true).renderDataPoints(true).yAxisLabel('Y axis').xUnits(_dc2['default'].d3.time.hours).dimension(dimension).group(group);
      }
    }, {
      key: 'rangeChart',
      value: function rangeChart(chartId, data, callback) {
        var styles = {
          stroke: 'rgb(20, 119, 180)',
          fill: 'rgb(20, 119, 180)',
          opacity: 0.5
        };
        return _c32['default'].generate({
          bindto: '#' + chartId,
          onrendered: function onrendered() {
            $('.c3-bar-' + (data.length - 1)).css(styles);
          },
          data: {
            json: data,
            keys: {
              x: 'date',
              value: ['tweets']
            },
            type: 'bar',
            onclick: function onclick(d, element) {
              $(element).css(styles);
              // console.log(d.x);
              var startTime = (0, _moment2['default'])(d.x).valueOf();
              callback(startTime);
            }
          },
          bar: {
            width: {
              ratio: 0.25
            }
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%m-%d'
              },
              label: {
                text: 'Dates',
                position: 'outer-middle'
              }
            },
            y: {
              label: {
                text: 'Total Tweets',
                position: 'outer-middle'
              }
            }
          }
        });
      }
    }]);
  
    return DcCharts;
  })();
  
  exports['default'] = DcCharts;
  module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dc2 = __webpack_require__(77);
  
  var _dc3 = _interopRequireDefault(_dc2);
  
  var _leaflet = __webpack_require__(78);
  
  var _leaflet2 = _interopRequireDefault(_leaflet);
  
  __webpack_require__(79);
  
  var _dcAddons = __webpack_require__(80);
  
  var _dcAddons2 = _interopRequireDefault(_dcAddons);
  
  _leaflet2['default'].Icon.Default.imagePath = 'images';
  exports['default'] = (0, _dcAddons2['default'])(_dc3['default'], _leaflet2['default']);
  module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("dc");

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("leaflet");

/***/ },
/* 79 */
/***/ function(module, exports) {

  module.exports = require("leaflet.markercluster");

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = require("dc-addons");

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * cross filter helper
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _crossfilter2 = __webpack_require__(82);
  
  var _crossfilter22 = _interopRequireDefault(_crossfilter2);
  
  var _lodash = __webpack_require__(83);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var CfHelper = (function () {
    function CfHelper() {
      _classCallCheck(this, CfHelper);
    }
  
    _createClass(CfHelper, [{
      key: 'createCrossFilter',
      value: function createCrossFilter(data) {
        return (0, _crossfilter22['default'])(data);
      }
    }, {
      key: 'getMinAndMax',
      value: function getMinAndMax(group, field) {
        var keys = group.all().map(function (d) {
          return d[field];
        });
        return [_lodash2['default'].max(keys), _lodash2['default'].min(keys)];
      }
    }, {
      key: 'createDimension',
      value: function createDimension(cfData, type) {
        try {
          return cfData.dimension(function (d) {
            if (d[type]) return d[type];
          });
        } catch (e) {
          /* eslint-disable no-console */
          console.log(e.stack);
        }
      }
    }, {
      key: 'reduceGroupObjs',
      value: function reduceGroupObjs(group) {
        // find highest value
        var topObj = group.top(1);
        // console.log(topObj);
        return {
          all: function all() {
            return group.all().filter(function (d) {
              return d.value > Math.floor(topObj[0].value / 3);
            });
          }
        };
      }
    }, {
      key: 'fakeGroup',
      value: function fakeGroup(group, field) {
        return {
          all: function all() {
            return group.all().filter(function (d) {
              return d[field].length > 1;
            });
          }
        };
      }
    }, {
      key: 'purgeNumericalGroup',
      value: function purgeNumericalGroup(group, field) {
        return {
          all: function all() {
            return group.all().filter(function (d) {
              return !isNaN(parseFloat(d[field])) && isFinite(d[field]);
            });
          }
        };
      }
    }, {
      key: 'createSumGroup',
      value: function createSumGroup(dim, attr) {
        var grp = dim.group().reduceSum(function (d) {
          return d[attr];
        });
        /* grp.all = () => {
          return grp.all().filter(d => d.value !== 0 || d.value !== null);
        }; */
        return grp;
      }
    }, {
      key: 'createGroupByCount',
      value: function createGroupByCount(dimension, fn) {
        return dimension.group().reduceSum(fn);
      }
    }, {
      key: 'groupDimensionBySum',
      value: function groupDimensionBySum(dimension, field) {
        return dimension.group().reduceCount(function (d) {
          return d[field];
        });
      }
    }, {
      key: 'reduceAdd',
      value: function reduceAdd(attr) {
        return function (p, v) {
          if (!v[attr].length || v[attr] === null || v[attr] === 'null') return p; // skip empty arrays
          v[attr].forEach(function (val) {
            p[val] = (p[val] || 0) + 1; // increment counts
          });
          // console.log(p);
          return p;
        };
      }
    }, {
      key: 'reduceRemove',
      value: function reduceRemove(attr) {
        return function (p, v) {
          if (!v[attr].length || v[attr] === null || v[attr] === 'null') return p; // skip empty arrays
          v[attr].forEach(function (val) {
            p[val] = (p[val] || 0) - 1; // decrement counts
          });
          return p;
        };
      }
    }, {
      key: 'reduceInitial',
      value: function reduceInitial() {
        return {};
      }
    }, {
      key: 'allGroupPatch',
      value: function allGroupPatch(group) {
        /* eslint-disable func-names */
        group.all = function () {
          var newObject = [];
          for (var key in this) {
            if (this.hasOwnProperty(key) && key !== 'all' && key !== 'top') {
              newObject.push({
                key: key,
                value: this[key]
              });
            }
          }
          return newObject;
        };
      }
    }, {
      key: 'topGroupPatch',
      value: function topGroupPatch(group) {
        /* eslint-disable func-names */
        group.top = function (count) {
          var newObject = this.all();
          newObject.sort(function (a, b) {
            return b.value - a.value;
          });
          return newObject.slice(0, count);
        };
      }
    }, {
      key: '_removeLowGroupObjs',
      value: function _removeLowGroupObjs(group) {
        // find highest value
        var values = _lodash2['default'].values(group);
        var max = _lodash2['default'].max(values);
        var transformedGrp = {};
        var count = 0;
        _lodash2['default'].forOwn(group, function (value, key) {
          if (value > Math.floor(max / 8) && count < 6) {
            transformedGrp[key] = value;
            count++;
          }
        });
        return transformedGrp;
      }
    }, {
      key: 'groupPatches',
      value: function groupPatches(group) {
        this.allGroupPatch(group);
        this.topGroupPatch(group);
        return group;
      }
    }, {
      key: 'arrayDimAndGroup',
      value: function arrayDimAndGroup(cfData, attr) {
        function reduceInitial() {
          return {};
        }
        var dim = this.createDimension(cfData, attr);
        var rawGrp = dim.groupAll().reduce(this.reduceAdd(attr), this.reduceRemove(attr), reduceInitial).value();
        // console.log(rawGrp);
        var group = this._removeLowGroupObjs(rawGrp);
        this.groupPatches(group);
        return { dim: dim, group: group };
      }
    }]);
  
    return CfHelper;
  })();
  
  exports['default'] = new CfHelper();
  module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = require("crossfilter2");

/***/ },
/* 83 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("datatables");

/***/ },
/* 85 */
/***/ function(module, exports) {

  module.exports = require("c3");

/***/ },
/* 86 */
/***/ function(module, exports) {

  // SVGPathSeg API polyfill
  // https://github.com/progers/pathseg
  //
  // This is a drop-in replacement for the SVGPathSeg and SVGPathSegList APIs that were removed from
  // SVG2 (https://lists.w3.org/Archives/Public/www-svg/2015Jun/0044.html), including the latest spec
  // changes which were implemented in Firefox 43 and Chrome 46.
  
  "use strict";
  
  (function () {
      "use strict";
      if (!("SVGPathSeg" in window)) {
          // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
          window.SVGPathSeg = function (type, typeAsLetter, owningPathSegList) {
              this.pathSegType = type;
              this.pathSegTypeAsLetter = typeAsLetter;
              this._owningPathSegList = owningPathSegList;
          };
  
          SVGPathSeg.PATHSEG_UNKNOWN = 0;
          SVGPathSeg.PATHSEG_CLOSEPATH = 1;
          SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
          SVGPathSeg.PATHSEG_MOVETO_REL = 3;
          SVGPathSeg.PATHSEG_LINETO_ABS = 4;
          SVGPathSeg.PATHSEG_LINETO_REL = 5;
          SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
          SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
          SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
          SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
          SVGPathSeg.PATHSEG_ARC_ABS = 10;
          SVGPathSeg.PATHSEG_ARC_REL = 11;
          SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
          SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
          SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
          SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
          SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
          SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
          SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
          SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
  
          // Notify owning PathSegList on any changes so they can be synchronized back to the path element.
          SVGPathSeg.prototype._segmentChanged = function () {
              if (this._owningPathSegList) this._owningPathSegList.segmentChanged(this);
          };
  
          window.SVGPathSegClosePath = function (owningPathSegList) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
          };
          SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegClosePath.prototype.toString = function () {
              return "[object SVGPathSegClosePath]";
          };
          SVGPathSegClosePath.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter;
          };
          SVGPathSegClosePath.prototype.clone = function () {
              return new SVGPathSegClosePath(undefined);
          };
  
          window.SVGPathSegMovetoAbs = function (owningPathSegList, x, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
              this._x = x;
              this._y = y;
          };
          SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegMovetoAbs.prototype.toString = function () {
              return "[object SVGPathSegMovetoAbs]";
          };
          SVGPathSegMovetoAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
          };
          SVGPathSegMovetoAbs.prototype.clone = function () {
              return new SVGPathSegMovetoAbs(undefined, this._x, this._y);
          };
          Object.defineProperty(SVGPathSegMovetoAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegMovetoAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegMovetoRel = function (owningPathSegList, x, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
              this._x = x;
              this._y = y;
          };
          SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegMovetoRel.prototype.toString = function () {
              return "[object SVGPathSegMovetoRel]";
          };
          SVGPathSegMovetoRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
          };
          SVGPathSegMovetoRel.prototype.clone = function () {
              return new SVGPathSegMovetoRel(undefined, this._x, this._y);
          };
          Object.defineProperty(SVGPathSegMovetoRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegMovetoRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegLinetoAbs = function (owningPathSegList, x, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
              this._x = x;
              this._y = y;
          };
          SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegLinetoAbs.prototype.toString = function () {
              return "[object SVGPathSegLinetoAbs]";
          };
          SVGPathSegLinetoAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
          };
          SVGPathSegLinetoAbs.prototype.clone = function () {
              return new SVGPathSegLinetoAbs(undefined, this._x, this._y);
          };
          Object.defineProperty(SVGPathSegLinetoAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegLinetoAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegLinetoRel = function (owningPathSegList, x, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
              this._x = x;
              this._y = y;
          };
          SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegLinetoRel.prototype.toString = function () {
              return "[object SVGPathSegLinetoRel]";
          };
          SVGPathSegLinetoRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
          };
          SVGPathSegLinetoRel.prototype.clone = function () {
              return new SVGPathSegLinetoRel(undefined, this._x, this._y);
          };
          Object.defineProperty(SVGPathSegLinetoRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegLinetoRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoCubicAbs = function (owningPathSegList, x, y, x1, y1, x2, y2) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
              this._x = x;
              this._y = y;
              this._x1 = x1;
              this._y1 = y1;
              this._x2 = x2;
              this._y2 = y2;
          };
          SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoCubicAbs.prototype.toString = function () {
              return "[object SVGPathSegCurvetoCubicAbs]";
          };
          SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoCubicAbs.prototype.clone = function () {
              return new SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
          };
          Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x1", { get: function get() {
                  return this._x1;
              }, set: function set(x1) {
                  this._x1 = x1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y1", { get: function get() {
                  return this._y1;
              }, set: function set(y1) {
                  this._y1 = y1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x2", { get: function get() {
                  return this._x2;
              }, set: function set(x2) {
                  this._x2 = x2;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y2", { get: function get() {
                  return this._y2;
              }, set: function set(y2) {
                  this._y2 = y2;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoCubicRel = function (owningPathSegList, x, y, x1, y1, x2, y2) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
              this._x = x;
              this._y = y;
              this._x1 = x1;
              this._y1 = y1;
              this._x2 = x2;
              this._y2 = y2;
          };
          SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoCubicRel.prototype.toString = function () {
              return "[object SVGPathSegCurvetoCubicRel]";
          };
          SVGPathSegCurvetoCubicRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoCubicRel.prototype.clone = function () {
              return new SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
          };
          Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x1", { get: function get() {
                  return this._x1;
              }, set: function set(x1) {
                  this._x1 = x1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y1", { get: function get() {
                  return this._y1;
              }, set: function set(y1) {
                  this._y1 = y1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x2", { get: function get() {
                  return this._x2;
              }, set: function set(x2) {
                  this._x2 = x2;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y2", { get: function get() {
                  return this._y2;
              }, set: function set(y2) {
                  this._y2 = y2;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoQuadraticAbs = function (owningPathSegList, x, y, x1, y1) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
              this._x = x;
              this._y = y;
              this._x1 = x1;
              this._y1 = y1;
          };
          SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () {
              return "[object SVGPathSegCurvetoQuadraticAbs]";
          };
          SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () {
              return new SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1);
          };
          Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x1", { get: function get() {
                  return this._x1;
              }, set: function set(x1) {
                  this._x1 = x1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y1", { get: function get() {
                  return this._y1;
              }, set: function set(y1) {
                  this._y1 = y1;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoQuadraticRel = function (owningPathSegList, x, y, x1, y1) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
              this._x = x;
              this._y = y;
              this._x1 = x1;
              this._y1 = y1;
          };
          SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoQuadraticRel.prototype.toString = function () {
              return "[object SVGPathSegCurvetoQuadraticRel]";
          };
          SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoQuadraticRel.prototype.clone = function () {
              return new SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1);
          };
          Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x1", { get: function get() {
                  return this._x1;
              }, set: function set(x1) {
                  this._x1 = x1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y1", { get: function get() {
                  return this._y1;
              }, set: function set(y1) {
                  this._y1 = y1;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegArcAbs = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
              this._x = x;
              this._y = y;
              this._r1 = r1;
              this._r2 = r2;
              this._angle = angle;
              this._largeArcFlag = largeArcFlag;
              this._sweepFlag = sweepFlag;
          };
          SVGPathSegArcAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegArcAbs.prototype.toString = function () {
              return "[object SVGPathSegArcAbs]";
          };
          SVGPathSegArcAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y;
          };
          SVGPathSegArcAbs.prototype.clone = function () {
              return new SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
          };
          Object.defineProperty(SVGPathSegArcAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcAbs.prototype, "r1", { get: function get() {
                  return this._r1;
              }, set: function set(r1) {
                  this._r1 = r1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcAbs.prototype, "r2", { get: function get() {
                  return this._r2;
              }, set: function set(r2) {
                  this._r2 = r2;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcAbs.prototype, "angle", { get: function get() {
                  return this._angle;
              }, set: function set(angle) {
                  this._angle = angle;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcAbs.prototype, "largeArcFlag", { get: function get() {
                  return this._largeArcFlag;
              }, set: function set(largeArcFlag) {
                  this._largeArcFlag = largeArcFlag;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcAbs.prototype, "sweepFlag", { get: function get() {
                  return this._sweepFlag;
              }, set: function set(sweepFlag) {
                  this._sweepFlag = sweepFlag;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegArcRel = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
              this._x = x;
              this._y = y;
              this._r1 = r1;
              this._r2 = r2;
              this._angle = angle;
              this._largeArcFlag = largeArcFlag;
              this._sweepFlag = sweepFlag;
          };
          SVGPathSegArcRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegArcRel.prototype.toString = function () {
              return "[object SVGPathSegArcRel]";
          };
          SVGPathSegArcRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y;
          };
          SVGPathSegArcRel.prototype.clone = function () {
              return new SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
          };
          Object.defineProperty(SVGPathSegArcRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcRel.prototype, "r1", { get: function get() {
                  return this._r1;
              }, set: function set(r1) {
                  this._r1 = r1;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcRel.prototype, "r2", { get: function get() {
                  return this._r2;
              }, set: function set(r2) {
                  this._r2 = r2;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcRel.prototype, "angle", { get: function get() {
                  return this._angle;
              }, set: function set(angle) {
                  this._angle = angle;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcRel.prototype, "largeArcFlag", { get: function get() {
                  return this._largeArcFlag;
              }, set: function set(largeArcFlag) {
                  this._largeArcFlag = largeArcFlag;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegArcRel.prototype, "sweepFlag", { get: function get() {
                  return this._sweepFlag;
              }, set: function set(sweepFlag) {
                  this._sweepFlag = sweepFlag;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegLinetoHorizontalAbs = function (owningPathSegList, x) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
              this._x = x;
          };
          SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegLinetoHorizontalAbs.prototype.toString = function () {
              return "[object SVGPathSegLinetoHorizontalAbs]";
          };
          SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x;
          };
          SVGPathSegLinetoHorizontalAbs.prototype.clone = function () {
              return new SVGPathSegLinetoHorizontalAbs(undefined, this._x);
          };
          Object.defineProperty(SVGPathSegLinetoHorizontalAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegLinetoHorizontalRel = function (owningPathSegList, x) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
              this._x = x;
          };
          SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegLinetoHorizontalRel.prototype.toString = function () {
              return "[object SVGPathSegLinetoHorizontalRel]";
          };
          SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x;
          };
          SVGPathSegLinetoHorizontalRel.prototype.clone = function () {
              return new SVGPathSegLinetoHorizontalRel(undefined, this._x);
          };
          Object.defineProperty(SVGPathSegLinetoHorizontalRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegLinetoVerticalAbs = function (owningPathSegList, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
              this._y = y;
          };
          SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegLinetoVerticalAbs.prototype.toString = function () {
              return "[object SVGPathSegLinetoVerticalAbs]";
          };
          SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._y;
          };
          SVGPathSegLinetoVerticalAbs.prototype.clone = function () {
              return new SVGPathSegLinetoVerticalAbs(undefined, this._y);
          };
          Object.defineProperty(SVGPathSegLinetoVerticalAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegLinetoVerticalRel = function (owningPathSegList, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
              this._y = y;
          };
          SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegLinetoVerticalRel.prototype.toString = function () {
              return "[object SVGPathSegLinetoVerticalRel]";
          };
          SVGPathSegLinetoVerticalRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._y;
          };
          SVGPathSegLinetoVerticalRel.prototype.clone = function () {
              return new SVGPathSegLinetoVerticalRel(undefined, this._y);
          };
          Object.defineProperty(SVGPathSegLinetoVerticalRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoCubicSmoothAbs = function (owningPathSegList, x, y, x2, y2) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
              this._x = x;
              this._y = y;
              this._x2 = x2;
              this._y2 = y2;
          };
          SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () {
              return "[object SVGPathSegCurvetoCubicSmoothAbs]";
          };
          SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () {
              return new SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2);
          };
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", { get: function get() {
                  return this._x2;
              }, set: function set(x2) {
                  this._x2 = x2;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", { get: function get() {
                  return this._y2;
              }, set: function set(y2) {
                  this._y2 = y2;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoCubicSmoothRel = function (owningPathSegList, x, y, x2, y2) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
              this._x = x;
              this._y = y;
              this._x2 = x2;
              this._y2 = y2;
          };
          SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () {
              return "[object SVGPathSegCurvetoCubicSmoothRel]";
          };
          SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () {
              return new SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2);
          };
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", { get: function get() {
                  return this._x2;
              }, set: function set(x2) {
                  this._x2 = x2;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", { get: function get() {
                  return this._y2;
              }, set: function set(y2) {
                  this._y2 = y2;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoQuadraticSmoothAbs = function (owningPathSegList, x, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
              this._x = x;
              this._y = y;
          };
          SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () {
              return "[object SVGPathSegCurvetoQuadraticSmoothAbs]";
          };
          SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () {
              return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y);
          };
          Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          window.SVGPathSegCurvetoQuadraticSmoothRel = function (owningPathSegList, x, y) {
              SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
              this._x = x;
              this._y = y;
          };
          SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
          SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () {
              return "[object SVGPathSegCurvetoQuadraticSmoothRel]";
          };
          SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () {
              return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
          };
          SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () {
              return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y);
          };
          Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", { get: function get() {
                  return this._x;
              }, set: function set(x) {
                  this._x = x;this._segmentChanged();
              }, enumerable: true });
          Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", { get: function get() {
                  return this._y;
              }, set: function set(y) {
                  this._y = y;this._segmentChanged();
              }, enumerable: true });
  
          // Add createSVGPathSeg* functions to SVGPathElement.
          // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathElement.
          SVGPathElement.prototype.createSVGPathSegClosePath = function () {
              return new SVGPathSegClosePath(undefined);
          };
          SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (x, y) {
              return new SVGPathSegMovetoAbs(undefined, x, y);
          };
          SVGPathElement.prototype.createSVGPathSegMovetoRel = function (x, y) {
              return new SVGPathSegMovetoRel(undefined, x, y);
          };
          SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (x, y) {
              return new SVGPathSegLinetoAbs(undefined, x, y);
          };
          SVGPathElement.prototype.createSVGPathSegLinetoRel = function (x, y) {
              return new SVGPathSegLinetoRel(undefined, x, y);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (x, y, x1, y1, x2, y2) {
              return new SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (x, y, x1, y1, x2, y2) {
              return new SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (x, y, x1, y1) {
              return new SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (x, y, x1, y1) {
              return new SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1);
          };
          SVGPathElement.prototype.createSVGPathSegArcAbs = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
              return new SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
          };
          SVGPathElement.prototype.createSVGPathSegArcRel = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
              return new SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
          };
          SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (x) {
              return new SVGPathSegLinetoHorizontalAbs(undefined, x);
          };
          SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (x) {
              return new SVGPathSegLinetoHorizontalRel(undefined, x);
          };
          SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (y) {
              return new SVGPathSegLinetoVerticalAbs(undefined, y);
          };
          SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (y) {
              return new SVGPathSegLinetoVerticalRel(undefined, y);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (x, y, x2, y2) {
              return new SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (x, y, x2, y2) {
              return new SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (x, y) {
              return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y);
          };
          SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (x, y) {
              return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y);
          };
      }
  
      if (!("SVGPathSegList" in window)) {
          // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
          window.SVGPathSegList = function (pathElement) {
              this._pathElement = pathElement;
              this._list = this._parsePath(this._pathElement.getAttribute("d"));
  
              // Use a MutationObserver to catch changes to the path's "d" attribute.
              this._mutationObserverConfig = { "attributes": true, "attributeFilter": ["d"] };
              this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
              this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
          };
  
          Object.defineProperty(SVGPathSegList.prototype, "numberOfItems", {
              get: function get() {
                  this._checkPathSynchronizedToList();
                  return this._list.length;
              },
              enumerable: true
          });
  
          // Add the pathSegList accessors to SVGPathElement.
          // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGAnimatedPathData
          Object.defineProperty(SVGPathElement.prototype, "pathSegList", {
              get: function get() {
                  if (!this._pathSegList) this._pathSegList = new SVGPathSegList(this);
                  return this._pathSegList;
              },
              enumerable: true
          });
          // FIXME: The following are not implemented and simply return SVGPathElement.pathSegList.
          Object.defineProperty(SVGPathElement.prototype, "normalizedPathSegList", { get: function get() {
                  return this.pathSegList;
              }, enumerable: true });
          Object.defineProperty(SVGPathElement.prototype, "animatedPathSegList", { get: function get() {
                  return this.pathSegList;
              }, enumerable: true });
          Object.defineProperty(SVGPathElement.prototype, "animatedNormalizedPathSegList", { get: function get() {
                  return this.pathSegList;
              }, enumerable: true });
  
          // Process any pending mutations to the path element and update the list as needed.
          // This should be the first call of all public functions and is needed because
          // MutationObservers are not synchronous so we can have pending asynchronous mutations.
          SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
              this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
          };
  
          SVGPathSegList.prototype._updateListFromPathMutations = function (mutationRecords) {
              if (!this._pathElement) return;
              var hasPathMutations = false;
              mutationRecords.forEach(function (record) {
                  if (record.attributeName == "d") hasPathMutations = true;
              });
              if (hasPathMutations) this._list = this._parsePath(this._pathElement.getAttribute("d"));
          };
  
          // Serialize the list and update the path's 'd' attribute.
          SVGPathSegList.prototype._writeListToPath = function () {
              this._pathElementMutationObserver.disconnect();
              this._pathElement.setAttribute("d", SVGPathSegList._pathSegArrayAsString(this._list));
              this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
          };
  
          // When a path segment changes the list needs to be synchronized back to the path element.
          SVGPathSegList.prototype.segmentChanged = function (pathSeg) {
              this._writeListToPath();
          };
  
          SVGPathSegList.prototype.clear = function () {
              this._checkPathSynchronizedToList();
  
              this._list.forEach(function (pathSeg) {
                  pathSeg._owningPathSegList = null;
              });
              this._list = [];
              this._writeListToPath();
          };
  
          SVGPathSegList.prototype.initialize = function (newItem) {
              this._checkPathSynchronizedToList();
  
              this._list = [newItem];
              newItem._owningPathSegList = this;
              this._writeListToPath();
              return newItem;
          };
  
          SVGPathSegList.prototype._checkValidIndex = function (index) {
              if (isNaN(index) || index < 0 || index >= this.numberOfItems) throw "INDEX_SIZE_ERR";
          };
  
          SVGPathSegList.prototype.getItem = function (index) {
              this._checkPathSynchronizedToList();
  
              this._checkValidIndex(index);
              return this._list[index];
          };
  
          SVGPathSegList.prototype.insertItemBefore = function (newItem, index) {
              this._checkPathSynchronizedToList();
  
              // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
              if (index > this.numberOfItems) index = this.numberOfItems;
              if (newItem._owningPathSegList) {
                  // SVG2 spec says to make a copy.
                  newItem = newItem.clone();
              }
              this._list.splice(index, 0, newItem);
              newItem._owningPathSegList = this;
              this._writeListToPath();
              return newItem;
          };
  
          SVGPathSegList.prototype.replaceItem = function (newItem, index) {
              this._checkPathSynchronizedToList();
  
              if (newItem._owningPathSegList) {
                  // SVG2 spec says to make a copy.
                  newItem = newItem.clone();
              }
              this._checkValidIndex(index);
              this._list[index] = newItem;
              newItem._owningPathSegList = this;
              this._writeListToPath();
              return newItem;
          };
  
          SVGPathSegList.prototype.removeItem = function (index) {
              this._checkPathSynchronizedToList();
  
              this._checkValidIndex(index);
              var item = this._list[index];
              this._list.splice(index, 1);
              this._writeListToPath();
              return item;
          };
  
          SVGPathSegList.prototype.appendItem = function (newItem) {
              this._checkPathSynchronizedToList();
  
              if (newItem._owningPathSegList) {
                  // SVG2 spec says to make a copy.
                  newItem = newItem.clone();
              }
              this._list.push(newItem);
              newItem._owningPathSegList = this;
              // TODO: Optimize this to just append to the existing attribute.
              this._writeListToPath();
              return newItem;
          };
  
          SVGPathSegList._pathSegArrayAsString = function (pathSegArray) {
              var string = "";
              var first = true;
              pathSegArray.forEach(function (pathSeg) {
                  if (first) {
                      first = false;
                      string += pathSeg._asPathString();
                  } else {
                      string += " " + pathSeg._asPathString();
                  }
              });
              return string;
          };
  
          // This closely follows SVGPathParser::parsePath from Source/core/svg/SVGPathParser.cpp.
          SVGPathSegList.prototype._parsePath = function (string) {
              if (!string || string.length == 0) return [];
  
              var owningPathSegList = this;
  
              var Builder = function Builder() {
                  this.pathSegList = [];
              };
  
              Builder.prototype.appendSegment = function (pathSeg) {
                  this.pathSegList.push(pathSeg);
              };
  
              var Source = function Source(string) {
                  this._string = string;
                  this._currentIndex = 0;
                  this._endIndex = this._string.length;
                  this._previousCommand = SVGPathSeg.PATHSEG_UNKNOWN;
  
                  this._skipOptionalSpaces();
              };
  
              Source.prototype._isCurrentSpace = function () {
                  var character = this._string[this._currentIndex];
                  return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
              };
  
              Source.prototype._skipOptionalSpaces = function () {
                  while (this._currentIndex < this._endIndex && this._isCurrentSpace()) this._currentIndex++;
                  return this._currentIndex < this._endIndex;
              };
  
              Source.prototype._skipOptionalSpacesOrDelimiter = function () {
                  if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",") return false;
                  if (this._skipOptionalSpaces()) {
                      if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                          this._currentIndex++;
                          this._skipOptionalSpaces();
                      }
                  }
                  return this._currentIndex < this._endIndex;
              };
  
              Source.prototype.hasMoreData = function () {
                  return this._currentIndex < this._endIndex;
              };
  
              Source.prototype.peekSegmentType = function () {
                  var lookahead = this._string[this._currentIndex];
                  return this._pathSegTypeFromChar(lookahead);
              };
  
              Source.prototype._pathSegTypeFromChar = function (lookahead) {
                  switch (lookahead) {
                      case "Z":
                      case "z":
                          return SVGPathSeg.PATHSEG_CLOSEPATH;
                      case "M":
                          return SVGPathSeg.PATHSEG_MOVETO_ABS;
                      case "m":
                          return SVGPathSeg.PATHSEG_MOVETO_REL;
                      case "L":
                          return SVGPathSeg.PATHSEG_LINETO_ABS;
                      case "l":
                          return SVGPathSeg.PATHSEG_LINETO_REL;
                      case "C":
                          return SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                      case "c":
                          return SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                      case "Q":
                          return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                      case "q":
                          return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                      case "A":
                          return SVGPathSeg.PATHSEG_ARC_ABS;
                      case "a":
                          return SVGPathSeg.PATHSEG_ARC_REL;
                      case "H":
                          return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                      case "h":
                          return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                      case "V":
                          return SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                      case "v":
                          return SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                      case "S":
                          return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                      case "s":
                          return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                      case "T":
                          return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                      case "t":
                          return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                      default:
                          return SVGPathSeg.PATHSEG_UNKNOWN;
                  }
              };
  
              Source.prototype._nextCommandHelper = function (lookahead, previousCommand) {
                  // Check for remaining coordinates in the current command.
                  if ((lookahead == "+" || lookahead == "-" || lookahead == "." || lookahead >= "0" && lookahead <= "9") && previousCommand != SVGPathSeg.PATHSEG_CLOSEPATH) {
                      if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_ABS) return SVGPathSeg.PATHSEG_LINETO_ABS;
                      if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_REL) return SVGPathSeg.PATHSEG_LINETO_REL;
                      return previousCommand;
                  }
                  return SVGPathSeg.PATHSEG_UNKNOWN;
              };
  
              Source.prototype.initialCommandIsMoveTo = function () {
                  // If the path is empty it is still valid, so return true.
                  if (!this.hasMoreData()) return true;
                  var command = this.peekSegmentType();
                  // Path must start with moveTo.
                  return command == SVGPathSeg.PATHSEG_MOVETO_ABS || command == SVGPathSeg.PATHSEG_MOVETO_REL;
              };
  
              // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from Source/core/svg/SVGParserUtilities.cpp.
              // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
              Source.prototype._parseNumber = function () {
                  var exponent = 0;
                  var integer = 0;
                  var frac = 1;
                  var decimal = 0;
                  var sign = 1;
                  var expsign = 1;
  
                  var startIndex = this._currentIndex;
  
                  this._skipOptionalSpaces();
  
                  // Read the sign.
                  if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+") this._currentIndex++;else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
                      this._currentIndex++;
                      sign = -1;
                  }
  
                  if (this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != ".")
                      // The first character of a number must be one of [0-9+-.].
                      return undefined;
  
                  // Read the integer part, build right-to-left.
                  var startIntPartIndex = this._currentIndex;
                  while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") this._currentIndex++; // Advance to first non-digit.
  
                  if (this._currentIndex != startIntPartIndex) {
                      var scanIntPartIndex = this._currentIndex - 1;
                      var multiplier = 1;
                      while (scanIntPartIndex >= startIntPartIndex) {
                          integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                          multiplier *= 10;
                      }
                  }
  
                  // Read the decimals.
                  if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
                      this._currentIndex++;
  
                      // There must be a least one digit following the .
                      if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
                      while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") decimal += (this._string.charAt(this._currentIndex++) - "0") * (frac *= 0.1);
                  }
  
                  // Read the exponent part.
                  if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m") {
                      this._currentIndex++;
  
                      // Read the sign of the exponent.
                      if (this._string.charAt(this._currentIndex) == "+") {
                          this._currentIndex++;
                      } else if (this._string.charAt(this._currentIndex) == "-") {
                          this._currentIndex++;
                          expsign = -1;
                      }
  
                      // There must be an exponent.
                      if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return undefined;
  
                      while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                          exponent *= 10;
                          exponent += this._string.charAt(this._currentIndex) - "0";
                          this._currentIndex++;
                      }
                  }
  
                  var number = integer + decimal;
                  number *= sign;
  
                  if (exponent) number *= Math.pow(10, expsign * exponent);
  
                  if (startIndex == this._currentIndex) return undefined;
  
                  this._skipOptionalSpacesOrDelimiter();
  
                  return number;
              };
  
              Source.prototype._parseArcFlag = function () {
                  if (this._currentIndex >= this._endIndex) return undefined;
                  var flag = false;
                  var flagChar = this._string.charAt(this._currentIndex++);
                  if (flagChar == "0") flag = false;else if (flagChar == "1") flag = true;else return undefined;
  
                  this._skipOptionalSpacesOrDelimiter();
                  return flag;
              };
  
              Source.prototype.parseSegment = function () {
                  var lookahead = this._string[this._currentIndex];
                  var command = this._pathSegTypeFromChar(lookahead);
                  if (command == SVGPathSeg.PATHSEG_UNKNOWN) {
                      // Possibly an implicit command. Not allowed if this is the first command.
                      if (this._previousCommand == SVGPathSeg.PATHSEG_UNKNOWN) return null;
                      command = this._nextCommandHelper(lookahead, this._previousCommand);
                      if (command == SVGPathSeg.PATHSEG_UNKNOWN) return null;
                  } else {
                      this._currentIndex++;
                  }
  
                  this._previousCommand = command;
  
                  switch (command) {
                      case SVGPathSeg.PATHSEG_MOVETO_REL:
                          return new SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                      case SVGPathSeg.PATHSEG_MOVETO_ABS:
                          return new SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                      case SVGPathSeg.PATHSEG_LINETO_REL:
                          return new SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                      case SVGPathSeg.PATHSEG_LINETO_ABS:
                          return new SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                      case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                          return new SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
                      case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                          return new SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
                      case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                          return new SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
                      case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                          return new SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
                      case SVGPathSeg.PATHSEG_CLOSEPATH:
                          this._skipOptionalSpaces();
                          return new SVGPathSegClosePath(owningPathSegList);
                      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                          var points = { x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                          var points = { x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                          var points = { x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
                      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                          var points = { x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
                      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                          var points = { x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
                      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                          var points = { x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
                      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                          return new SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                          return new SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                      case SVGPathSeg.PATHSEG_ARC_REL:
                          var points = { x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                      case SVGPathSeg.PATHSEG_ARC_ABS:
                          var points = { x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber() };
                          return new SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                      default:
                          throw "Unknown path seg type.";
                  }
              };
  
              var builder = new Builder();
              var source = new Source(string);
  
              if (!source.initialCommandIsMoveTo()) return [];
              while (source.hasMoreData()) {
                  var pathSeg = source.parseSegment();
                  if (!pathSeg) return [];
                  builder.appendSegment(pathSeg);
              }
  
              return builder.pathSegList;
          };
      }
  })();

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(14);
  
  var Html = (function (_Component) {
    _inherits(Html, _Component);
  
    function Html() {
      _classCallCheck(this, Html);
  
      _get(Object.getPrototypeOf(Html.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Html, [{
      key: 'trackingCode',
      value: function trackingCode() {
        return { __html: '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' + 'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' + 'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' + 'e.src=\'https://www.google-analytics.com/analytics.js\';' + 'r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));' + ('ga(\'create\',\'' + _config.googleAnalyticsId + '\',\'auto\');ga(\'send\',\'pageview\');')
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'html',
          { className: 'no-js', lang: '' },
          _react2['default'].createElement(
            'head',
            null,
            _react2['default'].createElement('meta', { charSet: 'utf-8' }),
            _react2['default'].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
            _react2['default'].createElement(
              'title',
              null,
              this.props.title
            ),
            _react2['default'].createElement('meta', { name: 'description', content: this.props.description }),
            _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            _react2['default'].createElement('link', { href: 'https://fonts.googleapis.com/css?family=Lato\' rel=\'stylesheet\' type=\'text/css' }),
            _react2['default'].createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'screen.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/dc/1.7.5/dc.min.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.Default.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: '//cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', crossOrigin: 'anonymous' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css' }),
            _react2['default'].createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: this.props.css } })
          ),
          _react2['default'].createElement(
            'body',
            null,
            _react2['default'].createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body } }),
            _react2['default'].createElement('script', { src: this.props.entry })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        title: _react.PropTypes.string,
        description: _react.PropTypes.string,
        css: _react.PropTypes.string,
        body: _react.PropTypes.string.isRequired,
        entry: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        title: '',
        description: ''
      },
      enumerable: true
    }]);
  
    return Html;
  })(_react.Component);
  
  exports['default'] = Html;
  module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 89 */
/***/ function(module, exports) {

  module.exports = require("compression");

/***/ },
/* 90 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Gets data from Twitter model
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _redis = __webpack_require__(92);
  
  var _redis2 = _interopRequireDefault(_redis);
  
  var _modelsTwitter = __webpack_require__(93);
  
  var _modelsTwitter2 = _interopRequireDefault(_modelsTwitter);
  
  var _crossfilter2 = __webpack_require__(82);
  
  var _crossfilter22 = _interopRequireDefault(_crossfilter2);
  
  var _moment = __webpack_require__(74);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _config = __webpack_require__(14);
  
  var client = _redis2['default'].createClient(_config.REDIS_PORT, _config.REDIS_ADDR);
  
  function findData() {
    return regeneratorRuntime.async(function findData$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          return context$1$0.abrupt('return', _modelsTwitter2['default'].find({
            'is_retweet': false
          }).select('timeStamp').exec());
  
        case 4:
          context$1$0.prev = 4;
          context$1$0.t0 = context$1$0['catch'](0);
  
          console.log(context$1$0.t0);
  
        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 4]]);
  }
  
  function aggregateData() {
    var data, cfData, dim, group;
    return regeneratorRuntime.async(function aggregateData$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(findData());
  
        case 2:
          data = context$1$0.sent;
  
          if (data.length) {
            context$1$0.next = 5;
            break;
          }
  
          return context$1$0.abrupt('return', false);
  
        case 5:
          data.forEach(function (d) {
            var momentDate = (0, _moment2['default'])(new Date(d.timeStamp));
            d.date = momentDate.format('YYYY-MM-DD');
          });
          cfData = (0, _crossfilter22['default'])(data);
          dim = cfData.dimension(function (d) {
            return d.date;
          });
          group = dim.group().reduceCount();
          return context$1$0.abrupt('return', group.all());
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
  
  exports['default'] = function job() {
    var data, aggregate;
    return regeneratorRuntime.async(function job$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(aggregateData());
  
        case 2:
          data = context$1$0.sent;
          aggregate = data.map(function (d) {
            return {
              tweets: d.value,
              date: d.key
            };
          });
  
          // console.log(aggregate);
          client.set('tw', JSON.stringify(aggregate), function (err, res) {
            if (err) throw new Error(err);
            /* eslint-disable no-console*/
            console.log('completed job ' + new Date() + ' ' + res);
          });
  
        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  };
  
  module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports) {

  module.exports = require("redis");

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _mongoose = __webpack_require__(94);
  
  var _mongoose2 = _interopRequireDefault(_mongoose);
  
  var _mongooseUniqueValidator = __webpack_require__(95);
  
  var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);
  
  var Schema = _mongoose2['default'].Schema;
  
  var TwitterSchema = new Schema({
    date: { type: String },
    text: { type: String, 'default': null, trim: true },
    user_name: { type: String, trim: true },
    screen_name: { type: String, trim: true },
    location: { type: String, 'default': null, trim: true },
    time_zone: String,
    sentiment: Number,
    retweet_count: Number,
    favorite_count: Number,
    timeStamp: Number,
    terms: [String],
    user_id: String,
    id: { type: Number, unique: true },
    is_reply: Boolean,
    is_retweet: Boolean,
    emotions: { type: [String], 'default': null },
    tracked_names: { type: [String], 'default': null },
    approximated_geo: { type: Boolean, 'default': false },
    geo_enabled: { type: Boolean, 'default': false },
    has_hashtags: Boolean,
    hashtags: [String],
    coordinates: { type: String, 'default': null },
    has_user_mentions: Boolean,
    user_mentions: [String]
  });
  
  TwitterSchema.plugin(_mongooseUniqueValidator2['default']);
  // TwitterSchema.path('terms').required(true, 'Tweet must have terms');
  /* eslint-disable func-names*/
  TwitterSchema.pre('save', function (next) {
    var err = this.validateSync();
    next(err);
  });
  
  exports['default'] = _mongoose2['default'].model('Twit', TwitterSchema);
  module.exports = exports['default'];

/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = require("mongoose");

/***/ },
/* 95 */
/***/ function(module, exports) {

  module.exports = require("mongoose-unique-validator");

/***/ },
/* 96 */
/***/ function(module, exports) {

  module.exports = require("cron");

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("morgan");

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _controllersTwitters = __webpack_require__(99);
  
  var twitters = _interopRequireWildcard(_controllersTwitters);
  
  var _controllersInquiries = __webpack_require__(101);
  
  var inquiries = _interopRequireWildcard(_controllersInquiries);
  
  var router = new _express2['default'].Router();
  
  router.get('/social/twdata/all', function callee$0$0(req, res, next) {
    var raw, data, aggregate;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(twitters.findData(req.query.start, req.query.end));
  
        case 3:
          raw = context$1$0.sent;
          data = twitters.transform(raw);
          context$1$0.next = 7;
          return regeneratorRuntime.awrap(twitters.getFromRedis());
  
        case 7:
          aggregate = context$1$0.sent;
  
          res.status(200).json({ data: data, aggregate: JSON.parse(aggregate) });
          context$1$0.next = 14;
          break;
  
        case 11:
          context$1$0.prev = 11;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 14:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 11]]);
  });
  
  router.get('/social/twdata', function callee$0$0(req, res, next) {
    var raw, data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(twitters.findData(req.query.start, req.query.end));
  
        case 3:
          raw = context$1$0.sent;
          data = twitters.transform(raw);
  
          console.log('data count is ' + data.length);
          res.status(200).json(data);
          context$1$0.next = 12;
          break;
  
        case 9:
          context$1$0.prev = 9;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 12:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 9]]);
  });
  
  router.post('/inquiries', function callee$0$0(req, res, next) {
    var payload;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          try {
            payload = Object.assign({}, req.body, { date: new Date() });
  
            inquiries.saveInquiry(payload, function (error) {
              var code = error ? 500 : 200;
              res.status(code).json({ status: error || 'success' });
            });
          } catch (err) {
            if (err) next(err);
          }
  
        case 1:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  router.get('/inquiries', function callee$0$0(req, res, next) {
    var data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(inquiries.findInquiries());
  
        case 3:
          data = context$1$0.sent;
  
          res.status(200).json(data);
          context$1$0.next = 10;
          break;
  
        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);
  
          if (context$1$0.t0) next(context$1$0.t0);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 7]]);
  });
  
  router.post('/social/twdata', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          try {
            // console.log(twitters);
            twitters.saveTweets(req.body, function (result) {
              res.status(200).json(result);
            });
          } catch (err) {
            if (err) next(err);
          }
  
        case 1:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getFromRedis = getFromRedis;
  exports.saveTweets = saveTweets;
  exports.transform = transform;
  exports.findData = findData;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _redis = __webpack_require__(92);
  
  var _redis2 = _interopRequireDefault(_redis);
  
  var _modelsTwitter = __webpack_require__(93);
  
  var _modelsTwitter2 = _interopRequireDefault(_modelsTwitter);
  
  var _async2 = __webpack_require__(100);
  
  var _async3 = _interopRequireDefault(_async2);
  
  var _config = __webpack_require__(14);
  
  var client = _redis2['default'].createClient(_config.REDIS_PORT, _config.REDIS_ADDR);
  // const mentions = ['museveni', 'besigye', 'mbabazi', 'baryamureeba', 'bwanika', 'mabirizi', 'biraro'];
  var mentions = ['museveni', 'besigye', 'mbabazi'];
  var exludedFields = '-_id -__v -has_user_mentions -geo_enabled -time_zone -approximated_geo ';
  exludedFields += '-favorite_count -user_id -retweet_count -has_hashtags -is_retweet -is_reply';
  var saved = 0;
  var notSaved = 0;
  
  function getFromRedis() {
    return new Promise(function (resolve, reject) {
      client.get('tw', function (err, reply) {
        resolve(reply);
        reject(err);
      });
    });
  }
  
  function _addNamesToTweet(tweet) {
    // mutates the tweet by adding new fields
    mentions.forEach(function (mention) {
      var bool = tweet.tracked_names.some(function (name) {
        return name.toLowerCase().includes(mention);
      });
      tweet[mention] = bool ? 1 : 0;
    });
    return tweet;
  }
  
  /* function _excludeNamesInTerms(tweet) {
    mentions.forEach((mention) => {
      tweet.terms.forEach((term, index, arr) => {
        const isName = term.toLowerCase().includes(mention);
        if (isName) arr.splice(index, 1);
      });
    });
    return tweet;
  }*/
  
  function saveTweets(data, cb) {
    _async3['default'].each(data, function (d, callback) {
      var twitter = new _modelsTwitter2['default'](d);
      twitter.save(function (err) {
        if (err) {
          /* eslint-disable no-console*/
          console.log('error ' + err.message + ' not saved ' + d.id);
          notSaved++;
        } else {
          saved++;
        }
        callback();
      });
    }, function (error) {
      if (error) throw new Error(error);
      cb({ saved: saved, notSaved: notSaved });
    });
  }
  
  function transform(raw) {
    return raw.map(function (tweet) {
      // const tweet = d.toObject();
      tweet.text = tweet.text.toLowerCase();
      // _excludeInUserMentions(tweet);
      // tweet.sentiment = _.ceil(tweet.sentiment, 2) || tweet.sentiment;
      _addNamesToTweet(tweet);
      // _excludeNamesInTerms(tweet);
      return tweet;
    });
  }
  
  function findData(start, end) {
    return regeneratorRuntime.async(function findData$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          return context$1$0.abrupt('return', _modelsTwitter2['default'].find({
            'is_retweet': false,
            timeStamp: {
              $gt: parseInt(start, 10),
              $lt: parseInt(end, 10)
            }
          }).lean().select(exludedFields).exec());
  
        case 4:
          context$1$0.prev = 4;
          context$1$0.t0 = context$1$0['catch'](0);
          throw new Error(context$1$0.t0);
  
        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 4]]);
  }

/***/ },
/* 100 */
/***/ function(module, exports) {

  module.exports = require("async");

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.saveInquiry = saveInquiry;
  exports.findInquiries = findInquiries;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _modelsInquiry = __webpack_require__(102);
  
  var _modelsInquiry2 = _interopRequireDefault(_modelsInquiry);
  
  function saveInquiry(data, cb) {
    var inquiry = new _modelsInquiry2['default'](data);
    inquiry.save(function (err) {
      console.log(err);
      cb(err);
    });
  }
  
  function findInquiries() {
    return regeneratorRuntime.async(function findInquiries$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          return context$1$0.abrupt('return', _modelsInquiry2['default'].find().exec());
  
        case 4:
          context$1$0.prev = 4;
          context$1$0.t0 = context$1$0['catch'](0);
          throw new Error(context$1$0.t0);
  
        case 7:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 4]]);
  }

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _mongoose = __webpack_require__(94);
  
  var _mongoose2 = _interopRequireDefault(_mongoose);
  
  var _mongooseUniqueValidator = __webpack_require__(95);
  
  var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);
  
  var Schema = _mongoose2['default'].Schema;
  
  var InquirySchema = new Schema({
    date: { type: Date },
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true }
  });
  
  InquirySchema.plugin(_mongooseUniqueValidator2['default']);
  InquirySchema.path('name').required(true, 'inquiry must have a name');
  InquirySchema.path('email').required(true, 'inquiry must have an email');
  /* eslint-disable func-names*/
  InquirySchema.pre('save', function (next) {
    var err = this.validateSync();
    next(err);
  });
  
  exports['default'] = _mongoose2['default'].model('Inquiry', InquirySchema);
  module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fs = __webpack_require__(104);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(2);
  
  var _express = __webpack_require__(3);
  
  var _bluebird = __webpack_require__(105);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(106);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(107);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseJade = function parseJade(path, jadeContent) {
    var fmContent = (0, _frontMatter2['default'])(jadeContent);
    var htmlContent = _jade2['default'].render(fmContent.body);
    return Object.assign({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2['default'].promisify(_fs2['default'].readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2['default'](function (resolve) {
      _fs2['default'].exists(filename, resolve);
    });
  };
  
  // TODO make the query checking code into middleware
  
  var router = new _express.Router();
  
  // define the about route
  router.get('/api/test', function (req, res) {
    res.json({ text: 'hello Text' });
  });
  
  router.get('/', function callee$0$0(req, res, next) {
    var path, fileName, source, content;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          path = req.query.path;
  
          if (!(!path || path === 'undefined')) {
            context$1$0.next = 5;
            break;
          }
  
          res.status(400).send({ error: 'The \'path\' query parameter cannot be empty.' });
          return context$1$0.abrupt('return');
  
        case 5:
          fileName = (0, _path.join)(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
          context$1$0.next = 8;
          return regeneratorRuntime.awrap(fileExists(fileName));
  
        case 8:
          if (context$1$0.sent) {
            context$1$0.next = 10;
            break;
          }
  
          fileName = (0, _path.join)(CONTENT_DIR, path + '/index.jade');
  
        case 10:
          context$1$0.next = 12;
          return regeneratorRuntime.awrap(fileExists(fileName));
  
        case 12:
          if (context$1$0.sent) {
            context$1$0.next = 16;
            break;
          }
  
          res.status(404).send({ error: 'The page \'' + path + '\' is not found.' });
          context$1$0.next = 21;
          break;
  
        case 16:
          context$1$0.next = 18;
          return regeneratorRuntime.awrap(readFile(fileName, { encoding: 'utf8' }));
  
        case 18:
          source = context$1$0.sent;
          content = parseJade(path, source);
  
          res.status(200).send(content);
  
        case 21:
          context$1$0.next = 26;
          break;
  
        case 23:
          context$1$0.prev = 23;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 26:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 23]]);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 106 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 107 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map