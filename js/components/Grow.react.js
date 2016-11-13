var React = require('react');
var GrowActions = require('../actions/GrowActions');
var GrowStore = require('../stores/GrowStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function getState() {
    return {
        userData: GrowStore.getState()
    };
}

var Grow = React.createClass({

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
        GrowStore.addChangeListener(this._onChange);
		GrowActions.getData();
    },

    componentWillUnmount: function() {
        GrowStore.removeChangeListener(this._onChange);
    },


    render: function() {
        var users = this.state.userData;
        var locationViews = [];
        for (var i = 0; i < users.length; ++i) {
            locationViews.push(<div key={i}>
									<p>{"Name: " + users[i].name}</p>
									<p>{"Location: " + users[i].location}</p>
									<p>{"Latitude: " + users[i].latitude}</p>
									<p>{"Longitude: " + users[i].longitude}</p>
									<p>{"Description: " + users[i].description}</p>
									<p>{"Sunniness: " + users[i].sunniness}</p>
									<p>{"Planted from: " + users[i].planted_from}</p>
									<a>{"URL: " + users[i].url}</a>
								</div>);
        }
console.log(users);
console.log("-------");
console.log(users.length);

        return (
            <div>
				{locationViews}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Grow;
