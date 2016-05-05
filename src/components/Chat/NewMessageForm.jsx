var React = require('react');

var NewMessageForm = React.createClass({
    getInitialState: function(){
      return {"text": ""}  
    },
    render: function(){
        let that = this;
        return (<div>
        <label>New message: </label>
        <br />
        <div>Note that chat messages support the <a href="http://assemble.io/docs/Cheatsheet-Markdown.html" target="_blank">markdown language</a> for styling.</div>
        <br />
        <textarea rows="2" name="text" value={that.state.text} onChange={that.onChange}/>
        <br /><br />
        <button onClick={that.sendMessage} >Post</button>
        </div>);
    },
    sendMessage: function(){
        let that = this;
        if(that.state.text.length > 0){
            let tempText = that.state.text;
            that.props.postMessage(tempText.trim().substr(0, 2000));   
            that.setState({"text": ""});
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = NewMessageForm;