var React = require('react');

module.exports = React.createClass({
    propTypes: {
        comments: React.PropTypes.array.isRequired
    },
    render: function(){
        return (
        <div id="commentList" className="container">
        {this.renderComments()}
        </div>);
    },
    renderComments: function(){
        if(this.props.comments.length <= 0){
            return (<span></span>);
        }
        else{
          return (this.props.comments.map(function(comment, index){
            return (<div className="comment"><span className="commentNumber">{index}. </span>{comment.text}</div>)
        }));   
        }
    }
});