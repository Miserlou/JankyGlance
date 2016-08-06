/*globals just_started,schedule,scheduled,completed,workflow_input,stop,results,waiting_for */
if (just_started) {
    schedule("sw-52", {
        "activityType": "fetch",
        "input": {
            "URL": [
                "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",
                "http://feeds.bbci.co.uk/news/rss.xml",
                "http://america.aljazeera.com/content/ajam/articles.rss",
                "http://www.theguardian.com/world/rss"
            ]
        }
    });
}
if (!scheduled("_OUTPUT") && completed("sw-94")) {
    var params = {
        "activityType": "output",
        "input": {}
    };
    params.input["_INPUT"] = results("sw-94")["_OUTPUT"];
    schedule("_OUTPUT", params);
}
if (!scheduled("sw-71") && completed("sw-52")) {
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
    params.input["_INPUT"] = results("sw-52")["_OUTPUT"];
    schedule("sw-71", params);
}
if (!scheduled("sw-94") && completed("sw-71")) {
    var params = {
        "activityType": "truncate",
        "input": {
            "count": "45"
        }
    };
    params.input["_INPUT"] = results("sw-71")["_OUTPUT"];
    schedule("sw-94", params);
}
if (completed('_OUTPUT')) {
    stop('finished !');
}