// Modal.js
import React from 'react';

import TableHook from './Hook/TableHook';

type Props = {
	setShowFilterModal: (showFilterModal: boolean) => void;
};

const Modal = ({ setShowFilterModal }: Props) => {
	const { onClose, setIsOpen, organization, setOrganization, username, setUsername, phoneNumber, setPhoneNumber, date, setDate, email, setEmail, status, setStatus, applyFilters } = TableHook();

	const handleApply = () => {
		onClose();
		setShowFilterModal(false);
		applyFilters();
	};

	const closeModal = () => {
		setShowFilterModal(false);
		setIsOpen(false);
	};

	return (
		<div className='modal show'>
			<div className='modal-content'>
				<label>
					Organization
					<select value={organization} onChange={(e) => setOrganization(e.target.value)}>
						<option value='' disabled>
							Select
						</option>
						<option className='options' value='lendsqr'>
							lendsqr
						</option>
						<option className='options' value='lendstar'>
							lendstar
						</option>
						<option className='options' value='irorun'>
							irorun
						</option>
					</select>
				</label>
				<label>
					Username
					<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='User' />
				</label>
				<label>
					Email
					<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' placeholder='Email' />
				</label>
				<label>
					Date
					<input type='date' value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date' />
				</label>
				<label>
					Phone Number
					<input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone' />
				</label>

				<label>
					Status
					<select value={status} onChange={(e) => setStatus(e.target.value)}>
						<option className='options' value='' disabled>
							Select
						</option>
						<option className='options' value='active'>
							Active
						</option>
						<option className='options' value='pending'>
							Pending
						</option>
						<option className='options' value='inactive'>
							Inactive
						</option>
						<option className='options' value='blacklisted'>
							Blacklisted
						</option>
					</select>
				</label>
				<div className='button-container'>
					<button onClick={closeModal} className='btn cancel_button'>
						Cancel
					</button>
					<button onClick={handleApply} className='btn apply_button'>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
