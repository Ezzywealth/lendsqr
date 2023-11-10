import React from 'react';

const OptionsModal = () => {
	return (
		<div className='options_modal_container'>
			<div className='options_modal'>
				<h3 className='options_modal_title'>View Details</h3>
				<div className='options_modal_btns'>
					<button className='options_modal_btn'>Blacklist user</button>
					<button className='options_modal_btn'>Activate User</button>
				</div>
			</div>
		</div>
	);
};

export default OptionsModal;
