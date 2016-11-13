var React = require('react');
var GrowActions = require('../actions/GrowActions');
var GrowStore = require('../stores/GrowStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');

function compare(a,b) {
  	if (a.distance < b.distance) {
    	return -1;
	}
  	if (a.distance > b.distance) {
    	return 1;
	}
  	return 0;
}

function getState() {
    return {
        userData: GrowStore.getState()
    };
}

var Grow = React.createClass({

    getInitialState: function() {
        console.log("getting initial state");
        console.log(getState());
        return getState();
    },

    componentDidMount: function() {
        GrowStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        GrowStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var users = this.state.userData;
        if (users.length === 0) {
            return(<div className="locationView"><ProgressBar active now={100} /></div>);
        } 
		users.sort(compare);
        var locationViews = [];
        for (var i = 0; i < users.length; ++i) {
            locationViews.push(
								<div className="growItem" key={i}>
									<p className="distanceParagraph">Distance: <span className="distanceSpan">{users[i].distance}</span> miles</p>
									<p className="growItemParagraph">{"Name: " + users[i].name}</p>
									<p className="growItemParagraph">{"Location: " + users[i].location}</p>
									<p className="growItemParagraph">{"Latitude: " + users[i].latitude}</p>
									<p className="growItemParagraph">{"Longitude: " + users[i].longitude}</p>
									<p className="growItemParagraph">{"Description: " + users[i].description}</p>
									<p className="growItemParagraph">{"Sunniness: " + users[i].sunniness}</p>
									<p className="growItemParagraph">{"Planted from: " + users[i].planted_from}</p>
									<a  className="growItemParagraph" href={users[i].url} target="_blank">Visit original posting.</a>
								</div>);
        }
console.log(users);
console.log("-------");
console.log(users.length);

        return (
            <div className="growWidget">
				{locationViews}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Grow;
