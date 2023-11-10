import React from 'react';

const DetailsHeader = () => {
	return (
		<div className='header_container'>
			<h2 className='header_title'>User Details</h2>
			<section className='btn_container'>
				<button className='btn blacklist_btn'>Blacklist User</button>
				<button className='btn activate_btn'>Activate User</button>
			</section>
		</div>
	);
};

export default DetailsHeader;
