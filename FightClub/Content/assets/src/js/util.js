
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