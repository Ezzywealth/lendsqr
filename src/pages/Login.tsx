import React from 'react';
import '../styles/login.scss';
import LoginForm from '../components/LoginForm';

const Login = () => {
	return (
		<div className='container'>
			<section className='container-left'>
				<img src={'/assets/images/logo.svg'} alt='signin-logo' className='image_logo' />
				<img src={'/assets/images/signin-image.svg'} alt='signin_photo' className='signin_image' />
			</section>
			<section className='container-right'>
				<LoginForm />
			</section>
		</div>
	);
};

export default Login;
