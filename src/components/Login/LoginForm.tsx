import React from 'react';
import LoginHook from './LoginHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/slices/authSlice';
import { LineWave } from 'react-loader-spinner';

const LoginForm = () => {
	const { showPassword, setShowPassword, handleLogin, email, setEmail, password, setPassword } = LoginHook();
	const { loginLoading } = useSelector((state: RootState) => state.auth);

	return (
		<form className='login-form' onSubmit={handleLogin}>
			<section>
				<h2 className='form_title'>Welcome</h2>
				<p className='form_subtitle'>Enter details to login</p>
				<input type='text' placeholder='Email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
				<div className='password-container'>
					<input type={showPassword ? 'text' : 'password'} placeholder='Password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
					<button type='button' className='show-hide'>
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
				<div className='forgot-password'>
					<a href=''>Forgot Password?</a>
				</div>
				<button type='submit' className='submit_btn'>
					{loginLoading ? (
						<div className='login_spinner'>
							<LineWave height='50' width='50' color='#fefefe' ariaLabel='line-wave' wrapperStyle={{}} wrapperClass='' visible={true} firstLineColor='' middleLineColor='' lastLineColor='' />
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
