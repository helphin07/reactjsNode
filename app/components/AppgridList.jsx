/**
 * @jsx React.DOM
 */

 var React = require('react');

 /*Fetch Appgrid content */
 var AppgridList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    console.log('configuration');
    $.get('/config/appgrid.json', function(result) {
      console.log(result);
      var collection = typeof result !== 'undefined' ? result : result;
      if (this.isMounted()) {
        this.setState({data: collection[0].title});
      }
    }.bind(this));
  },
  render: function() {
    return (
      <h2>{this.state.data}</h2>
      );
  }
});

 module.exports=AppgridList;