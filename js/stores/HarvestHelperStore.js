var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var HarvestHelperConstants = require('../constants/HarvestHelperConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var state = HarvestHelperConstants.LOCATION_SEARCH;
var location = {};

function setState(newState) {
    if (state !== newState) {
        state = newState;
        HarvestHelperStore.emitChange();
    }
}

function setLocation(newLocation) {
    location = newLocation;
    HarvestHelperStore.emitChange();
}

var HarvestHelperStore = assign({}, EventEmitter.prototype, {

    getState: function() {
        return state;
    },

    getLocationL function() {
        return location;
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
        case HarvestHelperConstants.SET_LOCATION:
            //update(action.state);
            break;
        default:
    }
});

module.exports = HarvestHelperStore;
