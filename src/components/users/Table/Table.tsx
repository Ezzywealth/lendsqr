import React from 'react';
import { tableHeaders, usersData } from '../../../utils/userDetails';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TableHook from './Hook/TableHook';
import Modal from './FilterModal';
import OptionsModal from './OptionsModal';

const Table = () => {
	const { showFilterModal, setShowFilterModal, showOptionsModal, setShowOptionsModal } = TableHook();
	const [activeRow, setActiveRow] = React.useState<null | string>(null);

	return (
		<div className='table-responsive'>
			<table className='custom-table'>
				<thead>
					<tr>
						{tableHeaders.map((header, index) => {
							return (
								<th key={index}>
									{header}
									<img src='/assets/icons/users/filter-button.png' alt='filter' className='filter-icon' onClick={() => setShowFilterModal(true)} />
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className='table-body'>
					{usersData.slice(0, 9).map((user, index) => {
						return (
							<tr key={index} className='table-data-row'>
								<td>{user.organization}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone_number}</td>
								<td>{user.date_joined}</td>
								<td>
									<span className={`${user.status.toLowerCase() === 'active' ? 'active-bg' : user.status.toLowerCase() === 'inactive' ? 'inactive-bg' : user.status.toLowerCase() === 'blacklisted' ? 'blacklisted-bg' : user.status.toLowerCase() === 'pending' ? 'pending-bg' : ''}`}>{user.status}</span>
								</td>
								<td>
									<BsThreeDotsVertical
										size={20}
										onClick={() => {
											setActiveRow(user.id);
											setShowOptionsModal(true);
										}}
										cursor='pointer'
									/>
									<div className={`${showOptionsModal && activeRow === user.id ? 'options-modal' : 'hide-modal'}`}>
										<OptionsModal id={user.id} setShowOptionsModal={setShowOptionsModal} />
									</div>
								</td>
							</tr>
						);
					})}
					<tr className={`${showFilterModal ? 'filter-modal' : 'hide-modal'}`}>
						<td colSpan={3}>
							<Modal setShowFilterModal={setShowFilterModal} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Table;
