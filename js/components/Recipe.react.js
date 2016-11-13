var React = require('react');
var RecipeActions = require('../actions/RecipeActions');
var RecipeStore = require('../stores/RecipeStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function getState() {
    return {
        recipeData: RecipeStore.getState()
    };
}

var Recipe = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        RecipeStore.addChangeListener(this._onChange);
		RecipeActions.getData();
    },

    componentWillUnmount: function() {
        RecipeStore.removeChangeListener(this._onChange);
    },

    render: function() {
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
            <div className="growWidget">
				{recipeViews}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Recipe;
