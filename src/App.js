import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin, logout, fetchNotes} from './store';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Notes from './Notes';
import SignIn from './SignIn';


class App extends React.Component{

  componentDidMount(){
    this.props.attemptLogin();
	this.props.load()
  }
  render(){
    const { auth, notes} = this.props;
    if(!auth.id){
      return (
        <Switch>
          <Route path='/signin' component={ SignIn } />
          <Redirect to='/signin'/>
        </Switch>
      );
    }
    else {
      return (
        <Switch>
          <Route path='/home' component={ Home } />
          <Route path='/notes' component={ Notes } />
          <Redirect to='/home' />
        </Switch>
      );
    }
  }
}

const mapState = (state) => {
	return state
}

const mapDispatch = (dispatch)=> {
  return {
    attemptLogin: () => {
      return dispatch(attemptLogin());
    },
	load: () => {
		return dispatch(fetchNotes())
	}
  }
}

export default connect(mapState, mapDispatch)(App);
