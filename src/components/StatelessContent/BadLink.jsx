var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function(){
        return (<div className="container">
        <div id="fourohfour" className="row">
        <div className="col-sm-12 redText">
        Error 404: File not found! <Link to="/">Click here for the home page</Link>.
        </div></div><br/></div>);
    }
});