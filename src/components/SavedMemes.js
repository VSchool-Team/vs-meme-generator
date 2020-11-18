import React from 'react';

const SavedMemes = (props) => {
	const styles = {
		backgroundImage: `url(${props.meme.url})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: 300,
		height: 300,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		textAlign: 'center',
	};

	return (
		<div className='meme-item' style={styles}>
			<p name='topText' className='caption'>
				{props.meme.topText}
			</p>
			<p name='bottomText' className='caption'>
				{props.meme.bottomText}
			</p>
		</div>
	);
};

export default SavedMemes;
