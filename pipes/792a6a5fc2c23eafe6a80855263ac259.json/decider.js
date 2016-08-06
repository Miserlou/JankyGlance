/*globals just_started,schedule,scheduled,completed,workflow_input,stop,results,waiting_for */
if (just_started) {
    schedule("sw-59", {
        "activityType": "fetch",
        "input": {
            "URL": "https://quiet-fjord-2957.herokuapp.com/proxy/http://reddit.com/r/truereddit.rss"
        }
    });
}
if (!scheduled("_OUTPUT") && completed("sw-70")) {
    var params = {
        "activityType": "output",
        "input": {}
    };
    params.input["_INPUT"] = results("sw-70")["_OUTPUT"];
    schedule("_OUTPUT", params);
}
if (!scheduled("sw-70") && completed("sw-143")) {
    var params = {
        "activityType": "rename",
        "input": {
            "RULE": [
                {
                    "field": "getalink",
                    "op": "rename",
                    "newval": "link"
                },
                {
                    "field": "y:title",
                    "op": "copy",
                    "newval": "title"
                }
            ]
        }
    };
    params.input["_INPUT"] = results("sw-143")["_OUTPUT"];
    schedule("sw-70", params);
}
if (!scheduled("sw-143") && completed("sw-158")) {
    var params = {
        "activityType": "regex",
        "input": {
            "RULE": [
                {
                    "field": "getalink",
                    "match": ".*<a href=\"([^\"]+)\"[^>]*>\\[link\\].*",
                    "replace": "$1"
                },
                {
                    "field": "whaterddit",
                    "match": "http://www.reddit.com/r/([^/]*)/.*",
                    "replace": "$1"
                }
            ]
        }
    };
    params.input["_INPUT"] = results("sw-158")["_OUTPUT"];
    schedule("sw-143", params);
}
if (!scheduled("sw-158") && completed("sw-59")) {
    var params = {
        "activityType": "rename",
        "input": {
            "RULE": [
                {
                    "field": "description",
                    "op": "copy",
                    "newval": "getalink"
                },
                {
                    "field": "link",
                    "op": "rename",
                    "newval": "whaterddit"
                }
            ]
        }
    };
    params.input["_INPUT"] = results("sw-59")["_OUTPUT"];
    schedule("sw-158", params);
}
if (completed('_OUTPUT')) {
    stop('finished !');
}