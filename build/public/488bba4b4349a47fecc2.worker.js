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

  eval("/*eslint-disable*/\n'use strict';\n\nonmessage = function (event) {\n  var url = 'http://localhost:3000/api/social/twdata/' + event.data;\n  get(url).then(function (data) {\n    postMessage(data);\n  })['catch'](function (err) {\n    if (err) postMessage(err);\n  });\n};\n\nfunction get(url) {\n  return new Promise(function (resolve, reject) {\n    var client = new XMLHttpRequest();\n    client.open('GET', url);\n    client.send();\n    client.onload = function () {\n      if (this.status >= 200 && this.status < 300) {\n        resolve(JSON.parse(this.response));\n      } else {\n        reject(this.statusText);\n      }\n    };\n    client.onerror = function () {\n      reject(this.statusText);\n    };\n  });\n}//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy93b3JrZXIuanM/NjIzZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlKi9cbm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGNvbnN0IHVybCA9IGBodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3NvY2lhbC90d2RhdGEvJHtldmVudC5kYXRhfWA7XG4gIGdldCh1cmwpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBwb3N0TWVzc2FnZShkYXRhKTtcbiAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHBvc3RNZXNzYWdlKGVycik7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0KHVybCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY2xpZW50Lm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgY2xpZW50LnNlbmQoKTtcbiAgICBjbGllbnQub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcbiAgICB9O1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3dvcmtlci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);