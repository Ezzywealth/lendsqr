import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../styles/layout.scss';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { useAppDispatch } from '../../Redux/store';
import { setAdmin } from '../../Redux/slices/authSlice';
import { obfuscateToken } from '../../utils/encryptTokens';
import { RootState } from '../../Redux/slices/userSlice';
interface LayoutProps {
	children: ReactNode;
}
const AuthLayout = ({ children }: LayoutProps) => {
	const { usersLoading, userLoading } = useSelector((state: RootState) => state.users);
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const admin = localStorage.getItem('admin') && JSON.parse(obfuscateToken(false, localStorage.getItem('admin') as string));

	useEffect(() => {
		if (admin?.id) {
			dispatch(setAdmin(admin));
			window.location.assign('/users');
		}
		setLoading(false);
	}, [dispatch, admin]);

	if (usersLoading || userLoading || loading) {
		return <LoadingSpinner />;
	}

	return <div>{children}</div>;
};

export default AuthLayout;
