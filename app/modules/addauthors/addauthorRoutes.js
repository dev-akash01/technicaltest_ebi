'use strict';

function addauthorRoutes($stateProvider) {
    var addauthor = {
        name: 'addauthor', // state name
        url: '/', // url path that activates this state
        template: '<div addauthor-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'addauthor', // assign a page-specific class to the <body> tag
            pageTitle: 'Add an Author', // set the title in the <head> section of the index.html file
            pageDescription: 'Add an Author' // meta description in <head>
        }
    };

    $stateProvider.state(addauthor);

}

addauthorRoutes.$inject = ['$stateProvider'];
module.exports = addauthorRoutes;