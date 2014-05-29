//     rateLimiter.js 1.0.0
//     (c) 2014 Yusuf Bhabhrawala
//     rateLimiter.js may be freely distributed under the MIT license.

(function(){
	'use strict';

	function rateLimiter(func, delay) {

		var state = true;
		var queue = [];
		var that;

		function wait() {
			state = false;
			setTimeout(function(){
				if (queue.length > 0) {
					var args = queue.splice(0,1);
					func.apply(that, args[0]);
					wait();
				} else {
					state = true;
				}
			}, delay);
		}

		return function() {
			that = this;
			if (state === true) {
				func.apply(that, arguments);
				wait();
			} else {
				queue.push(arguments);
			}
		}
	}

	if (typeof module != 'undefined' && module.exports) module.exports = rateLimiter;
	if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
		define(function(){
			return rateLimiter;
		});
	} 
	if (typeof jQuery === 'function') jQuery.fn['rateLimiter'] = rateLimiter;
	if (typeof window != 'undefined') window['rateLimiter'] = rateLimiter;

})();
