var React = require('react');
var RecipeActions = require('../actions/RecipeActions');
var RecipeStore = require('../stores/RecipeStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Form = require('react-bootstrap/lib/Form');
var Checkbox = require('react-bootstrap/lib/Checkbox');

function getFeasibleCrops(data) {
    var first = getFirst(data);
    var last = getLast(data);
    var length = 0;
    if (first !== "unavailable" && last !== "unavailable") {
        length = first <= 11 && last <= 11 ? last - first + 1 : 0;
    } else {
        length = "unavailable";
    }
    return getCrops(length);
}

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

function getState() {
    return {
        recipeData: RecipeStore.getState()
    };
}

var Recipe = React.createClass({

    _getRecipes: function() {
        var opts = document.getElementsByClassName("recipeOption");
        console.log(opts);
        var params = [];
        for (var i = 0; i < opts.length; ++i) {
            console.log(opts[i].checked);
            if (opts[i].checked) {
                params.push(opts[i].value);
            }
        }
        console.log(params);
	    RecipeActions.getData(params);
    },

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        RecipeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RecipeStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var options = getFeasibleCrops(this.props.data);
        var optionViews = [];
        for (var i = 0; i < options.length; ++i) {
            optionViews.push(<div><label><input key={i} type="checkbox" className="recipeOption" value={options[i]}></input>{options[i]}</label></div>);
        }

        var data = this.state.recipeData;
		console.log(data);
		var recipes = data.recipes;
        var recipeViews = [];
		if (typeof recipes !== "undefined") {
        	for (var i = 0; i < recipes.length; ++i) {
            	recipeViews.push(
								<div className="growItem" key={i}>
									<p className="distanceParagraph">{recipes[i].title}</p>
									<p className="growItemParagraph">{"Social Rank: " + Math.floor(recipes[i].social_rank) + "/100"}</p>
									<a className="paragraphCenter" href={recipes[i].source_url} target="_blank">Source URL</a>
									<img className="recipeImage" src={recipes[i].image_url} alt="Recipe Photo"/>
								</div>);
        	}
		}

        return (
            <div>
                <Form horizontal className="recipeForm">{optionViews}<Button bsStyle="primary" onClick={this._getRecipes}>Find Recipes</Button></Form>
				<div className="recipeWidget">{recipeViews}</div>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Recipe;
