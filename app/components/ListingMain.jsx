/**
 * @jsx React.DOM
 */

var React = require('react');
var AppgridList = require('./AppgridList.jsx');
var ContentList = require('./ContentList.jsx');
var ListingActions = require('../actions/ListingActions');
var ListingStore = require('../stores/ListingStore');

var ListingMain = React.createClass({

    handleChange: function (e) {
        console.log(e);
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        ListingActions.getContentList("SONYLIV");
    },

    _onChange: function () {
        this.setState({
            contents: ListingStore.getContentList("SONYLIV")
        });
    },

    componentWillMount: function () {
        ListingStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        ListingStore.removeChangeListener(this._onChange);
    },

    render: function() {
        console.log('Listing main render');
        console.log(this.state.contents);
        if(this.state.contents) {
            return (
                <div className="ContentBox">
                    <ContentList data={this.state.contents} />
                </div>
            );
        }
        else{
            return (
                <div className="ContentBox"> </div>
            );
        }
    }
});

module.exports = ListingMain;