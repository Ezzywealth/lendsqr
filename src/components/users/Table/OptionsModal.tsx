import React from 'react';
import { BsEye, BsPersonXFill, BsPersonCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type Props = {
	id: string;
	setShowOptionsModal: (showOptionsModal: boolean) => void;
};
const OptionsModal = ({ id, setShowOptionsModal }: Props) => {
	return (
		<div className='options_modal_container'>
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
				<button className='options_modal_btn'>
					<BsPersonXFill /> Blacklist user
				</button>
				<button className='options_modal_btn'>
					<BsPersonCheckFill />
					Activate User
				</button>
			</div>
		</div>
	);
};

export default OptionsModal;
