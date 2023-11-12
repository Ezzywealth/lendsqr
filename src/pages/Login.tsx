import React, { useEffect } from 'react';
import '../styles/login.scss';
import LoginForm from '../components/Login/LoginForm';
import Logo from '../components/Shared/Logo';

const Login = () => {
	return (
		<div className='container'>
			<section className='container-left'>
				<Logo />
				<img src={'/assets/images/signin-image.svg'} alt='signin_photo' className='signin_image' />
			</section>
			<section className='container-right'>
				<LoginForm />
			</section>
		</div>
	);
};

export default Login;
