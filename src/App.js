import React, { Component } from 'react';
import Axios from 'axios';

import './App.css';

import Header from './components/Header';

export default class App extends Component {
	state = {
		memeImages: {},
		topText: '',
		bottomText: '',
		isLoading: true,
		randomNum: 0,
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

	newImage = () => {
		this.setState({ randomNum: Math.floor(Math.random() * 100) });
	};

	setTextLayer = () => {
		console.log('text Layer');
	};

	componentDidMount() {
		this.loadMemeImages();
	}

	render() {
		const styles = {
			backgroundImage: `url(${
				!this.state.isLoading
					? this.state.memeImages[this.state.randomNum].url
					: null
			})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			width: 500,
			height: 500,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			textAlign: 'center',
		};

		return (
			<div className='container '>
				<div className='content'>
					<Header
						title='Meme Generator App'
						appDescription='Find an image you like and add some text to it'
					/>
					<button onClick={this.newImage}>Load Images</button>
					<div style={styles}>
						<div>Text Top</div>
						<div>Text Bottom</div>
					</div>
				</div>
				<footer></footer>
			</div>
		);
	}
}
