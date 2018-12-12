import React, {Component} from 'react';
import Post from './post';
import PostCreator from './postCreator';

class Timeline extends Component { 
    constructor(){
      super();
      this.state = {
        posts: []
      }
    }

    componentDidMount(){
      console.log('App did mount');
      this.readFromStorage();
    }


    insertPost(post){
      const myPosts = this.state.posts;
      myPosts.unshift(post);
      this.setState({posts: myPosts});
      this.saveInStorage();
    }

    readFromStorage(){
      const savedPosts = localStorage.getItem('savedPosts');
      if(savedPosts){
        this.setState({posts: JSON.parse(savedPosts)});
      }
    }

    saveInStorage(){
      const posts = JSON.stringify(this.state.posts);
      localStorage.setItem('savedPosts', posts);
      
    }

    onNavigate(post){
      this.props.history.push('/post/' + post.time);
    }

    render(){
      console.log(this.props);
      return(
        <div>
          <h1>Minhaf rede social</h1>
          <PostCreator onCreate={this.insertPost.bind(this)} />
          <button
           onClick={
            ()=>this.props.history.push('/sobre')
           } 
          >Ver sobre</button>
          {this.state.posts.map((post,i) => {
            return (
              <Post 
              onNavigate={() => this.onNavigate(post)}
              key={post.time} 
              post={post}/>
            )
          })}
      
        </div>
      )
    }
}

export default Timeline;