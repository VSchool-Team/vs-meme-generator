export const Header = () => {
	let location = useLocation();
	console.log(location);
	let floatClass;
	location ? (floatClass = 'hover') : null;
	return (
		<div className='headerPosition'>
			<div className='headerData'>
				<div className='logo'>
					<img width='100%' height='100%' src={logo} alt='Logo' />
				</div>
				<div className='notLogo'>
					<div className='nameBackground'>
						<img className='center' height='50px' src={name} alt='Name' />
					</div>
					<div className='info-alt'>
						<div>
							<a href='mailto:zach@zachheckert.com'>EMAIL ME!</a>
						</div>
						<div>
							<a href='tel:18013195001:'>+1-801-319-5001</a>
						</div>
						<div>
							<img
								className='iconAlign'
								height='20'
								src={arrow}
								alt='Download arrow'
							/>
						</div>
						<div>
							<a
								href='https://www.linkedin.com/in/zachheckert/'
								rel='noopener noreferrer'
								target='_blank'>
								<img
									className='iconAlign'
									height='20'
									src={linkedIn}
									alt='GitHub icon'
								/>
							</a>
						</div>
						<div>
							<a
								href='https://github.com/zheckert'
								rel='noopener noreferrer'
								target='_blank'>
								<img
									className='iconAlign'
									height='20'
									src={gitHub}
									alt='LinkedIn icon'
								/>
							</a>
						</div>
					</div>
					<div className={floatClass}>
						<div>
							<Link to='/'>FULL STACK</Link>
						</div>
						<div>
							<Link to='/voiceover'>VOICEOVER</Link>
						</div>
						<div>
							<Link to='/design'>DESIGN</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
