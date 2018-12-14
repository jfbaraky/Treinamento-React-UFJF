import React, {Component}from 'react';
import Post from './post';
import axios from 'axios';
class PostDetails extends Component {
    constructor(){
        super();
        this.state = {
            post: null
        }
    }

    componentDidMount(){
        // const posts = JSON.parse(localStorage.getItem('savedPosts'));
        // const post = posts.filter(savedPost => {
        //     return savedPost.time == this.props.match.params.time;
        // }).pop();
        // this.setState({post});
        const id = this.props.match.params.id;
        axios.get('http://localhost:3001/posts/' + id).then(response => {
            this.setState({post: response.data});
        }).catch(error => {
            this.setState({loading: false, errorMessage: 'Confira sua internet'})
        })
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
                    {this.state.errorMessage 
                    && <p>{this.state.errorMessage}</p>
                    }
                </div>
            ) 
        }
        
    }
}
export default PostDetails;