import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../styles/layout.scss';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import { useAppDispatch } from '../../Redux/store';
import { setAdmin } from '../../Redux/slices/authSlice';
import { obfuscateToken } from '../../utils/encryptTokens';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { usersLoading, userLoading } = useSelector((state: any) => state.users);
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	const admin = localStorage.getItem('admin') && JSON.parse(obfuscateToken(false, localStorage.getItem('admin') as string));
	useEffect(() => {
		if (admin?.id) {
			dispatch(setAdmin(admin));
		} else {
			window.location.assign('/');
		}
		setLoading(false);
	}, [dispatch, admin]);

	if (usersLoading || userLoading || loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='layout'>
			<Navbar />
			<main className='main_section_container'>
				<section className='aside_container'>
					<Sidebar />
				</section>
				<section className='main_body'>{children}</section>
			</main>
		</div>
	);
};

export default Layout;
