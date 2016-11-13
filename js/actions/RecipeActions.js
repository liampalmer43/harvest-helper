var AppDispatcher = require('../dispatcher/AppDispatcher');
var RecipeConstants = require('../constants/RecipeConstants');

var RecipeActions = {
    getData: function(params) {
        AppDispatcher.dispatch({
            actionType: RecipeConstants.GET_RECIPE_DATA,
            ingredients: params
        });
    }
};

module.exports = RecipeActions;
