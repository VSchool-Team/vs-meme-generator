import React, { Component } from 'react';
import Axios from 'axios';

import './App.css';

import Header from './components/Header';
import Meme from './components/Meme'

export default class App extends Component {
	constructor(){
		super()
		this.state = {
			memeImages: {},
			topText: '',
			bottomText: '',
			isLoading: true,
			randomNum: Math.floor(Math.random() * 100),
			customMemes: []
		};
		this.handleChange=this.handleChange.bind(this)
		this.submitMeme=this.submitMeme.bind(this)
	}

	loadMemeImages = () => {
		Axios.get('https://api.imgflip.com/get_memes').then((resonse) => {
			// console.log('data', resonse.data.data.memes);
			this.setState({
				memeImages: resonse.data.data.memes,
				isLoading: false,
			});
		});
	};

	handleChange(event){
		event.preventDefault()
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	submitMeme(event){
		event.preventDefault()
		this.setState(prevState => {
			if(this.state.topText !== '' || this.state.bottomText !== ''){
				return{
					customMemes: [
						prevState.customMemes,
						<div 
						backgroundImage={`url(${this.state.memeImages[this.state.randomNum].url})`}
						backgroundRepeat= 'no-repeat'
						backgroundSize= 'contain'
						width= '500px'
						height= '500px'
						display= 'flex'
						flexDirection= 'column'
						justifyContent= 'space-between'
						textAlign= 'center'>
							<p name='topText'>{this.state.topText}</p>
							<p name='bottomText'>{this.state.bottomText}</p>
						</div>
					]
				}
			} else{
				alert('Please fill out either the top text box or bottom text box')
			}
		})
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

	render() {

		const memeList = this.state.customMemes.map(meme => <div>{meme}</div>)

		// const styles = {
		// 	backgroundImage: `url(${
		// 		!this.state.isLoading
		// 			? this.state.memeImages[this.state.randomNum].url
		// 			: null
		// 	})`,
		// 	backgroundRepeat: 'no-repeat',
		// 	backgroundSize: 'contain',
		// 	width: 500,
		// 	height: 500,
		// 	display: 'flex',
		// 	flexDirection: 'column',
		// 	justifyContent: 'space-between',
		// 	textAlign: 'center',
		// };

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
						customMemes = {this.state.customMemes}
						loadMemeImages = {this.loadMemeImages}
						submitMeme = {this.submitMeme}
						/>
				{/* <form>
					<button onClick={this.newImage}>Refresh Meme Page</button>
					<div className='fillerMemeBackground'>
					<div style={styles}>
					<input placeholder='Top Text' value={this.state.topText} name='topText' onChange={this.handleChange}/>
					<p className='caption'>{this.state.topText}</p>
					<p className='caption'>{this.state.bottomText}</p>
					<input placeholder='Bottom Text' value={this.state.bottomText} name='bottomText' onChange={this.handleChange}/>
					</div>
					</div>
					<button onClick={this.submitMeme}>Create Meme</button>
				</form> */}
				</div>
				<footer></footer>
				<div>
					{memeList}
				</div>
			</div>
		);
	}
}
