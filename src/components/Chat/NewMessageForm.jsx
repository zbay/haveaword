var React = require('react');

var NewMessageForm = React.createClass({
    getInitialState: function(){
      return {"text": ""}  
    },
    componentWillMount: function(){
        this.checkPrivate();
    },
    render: function(){
        let that = this;
        return (<div>
        <label>New message: </label>
        <input name="message" value={that.state.name} onChange={that.onChange}/>
        <button onClick={that.sendMessage} >Post</button>
        </div>);
    },
    sendMessage: function(){
        let that = this;
        if(that.state.name.length > 0){
            that.props.postMessage(that.state.name);   
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = NewMessageForm;