'use strict';

var CONSTANTS = (function() {
    return {
        key: 'value',
     	addAuthor: {
     		successMessage: 'Author and affiliation added sccessfully',
     		errorMessage: 'Someting went wrong! Please try again later',
            authorExits: 'Entered author already exists.',
            authorAffiliation: 'Entered affiliation already associated with author',
            authorAdded: 'Author added successfully',
            authorEmpty: 'Please enter Author details',
            titleMandatory: 'Title is mandatory',
            emptyFeilds: 'Please fill the empty field(s)'
     	},
        deleteAuthor:{
            deleted: "Author delete successfully",
            doesnotexists: "Entered author does not exists in authors list",
            error: 'Someting went wrong! Please try again later'
        },

        services: {
        	jsonApiEnd: 'https://api.myjson.com/bins/jf0zr'
        }
    };
}());

CONSTANTS.$inject = [];
module.exports = CONSTANTS;