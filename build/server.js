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

  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
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
  
  var _componentsHtml = __webpack_require__(79);
  
  var _componentsHtml2 = _interopRequireDefault(_componentsHtml);
  
  var _assets = __webpack_require__(80);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(14);
  
  var _compression = __webpack_require__(81);
  
  var _compression2 = _interopRequireDefault(_compression);
  
  // const server = global.server = http.createServer(express());
  
  var server = global.server = (0, _express2['default'])();
  
  server.use((0, _compression2['default'])());
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  // Register Data analysis API middleware
  // -----------------------------------------------------------------------------
  server.use('/api', __webpack_require__(82));
  
  // Register API middleware
  
  // -----------------------------------------------------------------------------
  server.use('/api/content', __webpack_require__(85));
  
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
    console.log('The server is running at http://localhost:' + _config.port + '/');
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
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRoutingSrcRouter = __webpack_require__(7);
  
  var _reactRoutingSrcRouter2 = _interopRequireDefault(_reactRoutingSrcRouter);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _componentsApp = __webpack_require__(15);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsContentPage = __webpack_require__(42);
  
  var _componentsContentPage2 = _interopRequireDefault(_componentsContentPage);
  
  var _componentsContactPage = __webpack_require__(45);
  
  var _componentsContactPage2 = _interopRequireDefault(_componentsContactPage);
  
  var _componentsBlogPage = __webpack_require__(48);
  
  var _componentsBlogPage2 = _interopRequireDefault(_componentsBlogPage);
  
  var _componentsNotFoundPage = __webpack_require__(51);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  var _componentsErrorPage = __webpack_require__(54);
  
  var _componentsErrorPage2 = _interopRequireDefault(_componentsErrorPage);
  
  var _componentsDataPage = __webpack_require__(57);
  
  var _componentsDataPage2 = _interopRequireDefault(_componentsDataPage);
  
  var _actionsDataPageActions = __webpack_require__(66);
  
  var _actionsDataPageActions2 = _interopRequireDefault(_actionsDataPageActions);
  
  // import testData from './components/DataPage/data';
  
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
      var res, html, response, data;
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
            context$2$0.next = 8;
            return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/social/twdata'));
  
          case 8:
            response = context$2$0.sent;
            context$2$0.next = 11;
            return regeneratorRuntime.awrap(response.json());
  
          case 11:
            data = context$2$0.sent;
  
            _actionsDataPageActions2['default'].getData(data);
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsDataPage2['default'], html));
  
          case 14:
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
  if (false) process.env.PORT = 80;
  var port = process.env.PORT || 5000;
  exports.port = port;
  var host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  exports.host = host;
  var googleAnalyticsId = 'UA-XXXXX-X';
  exports.googleAnalyticsId = googleAnalyticsId;
  var MONGO_URL = 'mongodb://localhost/mine-twt';
  exports.MONGO_URL = MONGO_URL;

