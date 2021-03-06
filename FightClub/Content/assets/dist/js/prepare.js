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
		addEvent = util.addEvent;

	var actionButtons = $$(".actions button");

	var moveMap = {
		"blockhigh": 0,
		"hithigh": 1,
		"blockmid": 2,
		"hitmid": 3,
		"blocklow": 4,
		"hitlow": 5
	};

	function resetRound(roundNumber) {
		var buttons = $$(".actions button[data-round='" + roundNumber + "']");
		buttons.forEach(function(button) {
			button.setAttribute("data-action", "");
		});
	}

	function setRoundAction(roundNumber, area, action) {
		var button = $(".actions button[data-round='" + roundNumber + "'][data-area='" + area + "']");
		button.setAttribute("data-action", action);
		if (activeUser === "User1") {
			$("#User1Move" + roundNumber).value = moveMap[action+area];
		} else {
			$("#User2Move" + roundNumber).value = moveMap[action+area];
		}
	}

	actionButtons.forEach(function(button) {
		addEvent(button, "click", function() {
			var roundNumber = +button.getAttribute("data-round");
			var area = button.getAttribute("data-area");
			var currentAction = button.getAttribute("data-action");
			resetRound(roundNumber);
			var action = "";
			if (currentAction === "hit") {
				action = "block";
			} else {
				action = "hit";
			}
			setRoundAction(roundNumber, area, action);
		});
	});

	addEvent($(".battle-prepare button.fight"), "click", function() {
		$("#battleform").submit();
	});

	resetRound(1);
	resetRound(2);
	resetRound(3);

	setRoundAction(1, "high", "hit");
	setRoundAction(2, "high", "hit");
	setRoundAction(3, "high", "hit");

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