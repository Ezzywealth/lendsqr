import React from 'react';
import LoginHook from './LoginHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/slices/authSlice';
import { CirclesWithBar, RotatingLines } from 'react-loader-spinner';
import LineWaveLoader from '../Shared/LineWaveLoader';

const LoginForm = () => {
	const { showPassword, setShowPassword, handleLogin, email, setEmail, password, setPassword } = LoginHook();
	const { loginLoading } = useSelector((state: RootState) => state.auth);

	return (
		<form className='login_form' onSubmit={handleLogin}>
			<section>
				<h2 className='form_title'>Welcome</h2>
				<p className='form_subtitle'>Enter details to login</p>
				<input disabled={loginLoading} type='text' placeholder='Email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
				<div className='password_container'>
					<input disabled={loginLoading} type={showPassword ? 'text' : 'password'} placeholder='Password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
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
				<button type='submit' className='submit_btn' disabled={loginLoading}>
					{loginLoading ? (
						<div className='login_spinner'>
							<RotatingLines strokeColor='#fff' strokeWidth='5' animationDuration='0.75' width='20' visible={true} />
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
