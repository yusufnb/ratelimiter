var rateLimiter = require('./rateLimiter');

function foo(x) {
	console.log(x, (new Date()).getSeconds());
}

// Simple run with args
var f = rateLimiter(foo, 2000);
f('A');
f('B');

// Scope test
var x = {
	a: 1,
	b: rateLimiter(function(t) {
		console.log(this.a, t, (new Date()).getSeconds());
	}, 1000)
};

x.b('A');
x.b('B');
