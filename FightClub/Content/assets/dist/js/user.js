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
/******/ 	__webpack_require__.p = "/local-assets/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(1),
		$ = util.$,
		$$ = util.$$,
		addEvent = util.addEvent,
		ajax = util.ajax;

	var buttonGo = $(".challenge-form .button-go");
	var buttonRandom = $(".challenge-form .button-random");
	var userInput = $(".challenge-form .username");


	function getRandomUser() {
		ajax.get("/Opponent/Random/" + loggedInUser, function(err, data) {
			if (data) {
				data = JSON.parse(data);
				challengeUser(data.Username);
			}
		});
	}

	function getUserByName() {
		var name = userInput.value;
		if (!name || name === loggedInUser) {
			return;
		}
		ajax.get("/Opponent/" + name, function(err, data) {
			if (data) {
				data = JSON.parse(data);
				challengeUser(data.Username);
			}
		});
	}

	function challengeUser(name) {
		location.href = "/match/start/" + loggedInUser + "/vs/" + name;
	}


	addEvent(buttonGo, "click", getUserByName);
	addEvent(buttonRandom, "click", getRandomUser);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var doc = document;
	var textProp = "textContent" in doc.documentElement ? "textContent" : "innerText"; 
	var selReg = /^([^.#\[\s]+|)(#[^.\[\s]+|)((?:\.[^.]+)+|)$/;

	function $(selector, parent) {
		return (parent || doc).querySelector(selector);
	}

	function $$(selector, parent) {
		var nodelist = (parent || doc).querySelectorAll(selector);
		var length = nodelist.length;
		var i = 0;
		var elements = [];
		while (i < length) {
			elements.push(nodelist[i++]);
		}
		return elements;
	}

	function attr(element, name, value) {
	    if (typeof value !== "undefined") {
	        element.setAttribute(name, value);
	    } else {
	        return element.getAttribute(name);
	    }
	}

	function attrs(element, attributes) {
	    for (var a in attributes) {
	        if (attributes.hasOwnProperty(a)) {
	            element.setAttribute(a, attributes[a]);
	        }
	    }
	}

	function create(name, className, attributes) {
	    var element = document.createElement(name);
	    if (className) {
	        element.className = className;
	    }
	    if (attributes) {
	        attrs(element, attributes);
	    }
	    return element;
	}

	var classRegExpCache = {};

	function classRegExp(className) {
		if (!classRegExpCache[className]) {
			classRegExpCache[className] = new RegExp("(^|\\s)" + className + "(?=\\s|$)", "g");
		}
		return classRegExpCache[className];
	}

	function hasClass(element, className) {
		return !!element.className.match(classRegExp(className));
	}

	function addClass(element, className) {
		if (!hasClass(element, className)) {
			element.className = element.className + (element.className ? " " : "" ) + className;
		}
	}

	function removeClass(element, className) {
		element.className = element.className.replace(classRegExp(className), "");
	}

	function toggleClass(element, className) {
		if (!hasClass(element, className)) {
			addClass(element, className);
		}
		else {
			removeClass(element, className);
		}
	}

	function addEvent(element, event, handler) {
	    if (element.addEventListener) {
	        element.addEventListener(event, handler, false);
	    } else if (element.attachEvent) {
	        element.attachEvent("on" + event, handler);
	    }
	}

	function removeEvent(element, event, handler) {
	    if (element.removeEventListener) {
	        element.removeEventListener(event, handler);
	    } else if (element.detachEvent) {
	        element.detachEvent("on" + event, handler);
	    }
	}



	function ajax(url, method, data, contentType, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url, true);
	    if (contentType) {
	        xhr.setRequestHeader("Content-type", contentType);
	    }
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState === 4) {
	            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
	                callback(null, xhr.responseText);
	            }
	        }
	    };
	    xhr.onerror = function(err) {
	        callback(err);
	    };
	    xhr.send(data);
	}

	function serialize(values) {
	    var str = "";
	    for (var key in values) {
	        if (values.hasOwnProperty(key)) {
	            if (str !== "") str += "&";
	            str += key + "=" + encodeURIComponent(values[key]);
	        }
	    }
	    return str;
	}

	function deserialize(str) {
	    var pairs = str.split("&");
	    var values = {};
	    for (var i=0;i<pairs.length;i++) {
	        var pair = pairs[i].split("=");
	        values[pair[0]] = decodeURIComponent(pair[1]);
	    }
	    return values;
	}

	function get(url, callback) {
	    ajax(url, "GET", null, null, callback);
	}

	function post(url, data, callback) {
	    ajax(url, "POST", serialize(data), "application/x-www-form-urlencoded", callback);
	}

	module.exports = {
		$: $,
		$$: $$,
		attr: attr,
		attrs: attrs,
		create: create,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		addEvent: addEvent,
		removeEvent: removeEvent,
		ajax: {
			request: ajax,
			get: get,
			post: post,
			createQueryString: serialize,
			parseQueryString: deserialize
		}
	};

/***/ }
/******/ ]);