/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

  eval("/*eslint-disable*/\n//TODO quick url fix\n'use strict';\n\nonmessage = function (event) {\n  get(event.data).then(function (data) {\n    postMessage(data);\n  })['catch'](function (err) {\n    if (err) postMessage(err);\n  });\n};\n\nfunction get(url) {\n  return new Promise(function (resolve, reject) {\n    var client = new XMLHttpRequest();\n    client.open('GET', url);\n    client.send();\n    client.onload = function () {\n      if (this.status >= 200 && this.status < 300) {\n        resolve(JSON.parse(this.response));\n      } else {\n        reject(this.statusText);\n      }\n    };\n    client.onerror = function () {\n      reject(this.statusText);\n    };\n  });\n}//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy93b3JrZXIuanM/NjIzZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlKi9cbi8vVE9ETyBxdWljayB1cmwgZml4XG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICBnZXQoZXZlbnQuZGF0YSkudGhlbigoZGF0YSkgPT4ge1xuICAgIHBvc3RNZXNzYWdlKGRhdGEpO1xuICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgaWYgKGVycikgcG9zdE1lc3NhZ2UoZXJyKTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBnZXQodXJsKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjbGllbnQub3BlbignR0VUJywgdXJsKTtcbiAgICBjbGllbnQuc2VuZCgpO1xuICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xuICAgICAgfVxuICAgIH07XG4gICAgY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xuICAgIH07XG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvd29ya2VyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);