/***/ },
/* 15 */
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
  
  var _Feedback = __webpack_require__(36);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(39);
  
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./App.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./App.scss");
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
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio, canvas, progress, video {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden], template {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active, a:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb, strong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton, input, optgroup, select, textarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton, select {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled], html input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd, th {\n  padding: 0;\n}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml, body {\n  color: #222;\n  width: 100%;\n  height: 100%;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Lato','Segoe UI','HelveticaNeue-Light',sans-serif;\n  line-height: 1.375; /* ~22px */\n  background-color: #5B798E;\n}\n.App_wrapper_1PG {\n  color: white;\n  line-height: 1.2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio, canvas, iframe, img, svg, video {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.App_browserupgrade_1t4 {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *, *:before, *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a, a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after, a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre, blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr, img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p, h2, h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/./src/components/App/App.scss","/./node_modules/normalize.css/normalize.css","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH,4EAA4E;;AAE5E;;;;GAIG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;;GAKG;;AAEH;EAaE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EAIE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;;GAGG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;;GAGG;;AAEH;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,8BAA8B;CAC/B;;AAED;;;GAGG;;AAEH;EAEE,WAAW;CACZ;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;CAC3B;;AAED;;GAEG;;AAEH;EAEE,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB;EACxB,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAIE,kCAAkC;EAClC,eAAe;CAChB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;GAKG;;AAEH;EAKE,eAAe,CAAC,OAAO;EACvB,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;;;GAKG;;AAEH;EAEE,qBAAqB;CACtB;;AAED;;;;;;GAMG;;AAEH;EAIE,2BAA2B,CAAC,OAAO;EACnC,gBAAgB,CAAC,OAAO;CACzB;;AAED;;GAEG;;AAEH;EAEE,gBAAgB;CACjB;;AAED;;GAEG;;AAEH;EAEE,UAAU;EACV,WAAW;CACZ;;AAED;;;GAGG;;AAEH;EACE,oBAAoB;CACrB;;AAED;;;;;;GAMG;;AAEH;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;;;GAIG;;AAEH;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;CACjC;;AAED;;;;GAIG;;AAEH;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;GAGG;;AAEH;EACE,UAAU,CAAC,OAAO;EAClB,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,kBAAkB;CACnB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,kBAAkB;CACnB;;AAED;EAEE,WAAW;CACZ;;AD5ZD,yEAAyE;;AETzE,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;AFtChF;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,gEAA+B;EAC/B,mBAAmB,CAAC,WAAW;EAC/B,0BAAiC;CAClC;AACD;EACE,aAAa;EACb,iBAAiB;CAClB;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;IAEE,YAAY;GACb;;EAED;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;IAGE,WAAW;IACX,UAAU;GACX;;EAED;IAEE,wBAAwB;GACzB;CACF","file":"App.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../../node_modules/normalize.css/normalize.css';\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n@import '../variables.scss';\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml,body {\n  color: #222;\n  width: 100%;\n  height: 100%;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: $font-family-base;\n  line-height: 1.375; /* ~22px */\n  background-color: $primary-color;\n}\n.wrapper {\n  color: white;\n  line-height: 1.2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n","/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Header.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Header.scss");
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
  exports.push([module.id, "\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Header_root_14I {\n}\n\n.Header_container_izf {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/components/Header/Header.scss","/./src/components/variables.scss"],"names":[],"mappings":";AACA;;;;;;;GAOG;;;ACNH,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADxChF;CACC;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAA8B;CAC/B","file":"Header.scss","sourcesContent":["\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n\n@import '../variables.scss';\n\n.root {\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: $max-content-width;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_14I",
  	"container": "Header_container_izf"
  };

/***/ },
/* 25 */
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
          'nav',
          { className: (0, _classnames2['default'])('navbar', _NavigationScss2['default'].navbar, 'navbar-fixed-top'), ref: 'nav' },
          _react2['default'].createElement(
            'div',
            { className: 'container' },
            _react2['default'].createElement(
              'div',
              { className: 'navbar-header' },
              _react2['default'].createElement(
                'button',
                { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                _react2['default'].createElement(
                  'span',
                  { className: 'sr-only' },
                  'Toggle navigation'
                ),
                _react2['default'].createElement('span', { className: 'icon-bar' }),
                _react2['default'].createElement('span', { className: 'icon-bar' }),
                _react2['default'].createElement('span', { className: 'icon-bar' })
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])(_NavigationScss2['default'].root, this.props.className, _NavigationScss2['default'].collapse, 'navbar-collapse', 'collapse'), role: 'navigation' },
              _react2['default'].createElement(
                'ul',
                { className: 'nav navbar-nav navbar-center' },
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
                'ul',
                { className: 'nav navbar-nav navbar-right' },
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Navigation.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Navigation.scss");
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
  exports.push([module.id, "\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Navigation_root_2Gx {\n\n}\n\n.Navigation_link_12k {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n}\n\n.Navigation_link_12k, .Navigation_link_12k:active, .Navigation_link_12k:visited {\n  color: rgba(255, 255, 255, .6);\n}\n\n.Navigation_link_12k:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.Navigation_highlight_2cu {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, .15);\n  color: #fff;\n}\n\n.Navigation_highlight_2cu:hover {\n  background: rgba(0, 0, 0, .3);\n}\n\n.Navigation_spacer_2MV {\n  color: rgba(255, 255, 255, .3);\n}\n.Navigation_navbar_20N{\n  background-color: #5B798E;\n  border-color: #5B798E;\n}\n\n.Navigation_nav-scroll_1Bv{ background-color: rgba(245,245,245,0.5);}\n\n.Navigation_navbar_20N .Navigation_link_12k {\n  color: #ffffff;\n}\n\n.Navigation_collapse_22x {\n  margin-top: 0.5em;\n}\n\n.Navigation_navbar_20N .Navigation_link_12k:focus, .Navigation_navbar_20N .Navigation_link_12k:hover {\n    color:#243442;\n    background-color:transparent;\n}\n", "", {"version":3,"sources":["/./src/components/Navigation/Navigation.scss","/./src/components/variables.scss"],"names":[],"mappings":";AACA;;;;;;;GAOG;;ACNH,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADzChF;;CAEC;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;EAGE,+BAA+B;CAChC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,+BAA+B;EAC/B,YAAY;CACb;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,+BAA+B;CAChC;AACD;EACE,0BAAiC;EACjC,sBAA6B;CAC9B;;AAED,4BAAa,wCAAwC,CAAC;;AAEtD;EACE,eAAe;CAChB;;AAED;EACE,kBAAkB;CACnB;;AAED;IACI,cAAc;IACd,6BAA6B;CAChC","file":"Navigation.scss","sourcesContent":["\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.scss';\n\n.root {\n\n}\n\n.link {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, .6);\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, .15);\n  color: #fff;\n}\n\n.highlight:hover {\n  background: rgba(0, 0, 0, .3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, .3);\n}\n.navbar{\n  background-color: $primary-color;\n  border-color: $primary-color;\n}\n\n.nav-scroll{ background-color: rgba(245,245,245,0.5);}\n\n.navbar .link {\n  color: #ffffff;\n}\n\n.collapse {\n  margin-top: 0.5em;\n}\n\n.navbar .link:focus, .navbar .link:hover {\n    color:#243442;\n    background-color:transparent;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_2Gx",
  	"link": "Navigation_link_12k",
  	"highlight": "Navigation_highlight_2cu",
  	"spacer": "Navigation_spacer_2MV",
  	"navbar": "Navigation_navbar_20N",
  	"nav-scroll": "Navigation_nav-scroll_1Bv",
  	"collapse": "Navigation_collapse_22x"
  };

/***/ },
/* 29 */
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
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FeedbackScss = __webpack_require__(37);
  
  var _FeedbackScss2 = _interopRequireDefault(_FeedbackScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var Feedback = (function (_Component) {
      _inherits(Feedback, _Component);
  
      function Feedback() {
          _classCallCheck(this, _Feedback);
  
          _get(Object.getPrototypeOf(_Feedback.prototype), 'constructor', this).apply(this, arguments);
      }
  
      _createClass(Feedback, [{
          key: 'render',
          value: function render() {
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
                                      _react2['default'].createElement('input', { type: 'text', className: 'form-control', id: 'username', name: 'username', placeholder: 'name', required: true })
                                  ),
                                  _react2['default'].createElement(
                                      'div',
                                      { className: (0, _classnames2['default'])('form-group', _FeedbackScss2['default'].fgroup) },
                                      _react2['default'].createElement('input', { type: 'email', className: 'form-control', id: 'useremail', name: 'useremail', placeholder: 'email', required: true })
                                  ),
                                  _react2['default'].createElement(
                                      'button',
                                      { type: 'submit', className: (0, _classnames2['default'])('btn', 'btn-default', _FeedbackScss2['default'].btn), id: 'find_out_more' },
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
                                      { href: '#' },
                                      _react2['default'].createElement('i', { className: 'fa fa-facebook' })
                                  ),
                                  _react2['default'].createElement(
                                      'a',
                                      { href: '#' },
                                      _react2['default'].createElement('i', { className: 'fa fa-twitter' })
                                  )
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      var _Feedback = Feedback;
      Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackScss2['default'])(Feedback) || Feedback;
      return Feedback;
  })(_react.Component);
  
  exports['default'] = Feedback;
  module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(38);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Feedback.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Feedback.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Feedback_root_LW7 {\n}\n\n.Feedback_container_3dV {\n  margin: 0 auto;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Feedback_link_17l, .Feedback_link_17l:active, .Feedback_link_17l:hover, .Feedback_link_17l:visited {\n  color: #333;\n  text-decoration: none;\n}\n.Feedback_fgroup_2Xx{\n  margin-left: 1em;\n}\n.Feedback_btn_2h9{\n  margin-left: 1em;\n}\n.Feedback_link_17l:hover {\n  text-decoration: underline;\n}\n\n.Feedback_spacer_Iut {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n", "", {"version":3,"sources":["/./src/components/Feedback/Feedback.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACLH,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;AD1ChF;CACC;;AAED;EACE,eAAe;EACf,kBAA8B;EAC9B,mBAAmB;CACpB;;AAED;EAIE,YAAY;EACZ,sBAAsB;CACvB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.scss';\n\n.root {\n}\n\n.container {\n  margin: 0 auto;\n  max-width: $max-content-width;\n  text-align: center;\n}\n\n.link,\n.link:active,\n.link:hover,\n.link:visited {\n  color: #333;\n  text-decoration: none;\n}\n.fgroup{\n  margin-left: 1em;\n}\n.btn{\n  margin-left: 1em;\n}\n.link:hover {\n  text-decoration: underline;\n}\n\n.spacer {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
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
/* 39 */
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
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(40);
  
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(41);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Footer.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./Footer.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.Footer_root_3dP {\n  background: rgba(0,0,0,.5);\n  color: #fff;\n  height: 3em;\n  padding-top: -2em;\n  border-radius: 1em;\n}\n\n.Footer_container_26p {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Footer_container_26p .Footer_form-group_1r6{margin-left: 1em;}\n\n.Footer_text_tTp {\n  color: rgba(255, 255, 255, .5);\n}\n\n.Footer_textMuted_1h3 {\n  color: rgba(255, 255, 255, .3);\n}\n\n.Footer_spacer_3n7 {\n  color: rgba(255, 255, 255, .3);\n}\n\n.Footer_text_tTp, .Footer_link_NoJ {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.Footer_link_NoJ, .Footer_link_NoJ:active, .Footer_link_NoJ:visited {\n  color: rgba(255, 255, 255, .6);\n  text-decoration: none;\n}\n\n.Footer_link_NoJ:hover {\n  color: rgba(255, 255, 255, 1);\n}\n", "", {"version":3,"sources":["/./src/components/Footer/Footer.scss","/./src/components/variables.scss"],"names":[],"mappings":";AACA;;;;;;;GAOG;;ACNH,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADzChF;EACE,2BAA2B;EAC3B,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,kBAA8B;EAC9B,mBAAmB;CAIpB;;AAHC,6CACE,iBAAiB,CAClB;;AAGH;EACE,+BAA+B;CAChC;;AAED;EAEE,+BAA+B;CAChC;;AAED;EACE,+BAA+B;CAChC;;AAED;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;EAGE,+BAA+B;EAC/B,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B","file":"Footer.scss","sourcesContent":["\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.scss';\n\n.root {\n  background: rgba(0,0,0,.5);\n  color: #fff;\n  height: 3em;\n  padding-top: -2em;\n  border-radius: 1em;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: $max-content-width;\n  text-align: center;\n  .form-group{\n    margin-left: 1em;\n  }\n}\n\n.text {\n  color: rgba(255, 255, 255, .5);\n}\n\n.textMuted {\n  composes: text;\n  color: rgba(255, 255, 255, .3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, .3);\n}\n\n.text,\n.link {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, .6);\n  text-decoration: none;\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
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
/* 42 */
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
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContentPageScss = __webpack_require__(43);
  
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(44);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContentPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContentPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.ContentPage_root_1Kg {\n\n}\n\n.ContentPage_container_1JT {\n}\n\n.ContentPage_icon-cover_2i4{\n    border: solid;\n    border-radius: 6em;\n    height: 14em;\n  }\n.ContentPage_fa-5x_341 {\n    font-size: 13em;\n}\n\n.ContentPage_home-main_3Fs{margin-top:9em}\n\n.ContentPage_products_227{\n    margin-top:24em;\n}\n\n.ContentPage_products_227 p{line-height:2em}\n.ContentPage_footer-nav_2gg{\n  background-color:white;\n    border-radius: 1em;\n    height: 50px;;\n\n\n}\n.ContentPage_footer-nav_2gg li{display: inline;padding:4em}\n.ContentPage_footer-nav_2gg a{color:white;font-size:1.1em}\n.ContentPage_social_1ok {\n  margin-top: -1em;;\n}\n.ContentPage_social_1ok a{color:white;font-size:2.0em}\n\n.ContentPage_btn_1uZ {\n  background-color: #B76565;\n  color: white\n}\n.ContentPage_btn-default_AF6.ContentPage_active_ju8, .ContentPage_btn-default_AF6.ContentPage_focus_2X4, .ContentPage_btn-default_AF6:active, .ContentPage_btn-default_AF6:focus, .ContentPage_btn-default_AF6:hover, .ContentPage_open_2rC>.ContentPage_dropdown-toggle_Qa3.ContentPage_btn-default_AF6 {\n    color:#B76565;\n}\n", "", {"version":3,"sources":["/./src/components/ContentPage/ContentPage.scss","/./src/components/variables.scss"],"names":[],"mappings":";AACA;;;;;;;GAOG;;ACNH,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADzChF;;CAEC;;AAED;CACC;;AAED;IACI,cAAc;IACd,mBAAmB;IACnB,aAAa;GACd;AACH;IACI,gBAAgB;CACnB;;AAED,2BAAW,cAAc,CAAC;;AAE1B;IACI,gBAAgB;CAEnB;;AADG,4BAAE,eAAe,CAAC;AAEtB;EACE,uBAAuB;IACrB,mBAAmB;IACnB,aAAa;;;CAKhB;AAJC,+BAAG,gBAAgB,WAAW,CAAC;AAC/B,8BAAG,YAAY,eAAgB,CAAC;AAIlC;EACE,iBAAiB;CAElB;AADC,0BAAG,YAAY,eAAgB,CAAC;;AAGlC;EACE,0BAAmC;EACnC,YAAY;CACb;AACD;IACI,cAAuB;CAC1B","file":"ContentPage.scss","sourcesContent":["\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.scss';\n\n.root {\n\n}\n\n.container {\n}\n\n.icon-cover{\n    border: solid;\n    border-radius: 6em;\n    height: 14em;\n  }\n.fa-5x {\n    font-size: 13em;\n}\n\n.home-main{margin-top:9em}\n\n.products{\n    margin-top:24em;\n    p{line-height:2em}\n}\n.footer-nav{\n  background-color:white;\n    border-radius: 1em;\n    height: 50px;\n  li{display: inline;padding:4em};\n  a{ color:white; font-size:1.1em};\n\n\n}\n.social {\n  margin-top: -1em;\n  a{ color:white; font-size:2.0em};\n}\n\n.btn {\n  background-color: $secondary-color;\n  color: white\n}\n.btn-default.active, .btn-default.focus, .btn-default:active, .btn-default:focus, .btn-default:hover, .open>.dropdown-toggle.btn-default {\n    color:$secondary-color;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
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
/* 45 */
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
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContactPageScss = __webpack_require__(46);
  
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
              'h1',
              null,
              title
            ),
            _react2['default'].createElement(
              'p',
              null,
              '...'
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(47);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContactPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ContactPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n.ContactPage_root_c4z {\n\n}\n\n.ContactPage_container_2pQ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/components/ContactPage/ContactPage.scss","/./src/components/variables.scss"],"names":[],"mappings":";AACA;;;;;;;GAOG;;ACNH,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADzChF;;CAEC;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"ContactPage.scss","sourcesContent":["\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.scss';\n\n.root {\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "ContactPage_root_c4z",
  	"container": "ContactPage_container_2pQ"
  };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
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
  
  var _BlogPageScss = __webpack_require__(49);
  
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
            'h2',
            { className: _BlogPageScss2['default'].logo },
            'AKILIHUB Talks'
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'header',
            { className: 'row' },
            _react2['default'].createElement(
              'ul',
              { className: (0, _classnames2['default'])('nav', 'navbar-nav', 'navbar-center', _BlogPageScss2['default'].nav) },
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _BlogPageScss2['default'].link, to: '/blog' },
                  'General'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _BlogPageScss2['default'].link, to: '/' },
                  'Research and Insight'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _BlogPageScss2['default'].link, to: '/uganda' },
                  'News'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _BlogPageScss2['default'].link, to: '/blog' },
                  'Tech'
                )
              )
            )
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'section',
            { className: (0, _classnames2['default'])('container', _BlogPageScss2['default'].container) },
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])('col-md-9', _BlogPageScss2['default'].main) },
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'article',
                  { className: 'col-md-12' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      'h3',
                      null,
                      ' What skills should data scientist Have'
                    )
                  ),
                  _react2['default'].createElement('div', { className: 'text-justify', dangerouslySetInnerHTML: { __html: this.props.content || '' } }),
                  _react2['default'].createElement(
                    'a',
                    { href: '#' },
                    ' Read more'
                  ),
                  _react2['default'].createElement('hr', null)
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'article',
                  { className: 'col-md-12' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      'h3',
                      null,
                      ' Natural Languge Processing'
                    )
                  ),
                  _react2['default'].createElement('div', { className: 'text-justify', dangerouslySetInnerHTML: { __html: this.props.content || '' } }),
                  _react2['default'].createElement(
                    'a',
                    { href: '#' },
                    ' Read more'
                  ),
                  _react2['default'].createElement('hr', null)
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'article',
                  { className: 'col-md-12' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      'h3',
                      null,
                      'Machine learning and Statistics'
                    )
                  ),
                  _react2['default'].createElement('div', { className: 'text-justify', dangerouslySetInnerHTML: { __html: this.props.content || '' } }),
                  _react2['default'].createElement(
                    'a',
                    { href: '#' },
                    ' Read more'
                  ),
                  _react2['default'].createElement('hr', null)
                )
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
                      ' Machine learning'
                    )
                  ),
                  _react2['default'].createElement('hr', null)
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'row spacing' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      _Link2['default'],
                      { className: _BlogPageScss2['default'].link, to: '/blog' },
                      ' Data Mining'
                    )
                  ),
                  _react2['default'].createElement('hr', null)
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'row spacing' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      _Link2['default'],
                      { className: _BlogPageScss2['default'].link, to: '/blog' },
                      'Natural Language Processing '
                    )
                  ),
                  _react2['default'].createElement('hr', null)
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(50);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./BlogPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./BlogPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n.BlogPage_root_1ob {\n  margin-top: 2em;\n  color: #777;\n  background-color: white;\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.BlogPage_root_1ob article {padding-left: 4em;padding-right: 4em;}\n.BlogPage_root_1ob .BlogPage_charts_1lj {padding-left: 4em;}\n.BlogPage_root_1ob li {list-style: none;padding-top: 0.5em;margin-left: 6em;}\n.BlogPage_root_1ob table {margin: 0 auto;width: 85%;}\n.BlogPage_root_1ob h2 {color: #6B6969;}\n.BlogPage_logo_TR7 {\n  padding-left: 4em;\n  padding-bottom: 2em;\n  padding-top: 2em;\n}\n.BlogPage_container_sgc {\n  background-color: rgba(204, 204, 204, 0.35);\n}\n.BlogPage_main_255 {\n  margin-right: solid 1px;\n  background-color: white;;\n}\n.BlogPage_main_255 hr {color: #777;}\n.BlogPage_main_255 h3 {color: #374048;padding-bottom: 2em;}\n.BlogPage_spacing_2OA {\n  margin-top: 5em;\n  margin-bottom: 1em;\n}\n.BlogPage_sidebar_2tQ h3, .BlogPage_sidebar_2tQ a {\n  padding-left: 1em;\n}\n.BlogPage_nav_2y4 >li>a, .BlogPage_sidebar_2tQ a {\n  color: #a94442;\n}\n", "", {"version":3,"sources":["/./src/components/BlogPage/BlogPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA,uEAAuE;ACEvE,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;ADnDhF;EACE,gBAAgB;EAChB,YAAY;EACZ,wBAAwB;EACxB,qFAA6E;UAA7E,6EAA6E;CAoB9E;AAnBC,4BACE,kBAAkB,mBACC,CACpB;AACD,yCACE,kBAAkB,CACnB;AACD,uBACE,iBAAiB,mBACE,iBACF,CAClB;AACD,0BACE,eAAe,WACJ,CACZ;AACD,uBACE,eAAe,CAChB;AAEH;EACE,kBAAkB;EAClB,oBAAoB;EACpB,iBAAiB;CAClB;AACD;EACE,4CAA4C;CAC7C;AACD;EACE,wBAAwB;EACxB,wBAAwB;CAQzB;AAPC,uBACE,YAAY,CACb;AACD,uBACE,eAAe,oBACK,CACrB;AAEH;EACE,gBAAgB;EAChB,mBAAmB;CACpB;AACD;EACE,kBAAkB;CACnB;AACD;EAEE,eAAe;CAChB","file":"BlogPage.scss","sourcesContent":["/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n@import '../variables.scss';\n.root {\n  margin-top: 2em;\n  color: #777;\n  background-color: white;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  article {\n    padding-left: 4em;\n    padding-right: 4em;\n  };\n  .charts {\n    padding-left: 4em;\n  };\n  li {\n    list-style: none;\n    padding-top: 0.5em;\n    margin-left: 6em;\n  };\n  table {\n    margin: 0 auto;\n    width: 85%;\n  };\n  h2 {\n    color: #6B6969;\n  }\n}\n.logo {\n  padding-left: 4em;\n  padding-bottom: 2em;\n  padding-top: 2em;\n}\n.container {\n  background-color: rgba(204, 204, 204, 0.35);\n}\n.main {\n  margin-right: solid 1px;\n  background-color: white;\n  hr {\n    color: #777;\n  };\n  h3 {\n    color: #374048;\n    padding-bottom: 2em;\n  };\n}\n.spacing {\n  margin-top: 5em;\n  margin-bottom: 1em;\n}\n.sidebar h3,.sidebar a {\n  padding-left: 1em;\n}\n.nav >li>a,\n.sidebar a {\n  color: #a94442;\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "BlogPage_root_1ob",
  	"charts": "BlogPage_charts_1lj",
  	"logo": "BlogPage_logo_TR7",
  	"container": "BlogPage_container_sgc",
  	"main": "BlogPage_main_255",
  	"spacing": "BlogPage_spacing_2OA",
  	"sidebar": "BlogPage_sidebar_2tQ",
  	"nav": "BlogPage_nav_2y4"
  };

