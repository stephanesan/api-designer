(function(angular) {
      'use strict';
angular
.module('headerApp', [])
.controller('headerController', 

    function ($scope, $http, $q, $sce) {

        function updateHeader() {

            var p1 = $http({method: "get", url: "https://api.github.com/repos/" + gitParams.repo, cache: true});
            var p2 = $http({method: "get", url: "https://api.github.com/repos/" + gitParams.repo + "/branches", cache: true});
            var p3 = $http({method: "get", url: "https://api.github.com/repos/" + gitParams.repo + "/tags", cache: true});

            $q.all([p1, p2, p3]).then(function(responses) {
                var resp1 = responses[0];
                $scope.gitHubAvatar = resp1.data.owner.avatar_url;
                $scope.gitHubOwnerHtmlURL = resp1.data.owner.html_url; 
                $scope.gitHubOwnerType = resp1.data.owner.type; 
                $scope.gitHubOwnerLogin = resp1.data.owner.login;
                $scope.gitHubRepoName = resp1.data.name;
                $scope.gitHubRepoPath = gitParams.path;
                $scope.gitHubHtmlUrl = resp1.data.html_url;

                // Build the select element
                $scope.refs = {};
                $scope.refs.availableOptions = [];
                // Set the branch options 
                var branches = filterArray(responses[1].data, headerConfig.branches);
                var found = false;
                var replacement = null;
                if(branches.length != 0) {
                    $scope.refs.availableOptions.push({id: "branches", name: "branches", disabled: true});
                    branches.forEach(function(branch){
                        $scope.refs.availableOptions.push({id: branch.name, name: branch.name});
                        if(branch.name === gitParams.ref) found=true;
                        else replacement = branch.name;
                    });
                }
                // Set the tag options
                var tags = filterArray(responses[2].data, headerConfig.tags); 
                if(tags.length != 0) {
                    $scope.refs.availableOptions.push({id: "tags", name: "tags", disabled: true});
                    tags.forEach(function(tag){
                        $scope.refs.availableOptions.push({id: tag.name, name: tag.name});
                        if(tag.name === gitParams.ref) found=true;
                        else replacement = tag.name;
                    });
                }
                
                if(!found) {
                    // bad ref, force it to the last matching entry;
                    gitParams.ref = replacement;
                    console.log("Default ");
                    history.pushState(
                            null, 
                            null, 
                            window.location.search.replace(/^\?.*/, querryString()));
                }


                // Set the selected option
                $scope.refs.selectedOption= {id: gitParams.ref};
                $scope.refs.changed = function() {
                    gitParams.ref = $scope.refs.selectedOption.id; 
                    history.pushState(
                            null, 
                            null, 
                            window.location.search.replace(/^\?.*/, querryString()));
                    updateIframe();
                };

                // We're done, display load the iframe and display the header
                updateIframe();
                $scope.gitHeader=true;
            });
        }

        function filterArray(array, config) {
            var out = [];
            if(config == undefined) {
                // all pass if no filter defined.
                return array;
            }
            if(config.pattern == undefined ||
               config.flags == undefined ) {
                   // all fail if no pattern or no flags defined.
                   return out;
            }
            var regExp = new RegExp(config.pattern, config.flags); 
            array.forEach(function(el){
                if(regExp.test(el.name)) {
                    out.push(el);
                }
            });
            return out;
        }

        function getHeaderConfig() {
            var configFile = "config/"+gitParams.repo.replace(/\//, '_')+".json"; 
            $http(
                    {
                        method: "get", 
                        url: configFile,  
                        cache: true
                    }
                ).then(
                    function(response) 
                    {
                        console.log("Filter: "+JSON.stringify(response.data));
                        headerConfig= response.data;
                        if(undefined == gitParams.ref && undefined != headerConfig.ref) {
                            gitParams.ref = headerConfig.ref;
                        }
                        updateHeader();
                    }, 
                    function(response) 
                    {
                        console.log("Default filter: "+JSON.stringify(headerConfig));
                        updateHeader();
                    }
                );
        }

        function getParams() {
            var queries = window.location.search.replace(/^\?/, '').split('&');
            var searchObject = {};
            for(var i = 0; i < queries.length; i++ ) {
                var split = queries[i].split('=');
                searchObject[split[0]] = decodeURIComponent(split[1]);
            }
            var repo = searchObject['gitRepo'];
            var path = searchObject['gitPath'];
            var ref = searchObject['gitRef'];
            if (repo == null) {
                repo = 'mulesoft/api-console';
                path = 'dist/examples';
                ref = 'master';
            }
            var out = {repo: repo, path: path, ref: ref}; 
            console.log("gitParams=" + JSON.stringify(out));
            return out;
        }

        function querryString() {
            var querry = '?gitRepo='+ gitParams.repo;
            if(gitParams.path!=null) 
                querry+='&gitPath=' + gitParams.path;
            if(gitParams.ref!=null) 
                querry+='&gitRef=' + gitParams.ref;
            return querry;
        }
        function updateIframe() {
            $scope.ramlLocation = $sce.trustAsResourceUrl("./raml-designer-git-fs.html"+ querryString());
        }

        var gitParams = getParams();
        var headerConfig = { };
        getHeaderConfig(); 

    });


})(window.angular);
