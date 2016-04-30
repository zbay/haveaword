// Resume from this: http://spraso.com/real-time-data-flow-with-redux-and-socket-io/
var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router/lib/browserHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import { Provider } from 'react-redux';
import { createStore } from 'redux';
var Store = require("./store");

var Main = require("./components/Main");
var Home = require("./components/StatelessContent/Home");
var ChatRoom = require("./components/Chat/ChatRoom");
var BadLink = require("./components/StatelessContent/BadLink");

var ChatWrapper = React.createClass({
    render: function(){
        return (<ChatRoom roomID={this.props.routeParams.id} />);
    }
});
var ChatNewWrapper = React.createClass({
    render: function(){
        return (<ChatRoom roomID={this.props.routeParams.id} topMessage="Welcome to your new chat room! Make sure to save the link, if you plan on using
        this one again before it expires."/>);
    }
});

module.exports = (
  <Provider store={Store}>
  <Router history={BrowserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="chat/:id" component={ChatWrapper}/>
      <Route path="chat/new/:id" component={ChatNewWrapper} />
      <Route path="*" status={404} component={BadLink}/>
    </Route>
  </Router>
  </Provider>
);