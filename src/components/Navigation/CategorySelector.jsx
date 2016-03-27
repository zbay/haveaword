var React = require('react');
var HashHistory = require('react-router/lib/hashHistory');

module.exports = React.createClass({
    render: function(){
        return (<select id="catBrowse" onChange={this.onChange}>
            <option value="None">---</option>
            <option value="All">All</option>
            <option value="Favorites">My Favorites</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Feedback">Feedback/Comment</option>
            <option value="Technical">Technical</option>
            <option value="Miscellaneous">Other</option>
         </select>);
    },
    onChange: function(e){
        if(e.target.value !== "All"){
            if(e.target.value == "Favorites"){
                HashHistory.push("/favorites");
            }
            else{
               HashHistory.push("/category/" + e.target.value + "/1");      
            }
        }
        else{
            if(e.target.value !== "None"){
             HashHistory.push("/all/1");   
            }
        }
    }
});