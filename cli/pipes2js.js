#!/usr/bin/env node

var path = require('path'),
    pipe2js = require(path.join(__dirname, '..', 'index'));
var fs = require('fs');

function usage() {
    console.log("Usage: pipes2js");
}

var pipeIds = fs.readdirSync('./old_pipes/');
var arrayLength = pipeIds.length;

for (var i = 0; i < arrayLength; i++) {
    pipe2js.importPipe(pipeIds[i]);
}