import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Timeline from './components/timeline';
import PostDetails from './components/postDetails';

class App extends Component { 

    showNotFound(){
      return(
        <div>
          Página não encontrada :(
        </div>
      )
    }

    aboutPage(){
      const page = (
        <div>
          <h1>Sobre esse sistema</h1>
          <h3>Sou feito em REACT!</h3>
        </div>
      )
      return page;
    }
    render(){
      return(
        <div>
          <BrowserRouter>
            <Switch>
              <Route path='/post/:id' component={PostDetails} />
              <Route path='/sobre' component={this.aboutPage} />
              <Route exact path='/' component={Timeline}/>
              <Route path='*' component={this.showNotFound} />
            </Switch>
          </BrowserRouter>
          <p>Nao pode ter nada aqui</p>
        </div>
      )
    }
}

export default App;