/***/ },
/* 51 */
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
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFoundPageScss = __webpack_require__(52);
  
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(53);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./NotFoundPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./NotFoundPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  margin: 0;\n  line-height: 1.2;\n}\n\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\n\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n", "", {"version":3,"sources":["/./src/components/NotFoundPage/NotFoundPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"NotFoundPage.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  margin: 0;\n  line-height: 1.2;\n}\n\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\n\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 54 */
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
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPageScss = __webpack_require__(55);
  
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(56);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ErrorPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./ErrorPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  margin: 0;\n  line-height: 1.2;\n}\n\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\n\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n\n  }\n\n}\n", "", {"version":3,"sources":["/./src/components/ErrorPage/ErrorPage.scss"],"names":[],"mappings":";AACA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;;GAEnB;;CAEF","file":"ErrorPage.scss","sourcesContent":["\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  margin: 0;\n  line-height: 1.2;\n}\n\nhtml {\n  display: table;\n  width: 100%;\n  height: 100%;\n  color: #888;\n  text-align: center;\n  font-family: sans-serif;\n}\n\nbody {\n  display: table-cell;\n  margin: 2em auto;\n  vertical-align: middle;\n}\n\nh1 {\n  color: #555;\n  font-weight: 400;\n  font-size: 2em;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n\n  }\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 57 */
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
  
  var _DataPageScss = __webpack_require__(58);
  
  var _DataPageScss2 = _interopRequireDefault(_DataPageScss);
  
  var _classnames = __webpack_require__(21);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(25);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _storesDataPageStore = __webpack_require__(60);
  
  var _storesDataPageStore2 = _interopRequireDefault(_storesDataPageStore);
  
  var _Link = __webpack_require__(29);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _actionsDataPageActions = __webpack_require__(66);
  
  var _actionsDataPageActions2 = _interopRequireDefault(_actionsDataPageActions);
  
  var isBrowser = typeof window !== 'undefined';
  var Charts = isBrowser ? __webpack_require__(67) : undefined;
  
  // import testData from './data';
  
  function getStateFromStores() {
    return {
      data: _storesDataPageStore2['default'].getStoreState()
    };
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
  
      this._onChange = function () {
        _this.setState(getStateFromStores());
      };
  
      this.state = getStateFromStores();
      this.path = props.path;
      this.lastDate = null;
      this.getNewData = this.getNewData;
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
        if (isBrowser) {
          try {
            // console.log(this.state.data[0]);
            // this.state.data has data from the server
            this.createDcCharts({ map: 'map', line: 'line', table: 'table', pie: 'pie', row: 'row' }, this.state.data);
            this.getNewData();
          } catch (e) {
            // TODO hack just reload the page this is an error to do with leaflet.js
            // window.location.assign(this.path);
            /* eslint-disable no-console */
            console.log(e);
          }
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        console.log('new data: ' + nextState.data.length);
        this.charts.redrawAll();
        return false;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.context.onSetTitle(title);
        _storesDataPageStore2['default'].removeChangeListener(this._onChange);
        this.dcMap.map().remove();
      }
    }, {
      key: 'getNewData',
      value: function getNewData() {
        var _this2 = this;
  
        setInterval(function callee$2$0() {
          var response, data;
          return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/social/twdata/' + this.lastDate));
  
              case 2:
                response = context$3$0.sent;
                context$3$0.next = 5;
                return regeneratorRuntime.awrap(response.json());
  
              case 5:
                data = context$3$0.sent;
  
                _actionsDataPageActions2['default'].update(data);
  
              case 7:
              case 'end':
                return context$3$0.stop();
            }
          }, null, _this2);
        }, 60000 * 2);
      }
    }, {
      key: 'createDcCharts',
      value: function createDcCharts(container, data) {
        this.charts = new Charts(data);
        this.lastDate = this.charts.lastDate;
        // line chart
        var lineDim = this.charts.createDimenion('hour');
        var lineGroup = this.charts.createGroup(lineDim, 'sentiment');
        this.lineChart = this.charts.lineChart(lineDim, lineGroup, container.line);
        // this.lineChart.render();
        // leaflet map
        this.charts.drawMap(container.map);
        // row
        this.charts.drawRawChart(container.row);
        // pie
        this.charts.drawPieChart(container.pie);
        // table
        // this.table = this.charts.tableChart(dim, container.table);
        this.charts.createDataTable(container.table);
        // this.table.render();
        this.charts.drawAll();
      }
    }, {
      key: 'render',
      value: function render() {
        var divStyle = {
          width: '500px',
          height: '400px'
        };
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(_DataPageScss2['default'].root, 'container-fluid') },
          _react2['default'].createElement(
            'h2',
            { className: _DataPageScss2['default'].logo },
            ' AKILIHUB Data Innovation Center'
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'header',
            { className: 'row' },
            _react2['default'].createElement(
              'ul',
              { className: (0, _classnames2['default'])('nav', 'navbar-nav', 'navbar-center', _DataPageScss2['default'].nav) },
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _DataPageScss2['default'].link, to: '/blog' },
                  'Data Decides'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _DataPageScss2['default'].link, to: '/' },
                  ' Data Explorations'
                )
              ),
              _react2['default'].createElement(
                'li',
                null,
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _DataPageScss2['default'].link, to: '/Data' },
                  'Experimental'
                )
              )
            )
          ),
          _react2['default'].createElement('hr', null),
          _react2['default'].createElement(
            'section',
            { className: (0, _classnames2['default'])('container', _DataPageScss2['default'].container) },
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])('col-md-9', _DataPageScss2['default'].main) },
              _react2['default'].createElement(
                'div',
                { className: 'row spacing' },
                _react2['default'].createElement(
                  'article',
                  { className: 'col-md-12' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      'h3',
                      null,
                      'Digging into the campaigns social Media Stats'
                    )
                  ),
                  _react2['default'].createElement('div', { className: 'text-justify', dangerouslySetInnerHTML: { __html: this.props.content || '' } }),
                  _react2['default'].createElement('hr', null)
                ),
                _react2['default'].createElement(
                  'section',
                  { className: _DataPageScss2['default'].charts },
                  _react2['default'].createElement(
                    'div',
                    { className: 'row spacing-sm' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-6' },
                      _react2['default'].createElement(
                        'h3',
                        null,
                        ' Line Chart'
                      ),
                      _react2['default'].createElement('div', { id: 'line' })
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-6' },
                      _react2['default'].createElement(
                        'h3',
                        null,
                        ' Row Chart'
                      ),
                      _react2['default'].createElement('div', { id: 'row' })
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'row spacing-sm' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-8', ref: 'mapCont', id: 'mapCont' },
                      _react2['default'].createElement(
                        'h3',
                        null,
                        ' Map Chart'
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
                        'h3',
                        null,
                        ' Pie Chart'
                      ),
                      _react2['default'].createElement('div', { id: 'pie' })
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'row spacing-sm' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-md-11 table-cont' },
                      _react2['default'].createElement(
                        'h3',
                        null,
                        ' Table Chart'
                      ),
                      _react2['default'].createElement(
                        'table',
                        { id: 'table', className: (0, _classnames2['default'])('table', 'table-hover', 'table-bordered') },
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
                              'Date'
                            ),
                            _react2['default'].createElement(
                              'th',
                              null,
                              'Location'
                            ),
                            _react2['default'].createElement(
                              'th',
                              null,
                              'sentiment'
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: (0, _classnames2['default'])('col-md-3', _DataPageScss2['default'].sidebar) },
              _react2['default'].createElement(
                'header',
                { className: 'row' },
                _react2['default'].createElement(
                  'h3',
                  null,
                  'Top Data Journeys'
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
                      { className: _DataPageScss2['default'].link, to: '/blog' },
                      '#AskMuseveni  Twitter metric '
                    )
                  ),
                  _react2['default'].createElement('hr', null)
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'row spacing' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      _Link2['default'],
                      { className: _DataPageScss2['default'].link, to: '/blog' },
                      ' The Aine case Data Map'
                    )
                  ),
                  _react2['default'].createElement('hr', null)
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'row spacing' },
                  _react2['default'].createElement(
                    'header',
                    null,
                    _react2['default'].createElement(
                      _Link2['default'],
                      { className: _DataPageScss2['default'].link, to: '/blog' },
                      ' Who has the most Bots Data '
                    )
                  ),
                  _react2['default'].createElement('hr', null)
                )
              )
            )
          )
        );
      }
    }]);
  
    var _DataCenterPage = DataCenterPage;
    DataCenterPage = (0, _decoratorsWithStyles2['default'])(_DataPageScss2['default'])(DataCenterPage) || DataCenterPage;
    return DataCenterPage;
  })(_react.Component);
  
  exports['default'] = DataCenterPage;
  module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(59);
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
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./DataPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js!./DataPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n/**variables*/\n\n//headers\nh1{font-size:2em}\nh2{font-size:1.5em}\nh3{font-size:1.2em}\n\n/*\n * Colors\n * ========================================================================== */ /* #222 */   /* #404040 */ /* #555 */ /* #777 */ /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n/*\n * Layout\n * ========================================================================== */\n\n/*\n * Media queries breakpoints\n * ========================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n.DataPage_root_1Bn {\n  margin-top: 2em;\n  color: #777;\n  background-color: white;\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n.DataPage_root_1Bn article {padding-left: 4em;padding-right: 4em;}\n.DataPage_root_1Bn .DataPage_charts_2yr {padding-left: 3em;}\n.DataPage_root_1Bn li {list-style: none;padding-top: 0.5em;margin-left: 6em;}\n.DataPage_root_1Bn table {margin: 0 auto;}\n.DataPage_root_1Bn h2 {color: #6B6969;}\n.DataPage_logo_2rV {\n  padding-left: 4em;\n  padding-bottom: 2em;\n  padding-top: 2em;\n}\n.DataPage_container_3Ry {\n  background-color: rgba(204, 204, 204, 0.35);\n}\n.DataPage_main_1GV {\n  margin-right: solid 1px;\n  background-color: white;;\n}\n.DataPage_main_1GV hr {color: #777;}\n.DataPage_main_1GV h3 {color: #374048;padding-bottom: 2em;}\n.DataPage_spacing_pJZ {\n  margin-top: 5em;\n  margin-bottom: 1em;\n}\n.DataPage_sidebar_2cr h3, .DataPage_sidebar_2cr a {\n  padding-left: 1em;\n}\n.DataPage_nav_3s0 >li>a, .DataPage_sidebar_2cr a {\n  color: #a94442;\n}\ntable{\n  font-size: 0.9em;\n}\ntable span{display: none}\n", "", {"version":3,"sources":["/./src/components/DataPage/DataPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA,uEAAuE;ACEvE,cAAc;;AASd;GACG,aAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;AACtB,GAAG,eAAkB,CAAC;;AAEtB;;gFAEgF,CAMxB,UAAU,GACV,aAAa,CACb,UAAU,CACV,UAAU,CACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF,EAEhD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;;AAEjE;;gFAEgF;ADnDhF;EACE,gBAAgB;EAChB,YAAY;EACZ,wBAAwB;EACxB,qFAA6E;UAA7E,6EAA6E;CAmB9E;AAlBC,4BACE,kBAAkB,mBACC,CACpB;AACD,yCACE,kBAAkB,CACnB;AACD,uBACE,iBAAiB,mBACE,iBACF,CAClB;AACD,0BACE,eAAe,CAChB;AACD,uBACE,eAAe,CAChB;AAEH;EACE,kBAAkB;EAClB,oBAAoB;EACpB,iBAAiB;CAClB;AACD;EACE,4CAA4C;CAC7C;AACD;EACE,wBAAwB;EACxB,wBAAwB;CAQzB;AAPC,uBACE,YAAY,CACb;AACD,uBACE,eAAe,oBACK,CACrB;AAEH;EACE,gBAAgB;EAChB,mBAAmB;CACpB;AACD;EACE,kBAAkB;CACnB;AACD;EAEE,eAAe;CAChB;AACD;EACE,iBAAiB;CAElB;AADC,WAAK,aAAa,CAAC","file":"DataPage.scss","sourcesContent":["/* React Starter Kit | MIT License | http://www.reactstarterkit.com/ */\n@import '../variables.scss';\n.root {\n  margin-top: 2em;\n  color: #777;\n  background-color: white;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  article {\n    padding-left: 4em;\n    padding-right: 4em;\n  };\n  .charts {\n    padding-left: 3em;\n  };\n  li {\n    list-style: none;\n    padding-top: 0.5em;\n    margin-left: 6em;\n  };\n  table {\n    margin: 0 auto;\n  };\n  h2 {\n    color: #6B6969;\n  }\n}\n.logo {\n  padding-left: 4em;\n  padding-bottom: 2em;\n  padding-top: 2em;\n}\n.container {\n  background-color: rgba(204, 204, 204, 0.35);\n}\n.main {\n  margin-right: solid 1px;\n  background-color: white;\n  hr {\n    color: #777;\n  };\n  h3 {\n    color: #374048;\n    padding-bottom: 2em;\n  };\n}\n.spacing {\n  margin-top: 5em;\n  margin-bottom: 1em;\n}\n.sidebar h3,.sidebar a {\n  padding-left: 1em;\n}\n.nav >li>a,\n.sidebar a {\n  color: #a94442;\n}\ntable{\n  font-size: 0.9em;\n  span{display: none}\n}\n","\n\n/**variables*/\n\n\n$h2-font: 1.5em;\n$h3-font: 1.2em;\n$h1-font: 2em;\n$large-font: 2.1em;\n$font-weight: 700;\n\n//headers\nh1{font-size:$h1-font}\nh2{font-size:$h2-font}\nh3{font-size:$h3-font}\n\n/*\n * Colors\n * ========================================================================== */\n$primary-color: #5B798E;\n$secondary-color: #B76565;\n$light-color:#d9edf7;\n\n$white-base:            hsl(255, 255, 255);\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\n$gray:                  color(black lightness(+33.5%)); /* #555 */\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\n\n/*\n * Typography\n * ========================================================================== */\n\n$font-family-base:      'Lato','Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n/*\n * Layout\n * ========================================================================== */\n\n$max-content-width:     1000px;\n\n/*\n * Media queries breakpoints\n * ========================================================================== */\n\n$screen-xs-min:         480px;  /* Extra small screen / phone */\n$screen-sm-min:         768px;  /* Small screen / tablet */\n$screen-md-min:         992px;  /* Medium screen / desktop */\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\n\n/*\n * Animations\n * ========================================================================== */\n\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "DataPage_root_1Bn",
  	"charts": "DataPage_charts_2yr",
  	"logo": "DataPage_logo_2rV",
  	"container": "DataPage_container_3Ry",
  	"main": "DataPage_main_1GV",
  	"spacing": "DataPage_spacing_pJZ",
  	"sidebar": "DataPage_sidebar_2cr",
  	"nav": "DataPage_nav_3s0"
  };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * has methods that it inherites from a graph class
   * to morph data into objects different charts can work with
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _coreDispatcher = __webpack_require__(61);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _constantsActionTypes = __webpack_require__(63);
  
  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);
  
  var _events = __webpack_require__(65);
  
  var CHANGE_EVENT = 'change';
  
  var UgandaPageStore = (function (_EventEmitter) {
    _inherits(UgandaPageStore, _EventEmitter);
  
    function UgandaPageStore() {
      _classCallCheck(this, UgandaPageStore);
  
      _get(Object.getPrototypeOf(UgandaPageStore.prototype), 'constructor', this).call(this);
      this.data = null;
    }
  
    _createClass(UgandaPageStore, [{
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
      value: function update(newData) {
        this.data.concat(newData);
      }
    }, {
      key: 'getData',
      value: function getData(raw) {
        this.data = raw;
      }
    }, {
      key: 'getStoreState',
      value: function getStoreState() {
        return this.data;
      }
    }]);
  
    return UgandaPageStore;
  })(_events.EventEmitter);
  
  var store = new UgandaPageStore();
  
  _coreDispatcher2['default'].register(function (action) {
    switch (action.actionType) {
      case _constantsActionTypes2['default'].DATAPAGE_RECEIVE_DATA:
        store.getData(action.data);
        store.emitChange();
        break;
      case _constantsActionTypes2['default'].DATAPAGE_UPDATE:
        store.update(action.data);
        store.emitChange();
        break;
      default:
        throw new Error('No specified action');
    }
  });
  
  exports['default'] = store;
  module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _flux = __webpack_require__(62);
  
  var dispatcher = new _flux.Dispatcher();
  
  exports['default'] = dispatcher;
  module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports) {

  module.exports = require("flux");

/***/ },
/* 63 */
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
  
  var _fbjsLibKeyMirror = __webpack_require__(64);
  
  var _fbjsLibKeyMirror2 = _interopRequireDefault(_fbjsLibKeyMirror);
  
  exports['default'] = (0, _fbjsLibKeyMirror2['default'])({
    DATAPAGE_RECEIVE_DATA: null,
    DATAPAGE_UPDATE: null
  });
  module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/keyMirror");

