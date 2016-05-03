var React = require('react');

var NewMessageForm = React.createClass({
    getInitialState: function(){
      return {"text": ""}  
    },
    render: function(){
        let that = this;
        return (<div>
        <label>New message: </label>
        <input name="text" value={that.state.text} onChange={that.onChange}/>
        <button onClick={that.sendMessage} >Post</button>
        </div>);
    },
    sendMessage: function(){
        let that = this;
        if(that.state.text.length > 0){
            that.props.postMessage(that.state.text);   
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = NewMessageForm;