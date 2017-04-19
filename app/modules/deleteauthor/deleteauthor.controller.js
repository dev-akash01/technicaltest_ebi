'use strict';
/*

@ Requires $scope, $state, AddauthorModel, CONSTANTS, AlertsManager

Description: Controller has following functionalities:
1. Delete Author.
2. Prevent delete author not present in authors array.

*/
// Controller naming conventions should start with an uppercase letter
function DeleteauthorCtrl($scope, $state, $timeout, DeleteAuthorModel, CONSTANTS, AlertsManager) {
  /// Authors array. [{firstName: author first name, lastname: author lastname, affiliations: [author affiliations]}]
  $scope.authors = [];
  /// Affiliations array. [{affName: affilation name, affId: affiliation id}]
  $scope.affiliations = [];
  $scope.titleObj = '';
  //model objects
  $scope.affiliationObj = {
    affId: '',
    affName: ''
  };
  $scope.inputObject = {
    firstName: '',
    lastName: '',
    affiliations: []
  };
  //// Initialize and set data
  function init() {
    AlertsManager.clearAlerts();
    var _lsfirstName = localStorage.getItem('firstName');
    var _lslastName = localStorage.getItem('lastName');
    if (_lsfirstName !== null) {
      $scope.inputObject.firstName = _lsfirstName;
    }
    if (_lslastName !== null) {
      $scope.inputObject.lastName = _lslastName;
    }
    DeleteAuthorModel.getjsondata().then(function(data) {
      $scope.authors = data.data.authors;
      $scope.dataAvailabale = true;
      $scope.affiliations = data.data.affiliations;
      $scope.titleObj = data.data.title;
    }, function() {});
    $scope.alerts = AlertsManager.alerts;
  }
  init();
  // Setting local storage
  $scope.getValues = function() {
    if ($scope.inputObject.firstName !== '') {
      localStorage.setItem('firstName', $scope.inputObject.firstName);
    }
    if ($scope.inputObject.lastName !== '') {
      localStorage.setItem('lastName', $scope.inputObject.lastName);
    }
  };
  //// Service call success alert
  $scope.serviceSuccess = function(alertMessage) {
    AlertsManager.addAlert(alertMessage, 'alert-success');
    $timeout(function() {
      AlertsManager.clearAlerts();
      $state.transitionTo('home');
    }, 4000);
  };
  //// Generic alerts
  $scope.genericAlerts = function(alertMessage, alertType) {
    AlertsManager.addAlert(alertMessage, alertType);
  };
  //// Resets the input fields
  function resetInput() {
    $scope.affiliationObj = {
      affId: '',
      affname: ''
    };
    $scope.inputObject = {
      firstName: '',
      lastName: '',
      affiliations: []
    };
  }
  /// cancel and return to home
  $scope.cancel = function() {
    $state.transitionTo('home');
  };
  // Function to set updated object and make a service call to delete author
  function deleteAuthorinJson(alertMessage, titleObj, updateAuthors, updateAffiliations) {
    $scope.updateObj = {};
    $scope.authorupdated = false;
    var alertMessagetext = alertMessage;
    $scope.updateObj = {
      'title': titleObj,
      'authors': updateAuthors,
      'affiliations': updateAffiliations
    };
    DeleteAuthorModel.deleteAuthorToJson($scope.updateObj).then(function() {
      $scope.authorupdated = true;
      $scope.serviceSuccess(alertMessagetext);
      localStorage.clear();
    }, function() {
      $scope.genericAlerts(CONSTANTS.deleteAuthor.error, 'alert-danger');
      $scope.authorupdated = false;
    });
  }
  // Main function for object manupulation and passing the updated object
  $scope.deletedata = function() {
    AlertsManager.clearAlerts();
    var currentFirstName = $scope.inputObject.firstName;
    var currentLastName = $scope.inputObject.lastName;
    var authorlength = $scope.authors.length;
    if (authorlength > 0) {
      var objtoRemove = _.remove($scope.authors, {
        firstName: currentFirstName,
        lastName: currentLastName
      });
      if (objtoRemove.length > 0) {
        deleteAuthorinJson(CONSTANTS.deleteAuthor.deleted, $scope.titleObj, $scope.authors, $scope.affiliations);
        resetInput();
      } else {
        $scope.genericAlerts(CONSTANTS.deleteAuthor.doesnotexists, 'alert-info');
      }
    }
  }
}
// $inject is necessary for minification. 
DeleteauthorCtrl.$inject = ['$scope', '$state', '$timeout', 'DeleteAuthorModel', 'CONSTANTS', 'AlertsManager'];
module.exports = DeleteauthorCtrl;