/***/ },
/* 65 */
/***/ function(module, exports) {

  module.exports = require("events");

/***/ },
/* 66 */
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
  
  var _coreDispatcher = __webpack_require__(61);
  
  var _coreDispatcher2 = _interopRequireDefault(_coreDispatcher);
  
  var _constantsActionTypes = __webpack_require__(63);
  
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
      value: function update(raw) {
        _coreDispatcher2['default'].dispatch({
          actionType: _constantsActionTypes2['default'].DATAPAGE_UPDATE,
          data: raw
        });
      }
    }]);
  
    return DataPageActions;
  })();
  
  exports['default'] = new DataPageActions();
  module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _dc = __webpack_require__(68);
  
  var _dc2 = _interopRequireDefault(_dc);
  
  var _coreCfHelper = __webpack_require__(73);
  
  var _coreCfHelper2 = _interopRequireDefault(_coreCfHelper);
  
  __webpack_require__(76);
  
  var _jquery = __webpack_require__(77);
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _moment = __webpack_require__(78);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  // import './dtplugin';
  
  var DcCharts = (function () {
    function DcCharts(data) {
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
        var self = _this;
        (0, _jquery2['default'])(':input').on('keyup', function () {
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
      var transformedData = this._dataTransform(data);
      this.data = _coreCfHelper2['default'].createCrossFilter(transformedData);
    }
  
    _createClass(DcCharts, [{
      key: '_dataTransform',
      value: function _dataTransform(data) {
        if (data[0].date) {
          this.lastDate = data[data.length - 1].date;
          data.forEach(function (d) {
            var momentDate = (0, _moment2['default'])(d.date);
            // const sentiment = d.sentiment.toFixed(1) || d.sentiment;
            d.date = momentDate.format('ddd MMM Do, HH:mm');
            d.text = d.text.toLowerCase();
            d.timeStamp = momentDate.valueOf();
            // d.sentiment = sentiment || 0;
            d.hour = momentDate.hour();
          });
        }
        return data;
      }
    }, {
      key: 'updateData',
      value: function updateData(raw) {
        var newData = this._dataTransform(raw);
        this.data.remove();
        this.data.add(newData);
        console.log('updated data');
      }
    }, {
      key: 'createDataTable',
      value: function createDataTable(table) {
        this.tableDimension = this.createDimenion('text');
        this.datatable = (0, _jquery2['default'])('#' + table);
        // initialize datatable
        // $.fn.dataTable.moment('ddd MMM Do, hA');
        this.datatable.dataTable(this._dataTablesOptions());
        // call RefreshTable when dc-charts are filtered
        for (var i = 0; i < _dc2['default'].chartRegistry.list().length; i++) {
          var chartI = _dc2['default'].chartRegistry.list()[i];
          chartI.on('filtered', this._tablesRefresh);
        }
        // styling
        (0, _jquery2['default'])('input,select,.table-cont a').addClass('btn btn-default');
        // initial table refresh/draw
        this._tablesRefresh();
        // table filter
        this._Tablefilter();
      }
    }, {
      key: 'redrawAll',
      value: function redrawAll() {
        _dc2['default'].redrawAll();
      }
    }, {
      key: '_dataTablesOptions',
      value: function _dataTablesOptions() {
        return {
          'pageLength': 5,
          'order': [[1, 'desc']],
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
              return '<span>' + d.timeStamp + '</span>' + d.date;
            }
          }, {
            targets: 2,
            data: function data(d) {
              return d.location;
            },
            defaultContent: ''
          }, {
            targets: 3,
            data: function data(d) {
              return d.sentiment;
            },
            defaultContent: ''
          }]
        };
      }
    }, {
      key: 'drawAll',
      value: function drawAll() {
        _dc2['default'].renderAll();
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
      key: 'drawMap',
      value: function drawMap(container) {
        if (this.mapDim) this.mapDim.dispose();
        this.mapDim = this.createDimenion('coordinates');
        var mapGroup = this.mapDim.group().reduceCount();
        return this.mapChart(this.mapDim, mapGroup, container);
      }
    }, {
      key: 'drawRawChart',
      value: function drawRawChart(id) {
        var _createGroupAndDimArrayField = this.createGroupAndDimArrayField('user_mentions');
  
        var dim = _createGroupAndDimArrayField.dim;
        var group = _createGroupAndDimArrayField.group;
  
        this.row = this.rowChart(dim, group, id);
      }
    }, {
      key: 'rowChart',
      value: function rowChart(dim, group, rowId) {
        return _dc2['default'].rowChart('#' + rowId).height(300).width(330).margins({
          top: 10,
          right: 10,
          bottom: 20,
          left: 40
        }).dimension(dim).group(group).ordering(function (p) {
          return -p.value;
        }).elasticX(true);
      }
    }, {
      key: 'mapChart',
      value: function mapChart(dim, grp, mapId) {
        var mapGroup = _coreCfHelper2['default'].fakeGroup(grp, 'key');
        // console.log('map count: '+ mapGroup.all().length);
        return _dc2['default'].leafletMarkerChart('#' + mapId).dimension(dim).group(mapGroup).width(600).height(400).zoom(12).fitOnRender(true).fitOnRedraw(true).cluster(true);
      }
    }, {
      key: 'drawPieChart',
      value: function drawPieChart(id) {
        var dim = this.createDimenion('screen_name');
        // const { dim, group } = this.createGroupAndDimArrayField('user_mentions');
        var group = dim.group();
        // top group patch
        // cf.topGroupPatch(group)
        this.pieChart(dim, group, id);
      }
    }, {
      key: 'pieChart',
      value: function pieChart(dim, grp, pie) {
        return _dc2['default'].pieChart('#' + pie).dimension(dim).group(_coreCfHelper2['default'].reduceGroupObjs(grp)).width(200).height(200).renderLabel(true).renderTitle(true).ordering(function (p) {
          return -p.value;
        });
      }
    }, {
      key: 'tableChart',
      value: function tableChart(dim, table) {
        return _dc2['default'].dataTable('#' + table).width(768).height(480).dimension(dim).group(function () {
          return 'dc.js insists on putting a row here so I remove it using JS';
        }).columns([function (d) {
          return d.text;
        }, function (d) {
          return d.hour;
        }, function (d) {
          return d.type;
        }, function (d) {
          return d.sentiment;
        }]).size(5).order(_dc2['default'].d3.descending).on('renderlet', function (chart) {
          // each time table is rendered remove nasty extra row dc.js insists on adding
          chart.select('tr.dc-table-group').remove();
        });
      }
    }, {
      key: 'lineChart',
      value: function lineChart(dimension, group, chartId) {
        var range = _coreCfHelper2['default'].getMinAndMax(group, 'key');
        return _dc2['default'].lineChart('#' + chartId).width(450).height(300).x(_dc2['default'].d3.scale.linear().domain(range)).elasticY(true).elasticX(true).brushOn(true).renderDataPoints(true).yAxisLabel('Y axis').dimension(dimension).group(group);
      }
    }]);
  
    return DcCharts;
  })();
  
  exports['default'] = DcCharts;
  module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dc2 = __webpack_require__(69);
  
  var _dc3 = _interopRequireDefault(_dc2);
  
  var _leaflet = __webpack_require__(70);
  
  var _leaflet2 = _interopRequireDefault(_leaflet);
  
  __webpack_require__(71);
  
  var _dcAddons = __webpack_require__(72);
  
  var _dcAddons2 = _interopRequireDefault(_dcAddons);
  
  _leaflet2['default'].Icon.Default.imagePath = 'images';
  exports['default'] = (0, _dcAddons2['default'])(_dc3['default'], _leaflet2['default']);
  module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("dc");

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("leaflet");

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("leaflet.markercluster");

