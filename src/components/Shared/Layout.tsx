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
			<main>
				<aside>
					<Sidebar />
				</aside>
				<section>{children}</section>
			</main>
		</div>
	);
};

export default Layout;
