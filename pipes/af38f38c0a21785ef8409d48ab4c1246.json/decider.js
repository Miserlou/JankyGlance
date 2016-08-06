/*globals just_started,schedule,scheduled,completed,workflow_input,stop,results,waiting_for */
if (just_started) {
    schedule("sw-55", {
        "activityType": "fetch",
        "input": {
            "URL": "https://news.ycombinator.com/rss"
        }
    });
}
if (!scheduled("_OUTPUT") && completed("sw-55")) {
    var params = {
        "activityType": "output",
        "input": {}
    };
    params.input["_INPUT"] = results("sw-55")["_OUTPUT"];
    schedule("_OUTPUT", params);
}
if (completed('_OUTPUT')) {
    stop('finished !');
}