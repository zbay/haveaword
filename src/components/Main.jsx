var React = require('react');
var axios = require('axios');
var Jumbotron = require("./StatelessUI/Jumbotron");
var Footer = require("./StatelessUI/Footer");
var ReactRedux = require('react-redux');
var actions = require("../actions");

var Main = React.createClass({
    render: function(){
        return (<div>
        <Jumbotron />
       {this.props.children}
       <Footer />
        </div>);
    }
});
module.exports = Main;