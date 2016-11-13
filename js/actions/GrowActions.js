var AppDispatcher = require('../dispatcher/AppDispatcher');
var GrowConstants = require('../constants/GrowConstants');

var GrowActions = {
    getData: function(latitude, longitude) {
        AppDispatcher.dispatch({
            actionType: GrowConstants.GET_DATA,
            latitude: latitude,
            longitude: longitude
        });
    }
};

module.exports = GrowActions;
