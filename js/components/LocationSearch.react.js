var React = require('react');
var LocationActions = require('../actions/LocationActions');
var NavigationActions = require('../actions/NavigationActions');
var NavigationConstants = require('../constants/NavigationConstants');
var LocationStore = require('../stores/LocationStore');

var Button = require('react-bootstrap/lib/Button');
var Navbar = require('react-bootstrap/lib/Navbar');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

function getState() {
    return {
        locations: LocationStore.getLocations(),
        selectedLocation: LocationStore.getSelectedLocation()
    };
}

var LocationSearch = React.createClass({

    _getLocations: function() {
        var text = document.getElementById("searchLocation").value;
        LocationActions.getLocations(text);
    },

    _setSelectedLocation: function(loc) {
        console.log("SETTING");
        console.log(loc);
        LocationActions.setSelectedLocation(loc);
        NavigationActions.update(NavigationConstants.WIDGET_PAGE);
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

/*
                <div className="locationSearchHeading">
                    <div className="locationSearchTitle">Search</div>
                </div>
                <Row>
                    <Col xs={6} xsOffset={3} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3} className="searchContainer">
                        <input id="search" type="text" placeholder="Enter Location" className="locationSearchInput" onKeyDown={this._getLocations}></input>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}> </Col>
                </Row>
*/

    render: function() {
        var locations = this.state.locations;
        var locationViews = [];
        for (var i = 0; i < locations.length; ++i) {
            var name = locations[i]["LocalizedName"];
            var country = locations[i]["Country"]["LocalizedName"];
            locationViews.push(<ListGroupItem key={i} onClick={this._setSelectedLocation.bind(this, locations[i])}>{name + ", " + country}</ListGroupItem>);
        }
console.log(locations);

        return (
            <div className="locationSearch">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>Location:</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search" onInput={this._getLocations} id="searchLocation"/>
                            </FormGroup>
                            {' '}
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                <ListGroup className="locationViews">{locationViews}</ListGroup>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = LocationSearch;
