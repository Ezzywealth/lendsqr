import React, { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../Redux/store';
import { loginService, logoutService } from '../../Redux/slices/authSlice';

const AuthHook = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('admin@example.com');
	const [password, setPassword] = useState('password123');
	const dispatch = useAppDispatch();
	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginService({ email, password }));
	};

	const handleLogout = () => {
		dispatch(logoutService());
	};

	return {
		showPassword,
		setShowPassword,
		handleLogin,
		email,
		setEmail,
		password,
		setPassword,
		handleLogout,
	};
};

export default AuthHook;
