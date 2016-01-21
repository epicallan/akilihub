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

  eval("/*eslint-disable*/\n//TODO quick url fix\n'use strict';\n\nonmessage = function (event) {\n  var url = 'http://akilihub.io/api/social/twdata/' + event.data;\n  get(url).then(function (data) {\n    postMessage(data);\n  })['catch'](function (err) {\n    if (err) postMessage(err);\n  });\n};\n\nfunction get(url) {\n  return new Promise(function (resolve, reject) {\n    var client = new XMLHttpRequest();\n    client.open('GET', url);\n    client.send();\n    client.onload = function () {\n      if (this.status >= 200 && this.status < 300) {\n        resolve(JSON.parse(this.response));\n      } else {\n        reject(this.statusText);\n      }\n    };\n    client.onerror = function () {\n      reject(this.statusText);\n    };\n  });\n}//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy93b3JrZXIuanM/NjIzZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlKi9cbi8vVE9ETyBxdWljayB1cmwgZml4XG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICBjb25zdCB1cmwgPSBgaHR0cDovL2FraWxpaHViLmlvL2FwaS9zb2NpYWwvdHdkYXRhLyR7ZXZlbnQuZGF0YX1gO1xuICBnZXQodXJsKS50aGVuKChkYXRhKSA9PiB7XG4gICAgcG9zdE1lc3NhZ2UoZGF0YSk7XG4gIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSBwb3N0TWVzc2FnZShlcnIpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGdldCh1cmwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNsaWVudC5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIGNsaWVudC5zZW5kKCk7XG4gICAgY2xpZW50Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGllbnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XG4gICAgfTtcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy93b3JrZXIuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);