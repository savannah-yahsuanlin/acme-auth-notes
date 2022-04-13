import React from 'react';
import { connect } from 'react-redux';
import { logout } from './store';
import { Link } from 'react-router-dom';


const Home = ({ auth, logout, notes })=> {
	let itsNotes = notes.filter(ele => ele.user.username === auth.username).length
  return (
    <div>
      Welcome { auth.username }
      <button onClick={ logout }>Logout</button>
      <div>
        You have added { itsNotes } notes.
        <br />
        <Link to='/notes'>Access and Add Notes</Link>
      </div>
    </div>
  );
};

const mapState = state => state;
const mapDispatch = (dispatch)=> {
  return {
    logout: ()=> {
      return dispatch(logout());
    }
  }
}


export default connect(mapState, mapDispatch)(Home);
