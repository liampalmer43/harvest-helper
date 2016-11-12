var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationConstants = require('../constants/LocationConstants');

var LocationActions = {
    getLocations: function(text) {
        AppDispatcher.dispatch({
            actionType: LocationConstants.GET_LOCATIONS,
            text: text
        });
    }
};

module.exports = LocationActions;
