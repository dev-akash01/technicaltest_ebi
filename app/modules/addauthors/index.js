'use strict';
// Home View
module.exports = angular.module('modules.addauthors', [])
	.directive('addauthorView', require('./addauthorDirective'))
    .directive('ebiAddAuthorForm', require('./components/addauthorform/addauthorform.directive'))
    .factory('AddauthorModel', require('./services/addauthorModel'))
    .controller('AddauthorCtrl', require('./addauthor.controller'))
    .config(require('./addauthorRoutes'));