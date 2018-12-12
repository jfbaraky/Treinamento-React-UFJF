import React, {Component}from 'react';
import Post from './post';
class PostDetails extends Component {
    constructor(){
        super();
        this.state = {
            post: null
        }
    }

    componentDidMount(){
        const posts = JSON.parse(localStorage.getItem('savedPosts'));
        const post = posts.filter(savedPost => {
            return savedPost.time == this.props.match.params.time;
        }).pop();
        this.setState({post});
    }

    render(){
        console.log(this.props);
        console.log(this.state);
        if(this.state.post === null){
            return (<div>Loding</div>)
        } else {
            return(
                <div>
                    <Post post={this.state.post} />
                </div>
            ) 
        }
        
    }
}
export default PostDetails;