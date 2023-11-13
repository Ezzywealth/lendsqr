import React from 'react';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { MdCloseFullscreen } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/slices/userSlice';

const SidebarToggle = () => {
	const { sidebarOpen } = useSelector((state: RootState) => state.users);
	return <div className='sidebar_toggle'>{sidebarOpen ? <MdCloseFullscreen size={25} color='#213f7d' /> : <BsMenuButtonWideFill size={25} color='#213f7d' />}</div>;
};

export default SidebarToggle;
