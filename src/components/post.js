import React, {Component} from 'react';
import "../post.css";

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: props.post.initialLikes
        }
        this.doLike = this.doLike.bind(this);
    }
    doLike(){
        this.setState({likes: this.state.likes + 1},()=>{
            console.log("after")
            console.log("doLike state",this.state);
            this.saveLikesInStorage();
        });
    }
    saveLikesInStorage(){
        const posts = JSON.parse(localStorage.getItem('savedPosts'));
        const updatePosts = posts.map(savedPost => {
             if(savedPost.time === this.props.post.time){
                savedPost.initialLikes = this.state.likes;
             }
             return savedPost;
        });
        localStorage.setItem('savedPosts', JSON.stringify(updatePosts))        
        console.table(updatePosts);
    }
    render(){
        const post = this.props.post;
        console.log(this.props);
        return(
            <div className={"post"}>
                <h3 
                  onClick={()=>this.props.onNavigate()} 
                  style={{cursor:'pointer'}}
                  >
                {post.content}
                </h3>
                <h5>{post.author}</h5>
                <small>{post.time}</small>
                <div style={likeLine}>
                    <p>Likes: {this.state.likes}</p>
                    <button 
                        onClick={this.doLike}
                        style={{
                            'backgroundColor':'blue',
                            'color': 'white',
                            'fontSize': 16,
                            'fontWeight': 'bolder',
                            'border': 'none',
                            'borderRadius': 10,
                            'padding':5
                        }}
                    >Like</button>
                </div>
            </div>
        )
    }
}

const likeLine={
    'display': 'flex',
    'justifyContent': 'space-around',
    'height': 40
};

export default Post;