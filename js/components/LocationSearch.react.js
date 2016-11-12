var React = require('react');
var LocationActions = require('../actions/LocationActions');
var LocationStore = require('../stores/LocationStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function getState() {
    return {
        locations: LocationStore.getLocations(),
        selectedLocation: LocationStore.getSelectedLocation()
    };
}

var LocationSearch = React.createClass({

    _getLocations: function(e) {
        if (e.keyCode === 13) {
            var text = document.getElementById("search").value;
            LocationActions.getLocations(text);
        }
    },

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        LocationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        LocationStore.removeChangeListener(this._onChange);
    },


    render: function() {
        var locations = this.state.locations;
        var locationViews = [];
        for (var i = 0; i < locations.length; ++i) {
            locationViews.push(<p key={i}>{locations[i]["LocalizedName"]}</p>);
        }
console.log(locations);

        return (
            <div className="locationSearch">
                <div className="locationSearchHeading">
                    <div className="locationSearchTitle">Search</div>
                </div>
                <Row>
                    <Col xs={6} xsOffset={3} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3} className="searchContainer">
                        <input id="search" type="text" placeholder="Enter Location" className="locationSearchInput" onKeyDown={this._getLocations}></input>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}> </Col>
                </Row>
                {locationViews}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = LocationSearch;
