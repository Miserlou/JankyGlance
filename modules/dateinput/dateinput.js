
exports.worker = function (task, config) {

    var input = JSON.parse(task.config.input);

    task.respondCompleted({
        _OUTPUT: Date.parse(input.default || input.debug)/1000
    });

};

