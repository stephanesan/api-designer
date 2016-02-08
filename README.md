# api-designer console for oic api.

A graphical, web based tool from [MuleSoft] (https://www.mulesoft.com/platform/api/api-designer) that is adapted to syncs with OIC's [IoTDataModels]  (https://github.com/OpenInterConnect/IoTDataModels) to document the APIs in a human friendly interactive console and makes it easy to engage fellow application developers.

API Designer is a standalone/embeddable editor for RAML (RESTful API Modeling Language) written in JavaScript using Angular.JS. By default, the editor uses an in-browser filesystem stored in HTML5 Localstorage. This version has been modified to pull content directly from github.

## Usage

The console has also been modified to take some parameters from the query string.
Currently supported keys are:
* 'gitRepo' : The path to the repo which is constructed as :owner/:repo. 
  * Example: OpenInterConnect/IoTDataModels
* 'gitPath' : the content path under which the content will be pulled recursively (usually empty).
  * Example: .
* 'gitRef' : The name of the commit/branch/tag. Default: the repository’s default branch (usually master).
  * Example: OIC-Release-1.0.0

## Resulting examples:
* [The OIC's data model OIC-Release-1.0.0 version] (https://cdn.rawgit.com/stephanesan/api-designer/master/raml-designer-4-git.html?gitRepo=OpenInterConnect/IoTDataModels&gitRef=OIC-Release-1.0.0).
```
https://cdn.rawgit.com/stephanesan/api-designer/master/raml-designer-4-git.html?gitRepo=OpenInterConnect/IoTDataModels&gitRef=OIC-Release-1.0.0
```
* [The latest (master) OIC data model] (https://cdn.rawgit.com/stephanesan/api-designer/master/raml-designer-4-git.html?gitRepo=OpenInterConnect/IoTDataModels).
```
https://cdn.rawgit.com/stephanesan/api-designer/master/raml-designer-4-git.html?gitRepo=OpenInterConnect/IoTDataModels
```
* Some [example raml] (https://cdn.rawgit.com/stephanesan/api-designer/master/raml-designer-4-git.html?gitRepo=mulesoft/api-console&gitPath=dist/examples) files hosted under the 'mulesoft/api-console' repo at the 'dist/examples' path.
```
https://cdn.rawgit.com/stephanesan/api-designer/master/raml-designer-4-git.html?gitRepo=mulesoft/api-console&gitPath=dist/examples
```
## License
[CPAL-1.0] (https://opensource.org/licenses/CPAL-1.0)
