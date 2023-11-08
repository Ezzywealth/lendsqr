import React from 'react';
import Logo from './Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import '../../styles/navbar.scss';
import { BsBell } from 'react-icons/bs';
import { RiArrowDownSFill } from 'react-icons/ri';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='navbar-container'>
				<Logo />
				<form className='nav_search_form'>
					<input type='text' placeholder='Search for anything' className='search_input' />
					<button type='submit' className='search-btn'>
						<AiOutlineSearch size={30} className='icon' />
					</button>
				</form>

				<section className='navbar_right'>
					<h4 className='docs'>Docs</h4>
					<span className='bell_icon'>
						<BsBell size={26} />
					</span>
					<div className='user_info'>
						<img src='/assets/images/user-image.jpg' alt='userImage' className='user_avatar' />
						<h3 className='user_name'>Ezekiel</h3>
						<RiArrowDownSFill size={20} />
					</div>
				</section>
			</div>
		</nav>
	);
};

export default Navbar;
