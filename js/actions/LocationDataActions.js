var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocationDataConstants = require('../constants/LocationDataConstants');

var LocationDataActions = {
    getLocationData: function(key) {
        AppDispatcher.dispatch({
            actionType: LocationDataConstants.GET_LOCATION_DATA,
            key: key
        });
    },
    setWidget: function(w) {
        AppDispatcher.dispatch({
            actionType: LocationDataConstants.SET_WIDGET,
            widget: w
        });
    },
};

module.exports = LocationDataActions;
