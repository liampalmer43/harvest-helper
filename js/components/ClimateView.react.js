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

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "-"];

var standard = {
six: ["Vine tomatoes", "lettuce", "kale", "broccoli", "asparagus", "eggplant"],
seven: ["Vine tomatoes", "lettuce", "kale", "broccoli", "asparagus", "spinach", "strawberries", "eggplant", "sweet peas", "pole beans", "winter squash", "red and white potatoes"],
eight: ["Tomatoes", "corn", "squash", "melons", "beans", "strawberries", "lettuce", "other greens"],
nine: ["Corn", "tomatoes", "melons", "squash", "collard greens", "carrots", "bush beans", "asparagus", "leafy greens"],
ten: ["Tomatoes", "melons", "squash", "corn", "peppers", "yams", "citrus", "peaches", "figs", "bananas", "salad greens", "sweet peas"],
eleven: ["kale", "okinawa spinach", "pole beans", "passionfruit", "sweet potato", "red potato", "cassava", "pineapple", "pumpkin", "mango", "papaya", "Thai chili peppers", "citrus", "bananas", "taro"]
};

function getCrops(range) {
    try {
        if (range >= 11) {
            return standard.eleven;
        } else if (range === 10) {
            return standard.ten;
        } else if (range === 9) {
            return standard.nine;
        } else if (range === 8) {
            return standard.eight;
        } else if (range === 7) {
            return standard.seven;
        } else {
            return standard.six;
        }
    } catch (err) {
        return [];
    }
}

function getPrecipitation(data) {
    try {
        var total = 0;
        for (var i = 0; i < 12; ++i) {
            total += data[i].Normals.Precipitation.Metric.Value;
        }
        return total;
    } catch (err) {
        return "unavailable";
    }
}

function getMin(data) {
    try {
        var min = 10000;
        for (var i = 0; i < 12; ++i) {
            var monthMin = data[i].Normals.Temperatures.Minimum.Metric.Value;
            if (monthMin < min) {
                min = monthMin;
            }
        }
        return min;
    } catch (err) {
        return "unavailable";
    }
}

function getMax(data) {
    try {
        var max = -10000;
        for (var i = 0; i < 12; ++i) {
            var monthMax = data[i].Normals.Temperatures.Maximum.Metric.Value;
            if (monthMax > max) {
                max = monthMax;
            }
        }
        return max;
    } catch (err) {
        return "unavailable";
    }
}

function getFirst(data) {
    try {
        for (var i = 0; i < 12; ++i) {
            if (data[i].Normals.Temperatures.Minimum.Metric.Value > 0) {
                return i;
            }
        }
        return 12;
    } catch (err) {
        return "unavailable";
    }
}

function getLast(data) {
    try {
        for (var i = 11; i >= 0; --i) {
            if (data[i].Normals.Temperatures.Minimum.Metric.Value > 0) {
                return i;
            }
        }
        return 12;
    } catch (err) {
        return "unavailable";
    }
}

var ClimateView = React.createClass({

    render: function() {
        var data = this.props.data;
        //var tagViews = [];
        //for (var i = 0; i < tags.length; ++i) {
        //    tagViews.push(<Badge key={i} className="tag" pullRight={true}>{tags[i]}</Badge>)
        //}
        if (data.length === 0) {
            return(<div className="climateView"><ProgressBar active now={100} /></div>);
        }
        var first = getFirst(data);
        var last = getLast(data);
        var firstMonth = first === "unavailable" ? "unavailable" : months[first];
        var lastMonth = last === "unavailable" ? "unavailable" : months[last];
        var length = 0;
        if (first !== "unavailable" && last !== "unavailable") {
            length = first <= 11 && last <= 11 ? last - first + 1 : 0;
        } else {
            length = "unavailable";
        }
        var max = getMax(data);
        var min = getMin(data);
        var range = 0;
        if (min !== "unavailable" && max !== "unavailable") {
            range = max - min;
        } else {
            reange = "unavailable";
        }
        var crops = getCrops(length);
        var precipitation = getPrecipitation(data);
        if (precipitation !== "unavailable") {
            precipitation += "mm";
        }

        var cropViews = [];
        for (var i = 0; i < crops.length; ++i) {
            cropViews.push(<Badge key={i} className="cropTag">{crops[i]}</Badge>)
        }
        return (
            <div className="climateView">
                <Panel header="Climate Allowances" bsStyle="info">
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <p>First Growing Month</p>
                            <p>Last Growing Month</p>
                            <p>Growing Season Length</p>
                            <p>Minimum Temperature</p>
                            <p>Maximum Temperature</p>
                            <p>Temperature Range</p>
                            <p>Yearly Precipitation</p>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <p>{firstMonth}</p>
                            <p>{lastMonth}</p>
                            <p>{length}</p>
                            <p>{min}</p>
                            <p>{max}</p>
                            <p>{range}</p>
                            <p>{precipitation}</p>
                        </Col>
                    </Row>
                    <p>Standard Crops</p>
                    {cropViews}
                </Panel>
            </div>
        );
    }
});

module.exports = ClimateView;
