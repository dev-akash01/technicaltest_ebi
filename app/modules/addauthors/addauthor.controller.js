'use strict';
/*

@ Requires $scope, $state, AddauthorModel, CONSTANTS, AlertsManager

Description: Controller has following functionalities:

1. Add update page Title.
2. Add a new Author.
3. Add a new Affiliations
4. Add a new Author to an existing Affiliation
5. Add an Author without any affiliation
6. Prevent duplicate entries.

*/
// Controller naming conventions should start with an uppercase letter
function AddauthorCtrl($scope, $state, $timeout, AddauthorModel, CONSTANTS, AlertsManager) {
  $scope.disableTitle = true;
  /// Authors array. [{firstName: author first name, lastname: author lastname, affiliations: [author affiliations]}]
  $scope.authors = [];
  /// Affiliations array. [{affName: affilation name, affId: affiliation id}]
  $scope.affiliations = [];
  $scope.titleObj = '';
  $scope.updatetitlechecked = false;
  $scope.newAuthor = true;
  $scope.newAffliation = true;
  $scope.newAffIdInAuthor = true;
  $scope.tempTitle = '';
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
    var _lsaffName = localStorage.getItem('affName');
    if (_lsfirstName !== null) {
      $scope.inputObject.firstName = _lsfirstName;
    }
    if (_lslastName !== null) {
      $scope.inputObject.lastName = _lslastName;
    }
    if (_lsaffName !== null) {
      $scope.affiliationObj.affName = _lsaffName;
    }
    AddauthorModel.getjsondata().then(function(data) {
      $scope.authors = data.data.authors;
      $scope.affiliations = data.data.affiliations;
      $scope.titleObj = data.data.title;
      $scope.tempTitle = data.data.title;
      $scope.dataAvailabale = true;
    }, function() {});
    $scope.alerts = AlertsManager.alerts;
  }
  init();
  //// Service call success alert
  $scope.serviceSuccess = function(alertMessage) {
    AlertsManager.addAlert(alertMessage, 'alert-success');
    $timeout(function() {
      AlertsManager.clearAlerts();
      $state.transitionTo('home');
    }, 3000);
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
  // Setting local storage
  $scope.getValues = function() {
    if ($scope.inputObject.firstName !== '') {
      localStorage.setItem('firstName', $scope.inputObject.firstName);
    }
    if ($scope.inputObject.lastName !== '') {
      localStorage.setItem('lastName', $scope.inputObject.lastName);
    }
    if ($scope.affiliationObj.affName !== '') {
      localStorage.setItem('affName', $scope.affiliationObj.affName);
    }
  };
  /// Checks if the update tile checkbox is checked and enable and disable the title input field.
  $scope.titlechange = function(check) {
    if (check) {
      $scope.disableTitle = false;
    } else {
      $scope.disableTitle = true;
      if ($scope.titleObj === '' || $scope.titleObj === undefined) {
        $scope.titleObj = $scope.tempTitle;
      }
    }
  };
  /// cancel and return to home
  $scope.cancel = function() {
    $state.transitionTo('home');
  };
  // Function to set updated object and make a a service call
  function addAuthorToJson(alertMessage, titleObj, updateAuthors, updateAffiliations) {
    $scope.updateObj = {};
    $scope.authorupdated = false;
    var alertMessagetext = alertMessage;
    $scope.updateObj = {
      'title': titleObj,
      'authors': updateAuthors,
      'affiliations': updateAffiliations
    };
    AddauthorModel.addAuthorToJson($scope.updateObj).then(function() {
      $scope.authorupdated = true;
      $scope.serviceSuccess(alertMessagetext);
      localStorage.clear();
    }, function() {
      $scope.genericAlerts(CONSTANTS.addAuthor.errorMessage, 'alert-danger');
      $scope.authorupdated = false;
    });
  }
  // Main function to do object manupulation and logic
  $scope.saveData = function() {
    AlertsManager.clearAlerts();
    $scope.onlyauthoradded = false;
    $scope.authorandaffadded = false;
    $scope.affiliationAdded = false;
    $scope.validSubmit = true;
    // check if title is blank
    if ($scope.titleObj === '' || $scope.titleObj === undefined || $scope.titleObj === null) {
      $scope.genericAlerts(CONSTANTS.addAuthor.titleMandatory, 'alert-info');
      $scope.validSubmit = false;
      return;
    }
    // check if author name is blank
    if (($scope.inputObject.firstName || $scope.inputObject.lastName) === '') {
      $scope.genericAlerts(CONSTANTS.addAuthor.authorEmpty, 'alert-info');
      $scope.validSubmit = false;
      return;
    }
    // factory constructor for auto incrmenting the affiliation id's 
    function MyObjectFactory() {
      this.nextId = $scope.affiliations.length + 1;
    }
    // factory method to create an object to push in Affiliations array
    MyObjectFactory.prototype.createObject = function(name) {
      return {
        affId: this.nextId++,
        affName: name
      };
    };
    var myFactory = new MyObjectFactory();
    var obj = {};
    var affliationLen = $scope.affiliations.length;
    var authorLen = $scope.authors.length;
    // If there are more than 0 authors and Affiliations
    if (affliationLen > 0 && authorLen > 0) {
      var authorExists = false;
      // loop on authors array
      for (var i = 0; i < authorLen; i++) {
        // check if author exists
        if ($scope.authors[i].firstName === $scope.inputObject.firstName && $scope.authors[i].lastName === $scope.inputObject.lastName) {
          authorExists = true;
          var affiliationExists = false;
          // loop on affiliations array
          for (var j = 0; j < affliationLen; j++) {
            // check if affiliation name exists in affiliations array
            if ($scope.affiliations[j].affName === $scope.affiliationObj.affName) {
              var tempId;
              tempId = $scope.affiliations[j].affId;
              affiliationExists = true;
              // check if affiliation id exists in authors affiliations array
              if ($scope.authors[i].affiliations.indexOf(tempId) === -1) {
                $scope.authors[i].affiliations.push(tempId);
                $scope.affiliationAdded = true;
              } else {
                $scope.genericAlerts(CONSTANTS.addAuthor.authorAffiliation, 'alert-info');
                $scope.validSubmit = false;
                return;
              };
            }
          }
          // if affiliations does not exists create one
          if (affiliationExists === false) {
            if ($scope.affiliationObj.affName !== '') {
              obj = myFactory.createObject($scope.affiliationObj.affName);
              $scope.affiliations.push(obj);
              $scope.authors[i].affiliations.push(obj.affId);
              $scope.affiliationAdded = true;
            }
          }
        }
      }
      // incase of new author
      var addAuthorAffIdCheck = function() {
        var affiliationExists = false;
        //check if affiliation name exists in affiliations array
        for (var i = 0; i < affliationLen; i++) {
          if ($scope.affiliations[i].affName === $scope.affiliationObj.affName) {
            affiliationExists = true;
            $scope.inputObject.affiliations.push($scope.affiliations[i].affId);
            $scope.authors.push($scope.inputObject);
            return;
          } else {
            affiliationExists = false;
          }
        }
        // if affiliations does not exists create one
        if (affiliationExists === false) {
          if ($scope.affiliationObj.affName !== '') {
            obj = myFactory.createObject($scope.affiliationObj.affName);
            //push the affiliation in affilaitions array
            $scope.affiliations.push(obj);
            $scope.inputObject.affiliations.push(obj.affId);
            $scope.affiliationAdded = true;
          } else {
            $scope.affiliationAdded = false;
          }
        }
        // push the final object in authors array.
        $scope.authors.push($scope.inputObject);
      };
      if (authorExists === false) {
        addAuthorAffIdCheck();
      }
    } else {
      // incase of first author
      if ($scope.affiliationObj.affName !== '') {
        obj = myFactory.createObject($scope.affiliationObj.affName);
        $scope.affiliations.push(obj);
        $scope.inputObject.affiliations.push(obj.affId);
      } else {
        $scope.authors.push($scope.inputObject);
      }
    }
    var globalalertMessage = '';
    if ($scope.affiliationAdded) {
      globalalertMessage = CONSTANTS.addAuthor.successMessage;
    } else {
      globalalertMessage = CONSTANTS.addAuthor.authorAdded;
    }
    if ($scope.validSubmit === true) {
      addAuthorToJson(globalalertMessage, $scope.titleObj, $scope.authors, $scope.affiliations);
    }
    resetInput();
  }
}
// $inject is necessary for minification.
AddauthorCtrl.$inject = ['$scope', '$state', '$timeout', 'AddauthorModel', 'CONSTANTS', 'AlertsManager'];
module.exports = AddauthorCtrl;