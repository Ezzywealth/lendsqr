import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import Logo from './Logo';

const LoadingSpinner = () => {
	return (
		<section className='spinner_container'>
			<Logo />
			<CirclesWithBar height='100' width='100' color='#213f7d' wrapperStyle={{}} wrapperClass='' visible={true} outerCircleColor='' innerCircleColor='' barColor='' ariaLabel='circles-with-bar-loading' />
		</section>
	);
};

export default LoadingSpinner;
