var React = require('react');
var axios = require("axios");
var FormAlert = require("../Alerts/FormAlert");

var PasswordForm = React.createClass({
    getInitialState: function(){
      return {"password": null, "errorMessage": null}  
    },
    render: function(){
        let that = this;
        return (<div id="passwordForm">
        <FormAlert errorMessage={this.state.errorMessage}/>
        <label>Type password for {that.props.roomID}: </label>
        <input name="password" type="password" value={that.state.name} onChange={that.onChange}/>
        <button onClick={that.attemptLogin}>Post</button>
        </div>);
    },
    attemptLogin: function(){
        let that = this;
        if(that.state.password && that.state.password.length > 0){
        axios.post("/login", {roomID: that.props.roomID, password: that.state.password}).then(function(response){
            if(response.data.success){
                that.props.setVisible();
            }
            else{
                that.setState({"errorMessage": response.data.error});
            }
        });   
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    }
});

module.exports = PasswordForm;