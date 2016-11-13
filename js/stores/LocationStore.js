var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LocationConstants = require('../constants/LocationConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var locations = [];
var selectedLocation = {};

function getAccuLocations(text) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://apidev.accuweather.com/locations/v1/cities/autocomplete?apikey=PSUHackathon112016&q=" + text, true);
    xhr.onreadystatechange = function(e) {
        console.log(e);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            locations = response;
            LocationStore.emitChange();
        }
    }
    xhr.send();
}

function setSelectedAccuLocation(loc) {
    selectedLocation = loc;
    console.log(selectedLocation);
}

var LocationStore = assign({}, EventEmitter.prototype, {
    getLocations: function() {
        return locations;
    },

    getSelectedLocation: function() {
        return selectedLocation;
    },

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
        case LocationConstants.GET_LOCATIONS:
            getAccuLocations(action.text);
            break;
        case LocationConstants.SET_SELECTED_LOCATION:
            setSelectedAccuLocation(action.loc);
            break;
        default:
    }
});

module.exports = LocationStore;
