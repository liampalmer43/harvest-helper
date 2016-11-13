var React = require('react');

var Button = require('react-bootstrap/lib/Button');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var MenuItem = require('./MenuItem.react');

var Header = React.createClass({

    render: function() {
        return (
            <div className="header">
                Harvest Helper - Create your home garden
            </div>
        );
    }
});

module.exports = Header;
