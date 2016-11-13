var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationConstants = require('../constants/LocationConstants');

var LocationActions = {
    getLocations: function(text) {
        AppDispatcher.dispatch({
            actionType: LocationConstants.GET_LOCATIONS,
            text: text
        });
    },
    setSelectedLocation: function(loc) {
        AppDispatcher.dispatch({
            actionType: LocationConstants.SET_SELECTED_LOCATION,
            loc: loc
        });
    }
};

module.exports = LocationActions;
