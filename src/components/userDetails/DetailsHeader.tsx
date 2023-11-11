import React from 'react';
import TableHook from '../users/Table/Hook/TableHook';

type Props = {
	id: string;
};
const DetailsHeader = ({ id }: Props) => {
	const { handleActivateUser, handleBlacklistUser } = TableHook();
	return (
		<div className='header_container'>
			<h2 className='header_title'>User Details</h2>
			<section className='btn_container'>
				<button className='btn blacklist_btn' onClick={() => handleBlacklistUser(id)}>
					Blacklist User
				</button>
				<button className='btn activate_btn' onClick={() => handleActivateUser(id)}>
					Activate User
				</button>
			</section>
		</div>
	);
};

export default DetailsHeader;
