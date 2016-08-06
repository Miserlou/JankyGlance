/*globals just_started,schedule,scheduled,completed,workflow_input,stop,results,waiting_for */
if (just_started) {
    schedule("sw-55", {
        "activityType": "fetch",
        "input": {
            "URL": "http://www.feedbooks.com/books/top.atom?category=FBFIC029000&lang=en"
        }
    });
}
if (!scheduled("_OUTPUT") && completed("sw-137")) {
    var params = {
        "activityType": "output",
        "input": {}
    };
    params.input["_INPUT"] = results("sw-137")["_OUTPUT"];
    schedule("_OUTPUT", params);
}
if (!scheduled("sw-137") && completed("sw-55")) {
    var params = {
        "activityType": "rename",
        "input": {
            "RULE": [
                {
                    "field": "",
                    "op": "rename",
                    "newval": ""
                }
            ]
        }
    };
    params.input["_INPUT"] = results("sw-55")["_OUTPUT"];
    schedule("sw-137", params);
}
if (completed('_OUTPUT')) {
    stop('finished !');
}