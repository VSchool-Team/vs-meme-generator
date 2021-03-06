import React, { Component } from 'react';
import Axios from 'axios';
import {generateUniqueId} from './services.js'

import './App.css';

import Header from './components/Header';
import Meme from './components/Meme'
// import MemeList from './components/MemeList'

export default class App extends Component {

	state = {
		memeImages: {},
		topText: '',
		bottomText: '',
		isLoading: true,
		randomNum: Math.floor(Math.random() * 100),
		customMemes: [],
	};


	loadMemeImages = () => {
		Axios.get('https://api.imgflip.com/get_memes').then((resonse) => {
			// console.log('data', resonse.data.data.memes);
			this.setState({
				memeImages: resonse.data.data.memes,
				isLoading: false,
			});
		});
	};

	handleChange = (event) => {
		event.preventDefault()
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	submitMeme = (event) => {
		event.preventDefault()
		this.setState({topText: ''})
		this.setState({bottomText: ''})
		const styles = {
			backgroundImage: `url(${this.state.memeImages[this.state.randomNum].url})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			width: 500,
			height: 500,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			textAlign: 'center',
		};
		if(this.state.topText !== '' || this.state.bottomText !== ''){
			this.setState(prevState => {
				return{
					customMemes: [
						...prevState.customMemes,
						{id: generateUniqueId(), styles, editing: false, topText: this.state.topText, bottomText: this.state.bottomText, html:
						<div style={styles}>
							<p name='topText' className='caption'>{this.state.topText}</p>
							<p name='bottomText' className='caption'>{this.state.bottomText}</p>
						</div>
						}
					]
				}
			})
		
		} else{
			alert('Please fill out either the top text box or bottom text box')
		}
		
	}

	newImage = (event) => {
		event.preventDefault()
		this.setState({randomNum: Math.floor(Math.random() * 100) });
		this.setState({topText: ''})
		this.setState({bottomText: ''})
	};

	setTextLayer = () => {
		console.log('text Layer');
	};

	componentDidMount() {
		this.loadMemeImages();
	}

	deleteButton = (id) => {
		this.setState((prevState) => ({
			customMemes: prevState.customMemes.filter(meme => meme.id !== id)
		}))
	}

	editButton = (meme) => {
		meme.editing = true
	}

	saveEdit = (meme) => {
		const top = meme.topText
		const bottom = meme.bottomText
		const styles = meme.styles
		const newMeme = this.state.customMemes.find(val => val.id === meme.id);
		newMeme.html =
			<div style={styles}>
				<p name='topText' className='caption'>{top}</p>
				<p name='bottomText' className='caption'>{bottom}</p>
			</div>
		this.setState(prevState => {
			const newState = prevState.customMemes.filter(val => val.id !== meme.id)
			newState.push(newMeme)
			return {customMemes: newState}
		})
		meme.editing = false
	}

	render() {
		const memeList = this.state.customMemes.map(meme => 
				<div>
					{meme.html}
					{meme.editing && 
						<div>
							<input type="text" placeholder="Top Text" onChange={(e) => meme.topText = e.target.value} contentEditable/>
							<input type="text" placeholder="Bottom Text" onChange={(e) => meme.bottomText = e.target.value} contentEditable/>
							<button type="button" onClick={() => this.saveEdit(meme)}>Save</button>
						</div>
					}
					<button onClick={() => this.deleteButton(meme.id)} type="button">Delete</button>
					<button onClick={() => this.editButton(meme)} type="button">Edit</button>
				</div>
			)

		return (
			<div className='container '>
				<div className='content'>
					<Header
						title='Meme Generator App'
						appDescription='Find an image you like and add some text to it'
					/>
					<Meme
						topText = {this.state.topText}
						bottomText = {this.state.bottomText}
						newImage = {this.newImage}
						isLoading = {this.state.isLoading}
						memeImages = {this.state.memeImages}
						randomNum = {this.state.randomNum}
						click = {this.submitMeme}
						handleChange = {this.handleChange}
						loadMemeImages = {this.loadMemeImages}
						submitMeme = {this.submitMeme}
						/>
				</div>
				<footer></footer>
				{/* <MemeList
					topText = {this.state.topText}
					bottomText = {this.state.bottomText}
					newImage = {this.newImage}
					memeImages = {this.state.memeImages}
					randomNum = {this.state.randomNum}
					customMemes = {this.state.customMemes}
				/> */}

				<div>
					{memeList}
				</div>
			</div>
		);
	}
}
