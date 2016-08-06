/*globals just_started,schedule,scheduled,completed,workflow_input,stop,results,waiting_for */
if (just_started) {
    schedule("sw-53", {
        "activityType": "fetch",
        "input": {
            "URL": [
                "http://www.newyorker.com/feed/books",
                "http://www.newyorker.com/feed/humor"
            ]
        }
    });
}
if (!scheduled("_OUTPUT") && completed("sw-64")) {
    var params = {
        "activityType": "output",
        "input": {}
    };
    params.input["_INPUT"] = results("sw-64")["_OUTPUT"];
    schedule("_OUTPUT", params);
}
if (!scheduled("sw-64") && completed("sw-53")) {
    var params = {
        "activityType": "sort",
        "input": {
            "KEY": [
                {
                    "field": "pubDate",
                    "dir": "DESC"
                }
            ]
        }
    };
    params.input["_INPUT"] = results("sw-53")["_OUTPUT"];
    schedule("sw-64", params);
}
if (completed('_OUTPUT')) {
    stop('finished !');
}