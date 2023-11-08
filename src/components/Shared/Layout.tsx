import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<h1>Layout</h1>
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
