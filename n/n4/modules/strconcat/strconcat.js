
exports.worker = function (task, config) {

    var input = JSON.parse(task.config.input);

    task.respondCompleted({
        _OUTPUT: Array.isArray(input.part) ? input.part.join('') : input.part
    });

};

