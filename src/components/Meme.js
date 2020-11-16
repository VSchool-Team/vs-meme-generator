import React from 'react'


export default function Meme(props) {

    const styles = {
        backgroundImage: `url(${
            !props.isLoading
                ? props.memeImages[props.randomNum].url
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

    // const memeList = props.customMemes.map(meme => <div>{meme}</div>)

    return (
        <div>
			<button onClick={props.newImage}>New Meme</button>
            <form>
				<input placeholder='Top Text' autoComplete='off' value={props.topText} name='topText' onChange={props.handleChange}/>
				<div className='fillerMemeBackground'>
					<div style={styles}>
					    <p className='caption'>{props.topText}</p>
					    <p className='caption bottom'>{props.bottomText}</p>
					</div>
				</div>
				<input placeholder='Bottom Text' autoComplete='off' value={props.bottomText} name='bottomText' onChange={props.handleChange}/>
				<button onClick={props.submitMeme}>Create Meme</button>
			</form>
            <div>
                {/* {memeList} */}
            </div>
        </div>
    )
}
