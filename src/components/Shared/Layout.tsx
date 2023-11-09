import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../styles/layout.scss';
import { useDispatch } from 'react-redux';
import { fetchLoans } from '../../Redux/slices/userSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppState } from '../../interfaces/typings';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	// const dispatch = useDispatch<ThunkDispatch<AppState, unknown, AnyAction>>();

	// useEffect(() => {
	// 	dispatch(fetchLoans());
	// }, []);

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
