'use strict';

var ebiDeleteAuthorForm = function() {
    return {
        template: require('./deleteauthorform.html'),
        restrict: 'EA',
        scope:{
        	inputObject: "=",
        	affiliationObj: "=",
            change: '=?'
        },
        controller: ['$scope', function($scope) {

        }]
    };
};

ebiDeleteAuthorForm.$inject = [];
module.exports = ebiDeleteAuthorForm;