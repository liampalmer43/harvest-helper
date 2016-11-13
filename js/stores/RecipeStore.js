var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RecipeConstants = require('../constants/RecipeConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var state = [];
var ingredients = [];


function getData() {
	var ingredientsList = "";
	for (var i = 0; i < ingredients.length; i++) {
		ingredientsList = ingredientsList + ingredients[i] + ",";
	}
	console.log(ingredientsList);
	var apiKey = "ff7292cfee0629470b7ca214e6655e0e";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://food2fork.com/api/search?key=" + apiKey + "&q=" + ingredientsList, true);
	xhr.onreadystatechange = function(e) {
        console.log(e);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
			console.log("-----");
			console.log(response);
			console.log(response.length);
            state = response;
            RecipeStore.emitChange();
        }
    }
    xhr.send();
}

var RecipeStore = assign({}, EventEmitter.prototype, {
    getState: function() {
        return state;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case RecipeConstants.GET_RECIPE_DATA:
            ingredients = action.ingredients;
            getData();
            break;
        default:
    }
});

module.exports = RecipeStore;
