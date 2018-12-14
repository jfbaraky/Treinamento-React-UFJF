import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LikeIcon from '@material-ui/icons/ThumbUp'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import "../post.css";

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: props.post.initialLikes
        }
        this.doLike = this.doLike.bind(this);
        this.saveLikesInAPI = this.saveLikesInAPI.bind(this);
    }
    doLike(){
        this.setState({likes: this.state.likes + 1},()=>{
            console.log("after")
            console.log("doLike state",this.state);
            this.saveLikesInStorage();
        });
    }
    saveLikesInAPI(){
        const post = this.props.post;
        post.initialLikes = this.state.likes + 1;
        axios.put('http://localhost:3001/posts/' + post.id, post).then(response => {
            this.setState({likes: this.state.likes + 1});
        })
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
            <Card style={{margin: 10}}>
            <CardContent>
            <Avatar >{post.author.slice(0,2).toUpperCase()}</Avatar>
                <Typography 
                    variant="h5" 
                    component="h2"
                onClick={()=>this.props.onNavigate()} 
                  style={{cursor:'pointer'}}
                  >
                  
                {post.content}
                </Typography>
                <Typography 
                    color="textSecondary"
                    variant="h5" 
                    component="h5">
                    {post.author}
                    </Typography>
                <small>{post.time}</small>
                </CardContent>
                <CardActions>
                <div style={likeLine}>
                    <p>Likes: {this.state.likes}</p>
        
                    <IconButton onClick={this.saveLikesInAPI}>
                        <LikeIcon fontSize="large" />
                    </IconButton>
                </div>
                </CardActions>
            </Card>
        )
    }
}

const likeLine={
    'display': 'flex',
    'justifyContent': 'space-around',
    'height': 40
};

export default Post;