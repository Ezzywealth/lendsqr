import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import TableHook, { optionsData } from './Hook/TableHook';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/slices/userSlice';

type Props = {
	id: string;
};

const OptionsModal = ({ id }: Props) => {
	const { updateLoading } = useSelector((state: RootState) => state.users);
	const [optionsId, setOptionsId] = useState(0);
	const { handleUserStatus, handleOptionsModal } = TableHook();

	return (
		<div className='options_modal_container show'>
			<div className='close_icon_container'>
				<span onClick={() => handleOptionsModal(false)} className='close_icon'>
					X
				</span>
			</div>
			<div className='options_modal_btns'>
				<Link to={`/users/${id}`}>
					<button className='options_modal_btn'>
						<BsEye /> View Details
					</button>
				</Link>
				{optionsData.map((option) => {
					return (
						<button
							key={option.id}
							className='options_modal_btn'
							onClick={() => {
								setOptionsId(option.id);
								handleUserStatus(id, option.status);
							}}>
							<span>{option.icon}</span> <span> {option.title}</span>
							{updateLoading && optionsId === option.id && (
								<span>
									<RotatingLines strokeColor='#213f7d' strokeWidth='5' animationDuration='0.75' width='16' visible={true} />
								</span>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default OptionsModal;