/***/ },
/* 72 */
/***/ function(module, exports) {

  module.exports = require("dc-addons");

/***/ },
/* 73 */
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
  
  var _crossfilter2 = __webpack_require__(74);
  
  var _crossfilter22 = _interopRequireDefault(_crossfilter2);
  
  var _lodash = __webpack_require__(75);
  
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
        console.log(topObj);
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
          if (v[attr][0] === '') return p; // skip empty values
          v[attr].forEach(function (val) {
            p[val] = (p[val] || 0) + 1; // increment counts
          });
          return p;
        };
      }
    }, {
      key: 'reduceRemove',
      value: function reduceRemove(attr) {
        return function (p, v) {
          if (v[attr][0] === '') return p; // skip empty values
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
        _lodash2['default'].forOwn(group, function (value, key) {
          if (value > Math.floor(max / 6)) transformedGrp[key] = value;
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
/* 74 */
/***/ function(module, exports) {

  module.exports = require("crossfilter2");

/***/ },
/* 75 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 76 */
/***/ function(module, exports) {

  module.exports = require("datatables");

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("jquery");

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("moment");

/***/ },
/* 79 */
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
/* 80 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = require("compression");

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _dataHandlerTw = __webpack_require__(83);
  
  var _dataHandlerTw2 = _interopRequireDefault(_dataHandlerTw);
  
  var router = new _express2['default'].Router();
  
  router.get('/social/twdata', function callee$0$0(req, res, next) {
    var data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(_dataHandlerTw2['default'].findAll());
  
        case 3:
          data = context$1$0.sent;
  
          res.status(200).json(data);
          context$1$0.next = 10;
          break;
  
        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 7]]);
  });
  
  router.get('/social/twdata/:date', function callee$0$0(req, res, next) {
    var data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(_dataHandlerTw2['default'].findByDate(req.params.date));
  
        case 3:
          data = context$1$0.sent;
  
          res.status(200).json(data);
          context$1$0.next = 10;
          break;
  
        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 7]]);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Gets data from Twitter model
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _mongodb = __webpack_require__(84);
  
  var _mongodb2 = _interopRequireDefault(_mongodb);
  
  var _config = __webpack_require__(14);
  
  var MongoClient = _mongodb2['default'].MongoClient;
  
  function _connection() {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(_config.MONGO_URL, function (err, db) {
        resolve(db);
        reject(err);
      });
    });
  }
  
  function findAll() {
    var db;
    return regeneratorRuntime.async(function findAll$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(_connection());
  
        case 3:
          db = context$1$0.sent;
          return context$1$0.abrupt('return', db.collection('twitters').find({ 'is_retweet': false }).toArray());
  
        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);
          throw new Error(context$1$0.t0);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 7]]);
  }
  
  function findByDate(date) {
    var db;
    return regeneratorRuntime.async(function findByDate$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap(_connection());
  
        case 3:
          db = context$1$0.sent;
          return context$1$0.abrupt('return', db.collection('twitters').find({
            date: {
              $gt: date
            },
            is_retweet: false
          }).toArray());
  
        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);
          throw new Error(context$1$0.t0);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 7]]);
  }
  
  exports['default'] = {
    findAll: findAll, findByDate: findByDate
  };
  module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("mongodb");

/***/ },
/* 85 */
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
  
  var _fs = __webpack_require__(86);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(2);
  
  var _express = __webpack_require__(3);
  
  var _bluebird = __webpack_require__(87);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(88);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(89);
  
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
/* 86 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 89 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map