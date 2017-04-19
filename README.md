# Technical test - Problem 1

# Answer 1:

****************************************************
Basic Techology Stack consumed - 
Nodejs,
Gulp,
Browserify,
AngularJS,
Bootstrap,
RequireJS,
ESlint,
loadash,
myjson api
****************************************************

The app is capable of the following:

1. Enter title of the paper. (at ad author page)
2. Add an author.
3. Add an affiliation.
4. Associating authors with their corresponding affiliations.
5. Reorder authors (WIP)
6. Delete an Author.
7. Save the current information.

The project scaffolding has been done in an order to provide scalability. Files are grouped structurally (each section of the app being self contained with its own styles, views, controllers, and directives). The scaffolding is as following:

```
/app
--- /common
------ /components (should contain common directives)
------ /constants
------ /elements (common page elements like footer and header)
------ /interceptors
------ /services
------ /styles
------ common.js (common module requirements)
------ common.less
--- /modules
------ index.js
------ MainController.js
------ modules.less
------ /module1 (addauthors)
--------- /services
----------- module specific services
--------- /components
----------- module specific components(directives)
--------- index.js (module definition - sub-modules)
--------- module.html
--------- module.less
--------- ModuleController.js
--------- moduleDirective.js
--------- moduleRoutes.js (route definitions and config options)
---localjson/Datajson.json (The json format used in project)
--- app.js
--- app.less
--- appConfig.js (main config file - no routes are defined here)
--- index.html
/dist (this is the gulp pipeline file output destination)
/libs (bower components install here)
/node_modules (npm installations go here)
```

### Setup Instructions

*NOTE:* This app assumes that bower (http://bower.io/) and gulp (http://gulpjs.com/) installed locally. If don't, then please run the following command first: ```npm install -g bower gulp```

1) Node Modules and Bower Components are not included in this repository. Please run the following command in terminal: ```npm install``` after cloning or pulling changes from this repository.

Bower dependencies should install automatically at the end of the NPM install process. If the dependencies don't install correctly you may need to manually run ```bower install``` as well.

2) Once everything is installed all you have to do is run ```gulp build``` and your new server will be running at ```http://localhost:5000``` (you can edit the port in the gulpFile). To speed up gulp times, the standard ```gulp``` task does not include copying over static files. Using the standard ```gulp``` task will be useful for most cases, but if you need to rebuild the whole ```dist``` folder, use ```gulp build```.


### Development, Test, Production, and Deployment
DEV: During development you should be using the standard ```gulp-dev``` task (unless you need to rebuild your dist files, at which point you can run ```gulp build```).

TEST: ```gulp test``` Karma is included in the package but not used.

PROD: ```gulp prod``` to run the production build pipeline, which will minify and concatenate your files. Production files are still sent to the ```/dist``` folder.

# Answer 2:
The interface can be test as following flow:

1. Check for data availabality. Prompt user in case data is unavailable.
2. Add and author - Verify adding duplicate Author.
3. Add affiliation -  Verify adding duplicate Affiliation.
4. Verify error handling.

Also, the testing can be performed manually as well as it can be automated writing test cases.

# Answer 3:

In case of thousands or more than thousands author following are the problems can be seen:
The solution provided in Answer 1 can handle large data because of its scalible structure. However, there were limitations while mocking the backend data. Since myjson api provides GET POST and PUT methods, there were no custom post methods which can be used.

General problems with large data - 
- Data managment. 
- Performance impact.
- User Experiance impact.
- Data association.
- Delay in response.

Solutions: 
- Modified or custom backend service api.
- Pagination
- Reducing number of service calls
- Setting an offset with every page call when pagination is implemented.

It may require a change in interface in case of large data:

- Adding Pagination.
- Adding Options Search by author || affiliations. 
- Adding auto complete with input fields. 
- Adding filters.
