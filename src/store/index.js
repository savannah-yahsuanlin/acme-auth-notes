import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};

const logout = ()=> {
  window.localStorage.removeItem('token');
  return {
    type: 'SET_AUTH',
    auth: {}
  };
};

const signIn = (credentials)=> {
  return async(dispatch)=> {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    return dispatch(attemptLogin());
  }
};
const attemptLogin = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  }
}

const SET_NOTES = 'SET_NOTES'
const CREATE_NOTE = 'CREATE_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const SET_USER_NOTES = 'SET_AUTHOR_NOTES'

const _setNotes = (notes) => {
	return {
		type: SET_NOTES,
		notes
	}
}

const _createNote = (note) => {
	return {
		type: CREATE_NOTE,
		note
	}
}

const _deleteNote = (note) => {
	return {
		type: DELETE_NOTE,
		note
	}
}


const fetchNotes = () => {
	return async(dispatch) => {
		const {data: notes} = await axios.get(`/api/notes`)
		dispatch(_setNotes(notes))
	}
}

const createNote = (note) => {
	return async(dispatch) => {
		const {data: created} = await axios.post('/api/notes', note)
		dispatch(_createNote(created))
	}
}

const deleteNote = (id) => {
	return async(dispatch) => {
		await axios.delete(`/api/notes/${id}`)
		dispatch(_deleteNote(note))
	}
}

const fetchUserNotes = () => {
	return async(dispatch) => {
 		const user = (await axios.get(`/api/users/${id}/notes`)).data
		dispatch(_setUserNotes(user))
	}
}

const notes = (state = [], action)=> {
	if(action.type === SET_NOTES) {
		state = action.notes
	}
	if(action.type === CREATE_NOTE) {
		state = [...state, action.note]
	}
	if(action.type === DELETE_NOTE) {
		state = state.filter((note) => note.id !== action.note.id)
	}
  return state;
};


const store = createStore(
  combineReducers({
    auth,
    notes
  }),
  applyMiddleware(thunk, logger)
);

export { attemptLogin, signIn, logout, fetchNotes, createNote, deleteNote, fetchUserNotes };

export default store;
