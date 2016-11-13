var React = require('react');
var LocationDataActions = require('../actions/LocationDataActions');
var LocationDataStore = require('../stores/LocationDataStore');
var LocationStore = require('../stores/LocationStore');

var LocationView = require('./LocationView.react');
var ClimateView = require('./ClimateView.react');
var Grow = require('./Grow.react');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function getState() {
    return {
        locationData: LocationDataStore.getLocationData(),
        climateData: LocationDataStore.getClimateData()
    };
}

var WidgetPage = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        LocationDataStore.addChangeListener(this._onChange);
        var key = LocationStore.getSelectedLocation()["Key"];
        LocationDataActions.getLocationData(key);
    },

    componentWillUnmount: function() {
        LocationDataStore.removeChangeListener(this._onChange);
    },


    render: function() {
        var locationData = this.state.locationData;
        var climateData = this.state.climateData;
        console.log("LOOGGGGKJGKJGKGJ");
        console.log(locationData);
        console.log(climateData);
        /*
        var locations = this.state.locations;
        var locationViews = [];
        for (var i = 0; i < locations.length; ++i) {
            locationViews.push(<Button key={i} onClick={this._setSelectedLocation.bind(this, locations[i])}>{locations[i]["LocalizedName"]}</Button>);
        }
console.log(locations);
*/
        return (
            <div>AAAAA
                <LocationView data={locationData} />
                <ClimateView data={climateData} />
                <Grow data={locationData} />}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = WidgetPage;
