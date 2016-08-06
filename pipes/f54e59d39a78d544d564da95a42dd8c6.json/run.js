var fs = require('fs'), path = require('path');

var deciderCode = fs.readFileSync(path.join(__dirname, 'decider.js'), 'utf8');

var run = require('pipes2js').run;

run({}, deciderCode, function (err, results, state) {
  console.log(JSON.stringify(results, null, 3));
});