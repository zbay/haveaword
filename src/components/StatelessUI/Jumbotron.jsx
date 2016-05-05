var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
module.exports = React.createClass({
    render: function(){
        return (<div className="jumbotron container-fluid">
        <h1 id="haveawordLogo"><Link to="https://haveaword-zbay.c9users.io/">
        <span className="redText">Have</span><span className="yellowText">_</span><span className="redText">A</span>
        <span className="yellowText">_</span>
        <span className="redText">Word</span>
        </Link></h1>
        <h2 className="whiteText">Ad hoc chat room service</h2>
        </div>);
    }
});