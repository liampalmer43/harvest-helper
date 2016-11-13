var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GrowConstants = require('../constants/GrowConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var state = [];
var latitude = -1;
var longitude = -1;

function toRad(x) {
   return x * Math.PI / 180;
}

function getCrop(userObject, plantObject, url) {

	var lat1 = latitude;
	var lon1 = longitude;
	var lat2 = userObject.latitude;
	var lon2 = userObject.longitude;

	//var R = 6371e3; // metres
	var R = 6371*0.621371; //miles
	var φ1 = toRad(lat1);
	var φ2 = toRad(lat2);
	var Δφ = toRad(lat2-lat1);
	var Δλ = toRad(lon2-lon1);

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	d = Math.floor(d);

	var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.growstuff.org/crops/" + plantObject.crop_id + ".json", true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);

			var dataObject = {name: response.name,
								distance: d,
								location: userObject.location,
								latitude: userObject.latitude,
								longitude: userObject.longitude,
								url: url,
								description: plantObject.description,
								sunniness: plantObject.sunniness,
								planted_from: plantObject.planted_from};
            state.push(dataObject);
            GrowStore.emitChange();
        }
    }
	xhr.send();
}

function getPlantings(userObject) {
	var xhr = new XMLHttpRequest();
	var url = "http://www.growstuff.org/plantings/owner/" + userObject.slug;
    xhr.open("GET", url + ".json", true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            for (var i = 0; i < response.length; i++) {
                var plantObject = response[i];
            	getCrop(userObject, plantObject, url);
			}
        }
    }
	xhr.send();
}

function getData() {
console.log("GET DATA_____________________________");
console.log("");
console.log("");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.growstuff.org/places.json", true);
//    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
	xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
console.log(response);
			for (var i = 0; i < response.length; i++) {
				var userObject = response[i];
				if (userObject.latitude - latitude < 5 && userObject.latitude - latitude > -5 && userObject.longitude - longitude < 5 && userObject.longitude - longitude > -5) {
					getPlantings(userObject);				
				} 
			}
            //state = response;
            //GrowStore.emitChange();
        } else {
            console.log("WHATATA");
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
            latitude = action.latitude;
            longitude = action.longitude;
            getData();
            break;
        default:
    }
});

module.exports = GrowStore;
