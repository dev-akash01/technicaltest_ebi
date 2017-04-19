'use strict';
// Home View
module.exports = angular.module('modules.deleteauthor', [])
		.directive('deleteauthorView', require('./deleteauthorDirective'))
  	    .directive('ebiDeleteAuthorForm', require('./components/deleteauthorform/deleteauthorform.directive'))
        .factory('DeleteAuthorModel', require('./services/deleteauthorModel'))
        .controller('DeleteauthorCtrl', require('./deleteauthor.controller'))
        .config(require('./deleteauthorRoutes'));