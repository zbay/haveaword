// Resume from this: http://spraso.com/real-time-data-flow-with-redux-and-socket-io/
var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router/lib/browserHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require("./components/Main");
var ChatRoomWrapper = require("./components/Chat/ChatRoomWrapper");
var Home = require("./components/Home/Home");
var BadLink = require("./components/StatelessContent/BadLink");

var ChatWrapper = React.createClass({
    render: function(){
        return (<ChatRoomWrapper roomID={this.props.routeParams.id} />);
    }
});
var ChatNewWrapper = React.createClass({
    render: function(){
        return (<ChatRoomWrapper roomID={this.props.routeParams.id} topMessage="Welcome to your new chat room! Make sure to save the link, if you plan on using
        this one again before it expires."/>);
    }
});

module.exports = (
  <Router history={BrowserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="chat/:id" component={ChatWrapper}/>
      <Route path="chat/new/:id" component={ChatNewWrapper} />
      <Route path="*" status={404} component={BadLink}/>
    </Route>
  </Router>
);