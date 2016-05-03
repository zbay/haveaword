//add password field, toggled by the radio selection. Password sent with creation request

var React = require('react');
var ReactRouter = require('react-router');
var BrowserHistory = require('react-router/lib/browserHistory');
var Link = ReactRouter.Link;
var axios = require("axios");
var FormAlert = require("../Alerts/FormAlert");

var NewRoomForm = React.createClass({
    getInitialState: function(){
      return {
          roomName: "",
          errorMessage: null,
          passwordFieldVisible: false,
          password: ""
      };  
    },
    render: function(){
        return (<form onSubmit={this.makeRoom}>
            <FormAlert errorMessage={this.state.errorMessage}/>
            <label>Make a new chatroom: </label> <input placeholder="A unique name" name="roomName" value={this.state.roomName} onChange={this.onChange}/>
            <br /><br />
            <label>Password protected?</label> <input type="radio" name="passwordProtected" value="true" onClick={this.togglePasswordField}/> Yes
            <input type="radio" name="passwordProtected" value="false" onClick={this.togglePasswordField} defaultChecked/> No
            <br />
            {this.state.passwordFieldVisible ? 
            (<div><label>Password: </label><input name="password" type="password" value={this.state.password} onChange={this.onChange}/></div>): (<span></span>)}
            <br /><br />
            <label>When should this room be deleted?</label>
            <select name="duration" id="durationSelector">
                <option value="day" defaultValue>Tomorrow</option>
                <option value="week">In a week</option>
                <option value="month">In a month</option>
                <option value="indefinite">Preferably never</option>
            </select>
            <br /><br />
            <button type="submit">Create Chatroom</button>
        </form>);
    },
    makeRoom: function(e){
        e.preventDefault();
        var radios = document.getElementsByName('passwordProtected');
        let that = this;
        if(radios[0].checked){
             axios.post("/newRoom", {roomName: that.state.roomName.trim().substr(0, 150), password: that.state.password, 
            duration: document.getElementById("durationSelector").value
        }).then(function(response){
            if(response.data.error){
                that.setState({errorMessage: response.data.error});
            }
            else{
                BrowserHistory.push("/chat/new/" + response.data.returnID);
            }
        });       
        }
        else{
            axios.post("/newRoom", {roomName: that.state.roomName.trim().substr(0, 150), duration: document.getElementById("durationSelector").value
        }).then(function(response){
            if(response.data.error){
                that.setState({errorMessage: response.data.error});
            }
            else{
                BrowserHistory.push("/chat/new/" + response.data.returnID);
            }
        });
        }
    },
    onChange: function(e){
        var state = {};
        state[e.target.name] =  e.target.value;
        this.setState(state);
    },
    togglePasswordField: function(){
        console.log("toggling pw");
        let that = this;
        that.setState({passwordFieldVisible: !that.state.passwordFieldVisible});
    }
});

module.exports = NewRoomForm;