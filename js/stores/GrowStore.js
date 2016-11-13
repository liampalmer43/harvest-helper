var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GrowConstants = require('../constants/GrowConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var state = [];
var latitude = 35;
var longitude = -90;

function getCrop(userObject, plantObject, url) {
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.growstuff.org/crops/" + plantObject.crop_id + ".json", true);
    xhr.onreadystatechange = function(e) {
        console.log(e);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);

			var dataObject = {name: response.name,
								location: userObject.location,
								latitude: userObject.latitude,
								longitude: userObject.longitude,
								url: url,
								description: plantObject.description,
								sunniness: plantObject.sunniness,
								planted_from: plantObject.planted_from};

			console.log(response);
            state.push(dataObject);
            GrowStore.emitChange();
        }
    }
	xhr.send();
}

function getPlantings(userObject) {
	var xhr = new XMLHttpRequest();
	var url = "http://www.growstuff.org/plantings/owner/" + userObject.slug + ".json";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(e) {
        console.log(e);
		console.log("--------------------!!!---");
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
			console.log(response);
			console.log(response.length + "heyyyyyy");
            for (var i = 0; i < response.length; i++) {
                var plantObject = response[i];
            	getCrop(userObject, plantObject, url);
			}
        }
    }
	xhr.send();
}

function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.growstuff.org/places.json", true);
//    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
	xhr.onreadystatechange = function(e) {
        console.log(e);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
			console.log("-----");
			console.log(response);
			console.log(response.length);
			for (var i = 0; i < response.length; i++) {
				var userObject = response[i];
				if (userObject.latitude - latitude < 5 && userObject.latitude - latitude > -5 && userObject.longitude - longitude < 5 && userObject.longitude - longitude > -5) {
					getPlantings(userObject);				
				} 
			}
            //state = response;
            //GrowStore.emitChange();
        }
    }
    xhr.send();
}

var GrowStore = assign({}, EventEmitter.prototype, {
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
        case GrowConstants.GET_DATA:
            getData();
            break;
        default:
    }
});

module.exports = GrowStore;
