var rateLimiter = require('./rateLimiter');

function foo(x) {
	console.log(x, new Date());
}

var f = rateLimiter(foo, 2000);
f('A');
f('B');
f('C');
f('D');