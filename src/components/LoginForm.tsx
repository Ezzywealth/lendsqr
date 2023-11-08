import React, { useState } from 'react';

const LoginForm = () => {
	const [togglePassword, setTogglePassword] = useState(false);
	return (
		<form className='login-form'>
			<section>
				<h2 className='form_title'>Welcome</h2>
				<p className='form_subtitle'>Enter details to login</p>
				<input type='text' placeholder='Email' className='input' />
				<div className='password-container'>
					<input type='password' placeholder='Password' className='input' />
					<button type='button' className='show-hide'>
						{togglePassword ? (
							<p className='fas fa-eye-slash' onClick={() => setTogglePassword(!togglePassword)}>
								hide
							</p>
						) : (
							<p className='fas fa-eye' onClick={() => setTogglePassword(!togglePassword)}>
								show
							</p>
						)}
					</button>
				</div>

				<div className='forgot-password'>
					<a href=''>Forgot Password?</a>
				</div>

				<button type='submit' className='submit_btn'>
					Login
				</button>
			</section>
		</form>
	);
};

export default LoginForm;
