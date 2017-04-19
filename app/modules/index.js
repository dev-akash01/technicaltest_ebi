'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./addauthors').name,
        require('./deleteauthor').name
    ])
    .controller('MainCtrl', require('./MainController'));