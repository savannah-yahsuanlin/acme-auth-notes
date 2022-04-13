import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotes, attemptLogin, deleteNote, createNote } from './store';

class Notes extends Component {
	constructor() {
		super()
		this.state = {
			userId: '',
			username: '',
			text: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		this.props.attemptLogin();
		this.props.load()
		this.props.foo()
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.createNote({ ...this.state });
	}

	handleChange(e) {
		const change = {}
		change[e.target.name] = e.target.value
		this.setState(change)
	}

	render() {
		const { auth, notes, foo} = this.props;
		const { handleSubmit, handleChange } = this
		const { text, userId, username } = this.state
		const itsNotes = notes.filter(ele => ele.user.username === auth.username)
		return (
			<div>
			<Link to='/home'>Home</Link>
			<div>
				TODO - Ability of User to manage notes
				<p>UserName: {auth.username}, userId:{auth.id}</p>
				<form onSubmit={handleSubmit}>
					<input name='userId' value={userId} placeholder='userId' onChange={handleChange}/>
					<input name='username' value={username} placeholder='username' onChange={handleChange}/>
					<input name='text' placeholder='add note here' value={text} onChange={handleChange}/>
					<button>Submit</button>
				</form>
				<ul>
					{
						itsNotes.map(ele => 

							<li key={ele.id}>
							{ele.text}<button onClick={()=> foo(ele.id)}>x</button>
							</li>)
					}
				</ul>
			</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {

	return state
}

const mapDispatchToProps = (dispatch) => {
	return {
		attemptLogin: () => {
			return dispatch(attemptLogin());
		},
		load: () => {
			return dispatch(fetchNotes())
		},
		foo: (id) => {
			return dispatch(deleteNote(id))
		},
		createNote: (note) => {
			return dispatch(createNote(note))
		}
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
