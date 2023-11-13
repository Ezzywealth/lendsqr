import React from 'react';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { MdCloseFullscreen } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState, toggleSidebar } from '../../Redux/slices/userSlice';
import { useAppDispatch } from '../../Redux/store';

const SidebarToggle = () => {
	const dispatch = useAppDispatch();
	const { sidebarOpen } = useSelector((state: RootState) => state.users);
	return (
		<div
			className='sidebar_toggle'
			onClick={() => {
				dispatch(toggleSidebar());
			}}>
			{sidebarOpen ? <MdCloseFullscreen size={25} color='#213f7d' /> : <BsMenuButtonWideFill size={25} color='#213f7d' />}
		</div>
	);
};

export default SidebarToggle;
