import React, { Component } from 'react';
import Axios from 'axios';

import './App.css';
import SavedMemes from './components/SavedMemes';
import Header from './components/Header';
import Meme from './components/Meme';
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
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	submitMeme = (event) => {
		event.preventDefault();

		if (this.state.topText !== '' || this.state.bottomText !== '') {
			this.setState((prevState) => {
				return {
					customMemes: [
						...prevState.customMemes,
						{
							url: this.state.memeImages[this.state.randomNum].url,
							topText: this.state.topText,
							bottomText: this.state.bottomText,
						},
					],
				};
			});
			this.newImage();
		} else {
			alert('Please fill out either the top text box or bottom text box');
		}
	};

	newImage = () => {
		// event.preventDefault();
		this.setState({
			randomNum: Math.floor(Math.random() * 100),
			topText: '',
			bottomText: '',
		});
	};

	setTextLayer = () => {
		console.log('text Layer');
	};

	componentDidMount() {
		this.loadMemeImages();
	}

	render() {
		const memeList = this.state.customMemes.map((meme) => {
			return <SavedMemes meme={meme} />;
		});

		return (
			<div className='container '>
				<div className='content'>
					<Header
						title='Meme Generator App'
						appDescription='Find an image you like and add some text to it'
					/>
					<Meme
						topText={this.state.topText}
						bottomText={this.state.bottomText}
						newImage={this.newImage}
						isLoading={this.state.isLoading}
						memeImages={this.state.memeImages}
						randomNum={this.state.randomNum}
						click={this.submitMeme}
						handleChange={this.handleChange}
						loadMemeImages={this.loadMemeImages}
						submitMeme={this.submitMeme}
					/>
				</div>
				<div className='flex-wrapper'>{memeList}</div>
				<footer></footer>
			</div>
		);
	}
}
