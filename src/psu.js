(function() {
	var psu = window.psu = window.psu || {},
		eventHandler = psu.eventHandler = psu.eventHandler || {};
	eventHandler.events = {};
	/**
	 * @param {string} event
	 * @param {?} data
	 * @return {undefined}
	 */
	eventHandler.publish = function(event, data) {
		var events = event.split(" "),
			key,
			func;
		for (key in events) {
			if (eventHandler.events.hasOwnProperty(events[key])) {
				if (Object.prototype.toString.call(eventHandler.events[events[key]]) === "[object Array]") {
					for (func in eventHandler.events[events[key]]) {
						if (!isNaN(func)) {
							eventHandler.events[events[key]][func].call(this, events[key], data);
						}
					}
				}
			}
		}
	};
	/**
	 * @param {string} event
	 * @param {Array} cb
	 * @return {undefined}
	 */
	eventHandler.subscribe = function(event, cb) {
		var events = event.split(" "),
			key,
			k,
			arr;
		for (key in events) {
			if (!eventHandler.events.hasOwnProperty(events[key])) {
				if (Object.prototype.toString.call(cb) === "[object Array]" || typeof cb === "function" && typeof events[key] === "string") {
					eventHandler.events[events[key]] = typeof cb === "function" ? [cb] : cb;
				}
			} else {
				if (Object.prototype.toString.call(tmg.eventHandler.events[events[key]]) === "[object Array]" && typeof events[key] === "string") {
					arr = typeof cb === "function" ? [cb] : cb;
					for (k in arr) {
						if (eventHandler.events[events[key]].toString().indexOf(arr[k]) <= -1 && !isNaN(k)) {
							eventHandler.events[events[key]].push(arr[k]);
						}
					}
				}
			}
		}
	};
	/**
	 * @param {string} event
	 * @return {undefined}
	 */
	eventHandler.unsubscribe = function(event) {
		var events = event.split(" "),
			key;
		for (key in events) {
			if (eventHandler.events.hasOwnProperty(events[key])) {
				delete eventHandler.events[events[key]];
			}
		}
	};
})();
