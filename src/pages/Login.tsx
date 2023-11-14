import React, { useEffect } from 'react';
import '../styles/login.scss';
import LoginForm from '../components/Login/LoginForm';
import Logo from '../components/Shared/Logo';
import AuthLayout from '../components/Shared/AuthLayout';

const Login = () => {
	return (
		<AuthLayout>

		<div className='container'>
			<section className='container_left'>
				<Logo />
				<img src={'/assets/images/signin-image.svg'} alt='signin_photo' className='signin_image' />
			</section>
			<section className='container_right'>
				<LoginForm />
			</section>
		</div>
		</AuthLayout>
	);
};

export default Login;
