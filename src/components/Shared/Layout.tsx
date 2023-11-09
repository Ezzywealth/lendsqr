import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../styles/layout.scss';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
