import React from 'react';
import { sidebarObject } from '../../utils/sidebar';
import '../../styles/sidebar.scss';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import AuthHook from '../Login/AuthHook';
import { RootState } from '../../Redux/slices/authSlice';
import { useSelector } from 'react-redux';
import RotatingSpinner from './RotatingSpinner';

const Sidebar = () => {
	const [activeLink, setActiveLink] = React.useState('users');
	const { handleLogout } = AuthHook();
	const { logoutLoading } = useSelector((state: RootState) => state.auth);
	return (
		<aside className='sidebar_container'>
			<div className='switch_container'>
				<img src='/assets/icons/switch_organization.png' alt='switch_icon' />
				<h2 className='switch_text'>Switch Organization</h2>
				<img src='/assets/icons/arrow_down.png' alt='switch' />
			</div>
			<div className='dashboard_container'>
				<img src='/assets/icons/dashboard.png' alt='dashboard_icon' />
				<h3 className='dashboard_text'>Dashboard</h3>
			</div>
			<article className='sidebar_links'>
				{Object.entries(sidebarObject).map(([key, value]) => (
					<section key={key} className='links_section'>
						<h3 className='section_title'>{key}</h3>
						<ul className='side_links_container'>
							{value.map((item) => (
								<Link to={item.name === 'users' ? `/${item.name}` : ''} key={item.id}>
									<li className={`side_links ${activeLink === item.name ? 'active_link' : 'inactive_link'}`} onClick={() => setActiveLink(item.name)}>
										<img className='side_links_icon' src={item.icon} alt={item.name} />
										<h4 className='side_links_name'>{item.name}</h4>
									</li>
								</Link>
							))}
						</ul>
					</section>
				))}
				<div className='logout_container' onClick={handleLogout}>
					<img className='side_links_icon' src='/assets/icons/logout.png' alt='logout button' />
					<h3 className='logout_text'>Logout</h3>
					{logoutLoading && <RotatingSpinner color='#213f7d' />}
				</div>
			</article>
		</aside>
	);
};

export default Sidebar;
