/*globals just_started,schedule,scheduled,completed,workflow_input,stop,results,waiting_for */
if (just_started) {
    schedule("sw-120", {
        "activityType": "fetch",
        "input": {
            "URL": [
                "http://www.newyorker.com/feed/news",
                "http://www.thebaffler.com/feed/",
                "http://www.economist.com/feeds/print-sections/103/special-reports.xml",
                "http://www.economist.com/blogs/democracyinamerica/index.xml",
                "http://www.economist.com/feeds/print-sections/102/briefings2.xml",
                "http://www.rollingstone.com/politics.rss",
                "http://harpers.org/feed/",
                "http://www.technologyreview.com/stream/rss/",
                "http://www.counterpunch.org/feed/",
                "http://www.fairobserver.com/feed/"
            ]
        }
    });
}
if (!scheduled("_OUTPUT") && completed("sw-119")) {
    var params = {
        "activityType": "output",
        "input": {}
    };
    params.input["_INPUT"] = results("sw-119")["_OUTPUT"];
    schedule("_OUTPUT", params);
}
if (!scheduled("sw-113") && completed("sw-120")) {
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
    params.input["_INPUT"] = results("sw-120")["_OUTPUT"];
    schedule("sw-113", params);
}
if (!scheduled("sw-119") && completed("sw-113")) {
    var params = {
        "activityType": "truncate",
        "input": {
            "count": "45"
        }
    };
    params.input["_INPUT"] = results("sw-113")["_OUTPUT"];
    schedule("sw-119", params);
}
if (completed('_OUTPUT')) {
    stop('finished !');
}