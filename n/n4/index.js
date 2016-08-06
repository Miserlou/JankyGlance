var fs = require('fs'), path = require('path');
console.log('Loading event');

var deciderCode = fs.readFileSync(path.join(__dirname, 'decider.js'), 'utf8');
var runner = require('pipes2js').run;

debugger;

exports.handler = function(event, context) {
	runner({}, deciderCode, function (err, results, state) {
	  result = context.done(null, JSON.stringify(results, null, 3));
	});
};
