'use strict';

var ebiAddAuthorForm = function() {
    return {
        template: require('./addauthorform.html'),
        restrict: 'EA',
        scope:{
        	inputObject: "=",
        	affiliationObj: "="
        },
        controller: ['$scope', function($scope) {

        }]
    };
};

ebiAddAuthorForm.$inject = [];
module.exports = ebiAddAuthorForm;