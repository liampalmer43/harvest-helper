var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LocationDataConstants = require('../constants/LocationDataConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var locationData = {};
var climateData = [];
var widget = 1;

function setWidget(num) {
    widget = num;
    LocationDataStore.emitChange(); 
}

function getAccuLocationData(key) {
    getLocationData(key);
    getClimateData(key, [], 1);
}

function getLocationData(key) {
    var xhr = new XMLHttpRequest();
    var url = "http://apidev.accuweather.com/locations/v1/" + key + ".json?apikey=PSUHackathon112016";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(e) {
        console.log(e);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log("LOCATION DATA");
            console.log(response);
            locationData = response;
            LocationDataStore.emitChange();
        }
    }
    xhr.send();
}

function getClimateData(key, values, month) {
    if (month > 12) {
        console.log("ALL API CALLS DONE");
        console.log(climateData);
        climateData = values;
        LocationDataStore.emitChange();
        return;
    }
    console.log("Making api call for month: " + month);
    var xhr = new XMLHttpRequest();
    var monthText = month < 10 ? "0" + month : month;
    var url = "http://apidev.accuweather.com/climo/v1/summary/2015/" + monthText + "/" + key + "?apikey=PSUHackathon112016";
    //var url = "https://apidev.accuweather.com/climo/v1/actuals/" + key + "?start=2015/01/01&end=2015/12/31&apikey=PSUHackathon112016";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(e) {
        console.log(e);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var newValues = values;
            newValues.push(response);
            console.log("CLIMAGE DATA");
            console.log(response);
            getClimateData(key, newValues, month+1);
            //locations = response;
            //LocationStore.emitChange();
        }
    }
    xhr.send();
}

var LocationDataStore = assign({}, EventEmitter.prototype, {
    getWidget: function() {
        return widget;
    },

    getLocationData: function() {
        return locationData;
    },

    getClimateData: function() {
        return climateData;
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
        case LocationDataConstants.GET_LOCATION_DATA:
            getAccuLocationData(action.key);
            break;
        case LocationDataConstants.SET_WIDGET:
            setWidget(action.widget);
            break;
        default:
    }
});

module.exports = LocationDataStore;
