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
var About = require("./components/StatelessContent/About");

var ChatWrapper = React.createClass({
    render: function(){
        return (<ChatRoomWrapper roomID={encodeURIComponent(this.props.routeParams.id)} />);
    }
});

module.exports = (
  <Router history={BrowserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="chat/:id" component={ChatWrapper}/>
      <Route path="*" status={404} component={BadLink}/>
    </Route>
  </Router>
);