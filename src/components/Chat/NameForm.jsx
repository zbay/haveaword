var React = require('react');

var NameForm = React.createClass({
    getInitialState: function(){
      return {"name": "anonymous"}  
    },
    render: function(){
        let that = this;
        return (<div>
        <label>Name to use: </label>&nbsp;<span id="unsaved"></span>
        <br />
        <input name="name" value={that.state.name} onChange={that.onChange} id="nameInput"/>
        <br /><br />
        <button onClick={that.sendName} >Save</button>
        </div>);
    },
    postMessage: function(text){
        let that = this;
        
    },
    sendName: function(){
        let that = this;
        if(that.state.name.length > 0){
            that.props.setName(that.state.name);   
            document.getElementById("nameInput").className = "";
            document.getElementById("unsaved").innerHTML = "";
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        document.getElementById("nameInput").className = "redText";
        document.getElementById("unsaved").innerHTML = "(unsaved)";
        this.setState(state);
    }
});

module.exports = NameForm;