
exports.worker = function (task, config) {

    var input = JSON.parse(task.config.input);

    task.respondCompleted({
        _OUTPUT: input.default || input.debug
    });

};

