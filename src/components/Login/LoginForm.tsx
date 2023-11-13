import React from 'react';
import LoginHook from './LoginHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/slices/authSlice';
import { LineWave } from 'react-loader-spinner';
import LineWaveLoader from '../Shared/LineWaveLoader';

const LoginForm = () => {
	const { showPassword, setShowPassword, handleLogin, email, setEmail, password, setPassword } = LoginHook();
	const { loginLoading } = useSelector((state: RootState) => state.auth);

	return (
		<form className='login_form' onSubmit={handleLogin}>
			<section>
				<h2 className='form_title'>Welcome</h2>
				<p className='form_subtitle'>Enter details to login</p>
				<input type='text' placeholder='Email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
				<div className='password_container'>
					<input type={showPassword ? 'text' : 'password'} placeholder='Password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
					<button type='button' className='show_hide'>
						{showPassword ? (
							<p className='' onClick={() => setShowPassword(!showPassword)}>
								hide
							</p>
						) : (
							<p className='' onClick={() => setShowPassword(!showPassword)}>
								show
							</p>
						)}
					</button>
				</div>
				<div className='forgot_password'>
					<a href='#'>Forgot Password?</a>
				</div>
				<button type='submit' className='submit_btn'>
					{loginLoading ? (
						<div className='login_spinner'>
							<LineWaveLoader color='#fff' />
						</div>
					) : (
						'Login'
					)}
				</button>
			</section>
		</form>
	);
};

export default LoginForm;
