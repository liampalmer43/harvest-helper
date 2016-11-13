var AppDispatcher = require('../dispatcher/AppDispatcher');
var GrowConstants = require('../constants/GrowConstants');

var GrowActions = {
    getData: function() {
        AppDispatcher.dispatch({
            actionType: GrowConstants.GET_DATA
        });
    }
};

module.exports = GrowActions;
