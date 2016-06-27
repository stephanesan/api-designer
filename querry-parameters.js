function getParams() {
    var queries = window.location.search.replace(/^\?/, '').split('&');
    var searchObject = {};
    for(var i = 0; i < queries.length; i++ ) {
        var split = queries[i].split('=');
        searchObject[split[0]] = decodeURIComponent(split[1]);
    }
    var api = searchObject['gitApi'];
    var repo = searchObject['gitRepo'];
    var path = searchObject['gitPath'];
    var ref = searchObject['gitRef'];
    var file = searchObject['gitFile']; 
    if (api == null) {
        api = 'api.github.com/';
    }
    if (repo == null) {
        repo = 'mulesoft/api-console';
        path = 'dist/examples';
    }
    if (path == null) path = '/';
    if (ref == null) ref = 'master';
    var out = {api: api, repo: repo, path: path, file: file, ref: ref}; 
    console.log("gitParams=" + JSON.stringify(out));
    return out;
}

function querryString(gitParams) {
    var querry = '?gitApi='+ gitParams.api + '&gitRepo='+ gitParams.repo;
    if(gitParams.path!=null) 
        querry+='&gitPath=' + gitParams.path;
    if(gitParams.file!=null) 
        querry+='&gitFile=' + gitParams.file;
     if(gitParams.ref!=null) 
        querry+='&gitRef=' + gitParams.ref;
    return querry;
}

var assemblePath = function (segments) {
    if(0==segments.length) return "";
    
    path = segments[0].replace(/\/$/, "").replace(/^\//, "");
    for(var i=1; i<segments.length; i++) {
        path += '/'+ segments[i].replace(/\/$/, "").replace(/^\//, "");
    }
    return path;
};


