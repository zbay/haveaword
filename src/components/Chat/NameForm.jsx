var React = require('react');

var NameForm = React.createClass({
    getInitialState: function(){
      return {"name": "anonymous"}  
    },
    componentWillMount: function(){
        this.checkPrivate();
    },
    render: function(){
        let that = this;
        return (<div>
        <label>Name to use: </label>
        <input name="name" value={that.state.name} onChange={that.onChange}/>
        <button onClick={that.sendName} >Submit</button>
        </div>);
    },
    postMessage: function(text){
        let that = this;
        
    },
    sendName: function(){
        let that = this;
        if(that.state.name.length > 0){
            that.props.setName(that.state.name);   
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = NameForm;