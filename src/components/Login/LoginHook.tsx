import React, { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../Redux/store';
import { loginService } from '../../Redux/slices/authSlice';

const LoginHook = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('admin@example.com');
	const [password, setPassword] = useState('password123');
	const dispatch = useAppDispatch();
	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(email, password);
		dispatch(loginService({ email, password }));
	};
	return {
		showPassword,
		setShowPassword,
		handleLogin,
		email,
		setEmail,
		password,
		setPassword,
	};
};

export default LoginHook;
