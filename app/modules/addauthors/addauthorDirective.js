'use strict';

module.exports = function addauthorDirective() {
    return {
        controller: 'AddauthorCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./addauthor.html')
    };
};