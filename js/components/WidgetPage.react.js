var React = require('react');
var LocationDataActions = require('../actions/LocationDataActions');
var LocationDataStore = require('../stores/LocationDataStore');
var LocationStore = require('../stores/LocationStore');

var GrowActions = require('../actions/GrowActions');

var LocationView = require('./LocationView.react');
var ClimateView = require('./ClimateView.react');
var Grow = require('./Grow.react');
var Recipe = require('./Recipe.react');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function getState() {
    return {
        locationData: LocationDataStore.getLocationData(),
        climateData: LocationDataStore.getClimateData(),
        widget: LocationDataStore.getWidget()
    };
}

var WidgetPage = React.createClass({

    _setWidget: function(w) {
        LocationDataActions.setWidget(w);
    },

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

    componentDidUpdate: function(prevProps, prevState) {
        var pData = prevState.locationData;
        var nData = this.state.locationData;
        if (Object.keys(pData).length === 0 && Object.keys(nData).length !== 0) {
console.log("UPDATING DAYA~!!!!!!!!!!!!!!!!!!!!!");
            var latitude = nData.GeoPosition.Latitude;
            var longitude = nData.GeoPosition.Longitude;
            GrowActions.getData(latitude, longitude);
        }
    },

    render: function() {
        var locationData = this.state.locationData;
        var climateData = this.state.climateData;
        var widget = this.state.widget;

        content = null;
        switch(widget) {
            case 1:
                content = <div> <LocationView data={locationData} /> <ClimateView data={climateData} /> </div>;
                break;
            case 2:
                content = <Grow data={locationData} />;
                break;
            case 3:
                content = <Recipe data={climateData} />;
                break;
            default:
        }
        /*
        var locations = this.state.locations;
        var locationViews = [];
        for (var i = 0; i < locations.length; ++i) {
            locationViews.push(<Button key={i} onClick={this._setSelectedLocation.bind(this, locations[i])}>{locations[i]["LocalizedName"]}</Button>);
        }
console.log(locations);
                <LocationView data={locationData} />
                <ClimateView data={climateData} />
                <Grow data={locationData} />
                <Recipe data={climateData} />}
*/
        return (
            <div className="widgetPage">
                <div className="imageTabs">
                    <div className="imageContainer"><img src="photos/climate.png" onClick={this._setWidget.bind(this, 1)} className="imageTab" /></div>
                    <div className="imageContainer"><img src="photos/nearby-location.png" onClick={this._setWidget.bind(this, 2)} className="imageTab" /></div>
                    <div className="imageContainer"><img src="photos/recipe.png" onClick={this._setWidget.bind(this, 3)} className="imageTab" /></div>
                </div>
                <div className="clear"></div>
                {content}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = WidgetPage;
