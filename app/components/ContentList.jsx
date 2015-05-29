/**
 * @jsx React.DOM
 */

var React = require('react');
var imageShackUrl = "https://ooyala.imageshack.com/200x145/";
/* Render content list view */
var ContentList = React.createClass({
    render: function() {
        var itemNodes = this.props.data.map(function(item, index) {
            return (
                <div className="content" key={index}>
                    <a className="itemname" href={"#itemdetails/"+item.id} >
                        <img src={imageShackUrl+item.images.portrait.url}  />
                    </a>
                    <a className="itemname" href={"#itemdetails/"+item.id}> {item.title} </a>
                </div>
                );
        });
        return (
            <div className="contentList"> {itemNodes} </div>
            );
    }
});


module.exports=ContentList;