import React from 'react';
import Logo from './Logo';

import '../../styles/navbar.scss';
import { BsBell } from 'react-icons/bs';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/slices/authSlice';
import NavForm from './NavForm';
import { FaHamburger } from 'react-icons/fa';

const Navbar = () => {
	const { admin } = useSelector((state: RootState) => state.auth);
	return (
		<nav className='navbar'>
			<div className='navbar_container'>
				<Logo />
				<div className='nav_form_container'>
					<NavForm />
				</div>
				<section className='navbar_right'>
					<h4 className='docs'>Docs</h4>
					<span className='bell_icon'>
						<BsBell size={24} />
					</span>
					<div className='user_info'>
						<img src={admin?.image} alt='userImage' className='user_avatar' />
						<h3 className='user_name'>{admin?.firstName}</h3>
						<span className='arrow_down'>
							<RiArrowDownSFill size={20} />
						</span>
					</div>
				</section>
				{/* <span className='menu_icon'>
					<FaHamburger size={25} />
				</span> */}
			</div>
		</nav>
	);
};

export default Navbar;
