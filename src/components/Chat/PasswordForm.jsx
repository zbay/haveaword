var React = require('react');
var axios = require("axios");
var FormAlert = require("../Alerts/FormAlert");

var PasswordForm = React.createClass({
    getInitialState: function(){
      return {"password": null, "errorMessage": null}  
    },
    render: function(){
        let that = this;
        // http://simpleicon.com/wp-content/uploads/lock-2.png
        return (<div id="passwordForm">
        <img src="../img/lock.png" width="200"/>
        <br />
        <FormAlert errorMessage={this.state.errorMessage}/>
        <br />
        <label>Type password for "{that.props.roomID}": </label>
        <br />
        <input name="password" type="password" value={that.state.name} onChange={that.onChange}/>
        <br /><br />
        <button onClick={that.attemptLogin}>Sign In</button>
        <br /><br />
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