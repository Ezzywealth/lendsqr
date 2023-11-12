import React from 'react';
import { BsEye, BsPersonXFill, BsPersonCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import TableHook from './Hook/TableHook';

type Props = {
	id: string;
	setShowOptionsModal: (showOptionsModal: boolean) => void;
};
const OptionsModal = ({ id, setShowOptionsModal }: Props) => {
	const { handleActivateUser, handleBlacklistUser } = TableHook();

	return (
		<div className='options_modal_container show'>
			<div className='close-icon-container'>
				<span onClick={() => setShowOptionsModal(false)} className='close-icon'>
					X
				</span>
			</div>
			<div className='options_modal_btns'>
				<Link to={`/users/${id}`}>
					<button className='options_modal_btn'>
						<BsEye /> View Details
					</button>
				</Link>
				<button
					className='options_modal_btn'
					onClick={() => {
						handleBlacklistUser(id);
						setShowOptionsModal(false);
					}}>
					<BsPersonXFill /> Blacklist user
				</button>
				<button
					className='options_modal_btn'
					onClick={() => {
						handleActivateUser(id);
						setShowOptionsModal(false);
					}}>
					<BsPersonCheckFill />
					Activate User
				</button>
			</div>
		</div>
	);
};

export default OptionsModal;
