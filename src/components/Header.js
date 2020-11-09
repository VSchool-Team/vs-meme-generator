import React from 'react';

function header(props) {
	return (
		<header>
			<h1>{props.title}</h1>
			<p>{props.appDescription}</p>
		</header>
	);
}

export default header;
