import React, { useState } from 'react';
import TableHook, { optionsData } from '../users/Table/Hook/TableHook';
import { RootState } from '../../Redux/slices/userSlice';
import { useSelector } from 'react-redux';
import RotatingSpinner from '../Shared/RotatingSpinner';

type Props = {
	id: string;
};
const DetailsHeader = ({ id }: Props) => {
	const { handleUserStatus } = TableHook();
	const { updateLoading } = useSelector((state: RootState) => state.users);
	const [optionsId, setOptionsId] = useState(0);
	return (
		<div className='header_container'>
			<h2 className='header_title'>User Details</h2>
			<section className='btn_container'>
				{optionsData.map((option) => {
					return (
						<button
							key={option.id}
							className={`btn ${option.id === 1 ? 'blacklist_btn' : 'activate_btn'}`}
							onClick={() => {
								setOptionsId(option.id);
								handleUserStatus(id, option.status);
							}}>
							{optionsId === option.id && updateLoading ? <RotatingSpinner color={option.id === 1 ? '#e4033b' : '#39cdcc'} /> : option.title}
						</button>
					);
				})}
			</section>
		</div>
	);
};

export default DetailsHeader;
