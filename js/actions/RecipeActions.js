var AppDispatcher = require('../dispatcher/AppDispatcher');
var RecipeConstants = require('../constants/RecipeConstants');

var RecipeActions = {
    getData: function() {
		console.log("aha;slakf");
        AppDispatcher.dispatch({
            actionType: RecipeConstants.GET_DATA
        });
    }
};

module.exports = RecipeActions;
