'use strict';

// Filenames for Constants are always UPPERCASE
// As many files for constants as you require (ex: USER_ROLES, NOTIFICATIONS, etc)
module.exports = angular.module('common.constants', [])
    .constant('CONSTANTS', require('./CONSTANTS'));