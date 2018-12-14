import React, {Component} from 'react';
import Post from './post';
import PostCreator from './postCreator';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
class Timeline extends Component { 
    constructor(){
      super();
      this.state = {
        posts: [],
        loading: false
      }
    }

    componentDidMount(){
      console.log('App did mount');
      // this.readFromStorage();
      this.readFromAPI(); 
    }


    insertPost(post){
      const myPosts = this.state.posts;
      myPosts.unshift(post);
      this.setState({posts: myPosts});
      this.saveInStorage();
    }

    saveInAPI(post){
      this.setState({loading: true});
      axios.post('http://localhost:3001/posts', post).then(response => {
        const myPosts = this.state.posts;
        myPosts.unshift(response.data);
        this.setState({posts: myPosts, loading: false});
      })
    }

    readFromStorage(){
      const savedPosts = localStorage.getItem('savedPosts');
      if(savedPosts){
        this.setState({posts: JSON.parse(savedPosts)});
      }
    }

    readFromAPI(){
      axios.get('http://localhost:3001/posts').then(response => {
        this.setState({posts: response.data});
      })
    }

    saveInStorage(){
      const posts = JSON.stringify(this.state.posts);
      localStorage.setItem('savedPosts', posts);
      
    }

    onNavigate(post){
      this.props.history.push('/post/' + post.id);
    }

    render(){
      console.log(this.props);
      return(
        <div>
          <h1>Minhaf rede social</h1>
          <PostCreator isLoading={this.state.loading}
          onCreate={this.saveInAPI.bind(this)} />
          <button
           onClick={
            ()=>this.props.history.push('/sobre')
           } 
          >Ver sobre</button>
          {this.state.posts.length > 0 
          ? this.state.posts.map((post,i) => {
            return (
              <Post 
              onNavigate={() => this.onNavigate(post)}
              key={post.time} 
              post={post}/>
            )
          })
            : <CircularProgress />            
          }
      
        </div>
      )
    }
}

export default Timeline;