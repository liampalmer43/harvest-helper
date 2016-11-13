var LocationSearch = require('./LocationSearch.react');
var WidgetPage = require('./WidgetPage.react');

var React = require('react');
var NavigationStore = require('../stores/NavigationStore');
var NavigationConstants = require('../constants/NavigationConstants');

function getState() {
    return {
        websiteState: NavigationStore.getState()
    };
}

var Harvest = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        NavigationStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        NavigationStore.removeChangeListener(this._onChange);
    },

    render: function() {
        content = <LocationSearch />;
        switch(this.state.websiteState) {
            case NavigationConstants.LOCATION_SEARCH:
                content = <LocationSearch />;
                break;
            case NavigationConstants.WIDGET_PAGE:
                content = <WidgetPage />;
                break;
            default:
        }
        
        return (
            <div>
                {content}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Harvest;
