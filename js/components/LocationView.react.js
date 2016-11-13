var React = require('react');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Image = require('react-bootstrap/lib/Image');
var Panel = require('react-bootstrap/lib/Panel');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Badge = require('react-bootstrap/lib/Badge');
var Panel = require('react-bootstrap/lib/Panel');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');

var LocationView = React.createClass({

    render: function() {
        var data = this.props.data;
        //var tagViews = [];
        //for (var i = 0; i < tags.length; ++i) {
        //    tagViews.push(<Badge key={i} className="tag" pullRight={true}>{tags[i]}</Badge>)
        //}
        if (Object.keys(data).length === 0) {
            return(<div className="locationView"><ProgressBar active now={100} /></div>);
        } 

        return (
            <div className="locationView">
                <Panel header={data.EnglishName} bsStyle="info">
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <p>Country</p>
                            <p>Region</p>
                            <p>Latitude</p>
                            <p>Longitude</p>
                            <p>Elevation</p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <p>{data.Country.EnglishName}</p>
                            <p>{data.Region.EnglishName}</p>
                            <p>{data.GeoPosition.Latitude}</p>
                            <p>{data.GeoPosition.Longitude}</p>
                            <p>{data.GeoPosition.Elevation.Metric.Value + data.GeoPosition.Elevation.Metric.Unit}</p>
                        </Col>
                    </Row>
                </Panel>
            </div>
        );
    }

});

module.exports = LocationView;
