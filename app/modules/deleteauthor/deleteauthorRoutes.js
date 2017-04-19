'use strict';

function deleteauthorRoutes($stateProvider) {
    var deleteauthor = {
        name: 'deleteauthor', // state name
        url: '/', // url path that activates this state
        template: '<div deleteauthor-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'deleteauthor', // assign a page-specific class to the <body> tag
            pageTitle: 'Delete an Author', // set the title in the <head> section of the index.html file
            pageDescription: 'Delete an Author' // meta description in <head>
        }
    };

    $stateProvider.state(deleteauthor);

}

deleteauthorRoutes.$inject = ['$stateProvider'];
module.exports = deleteauthorRoutes;