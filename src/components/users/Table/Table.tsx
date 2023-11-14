import React from 'react';
import { tableHeaders } from '../../../utils/userDetails';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TableHook from './Hook/TableHook';
import Modal from './FilterModal';
import OptionsModal from './OptionsModal';
import { useSelector } from 'react-redux';
import { UserProps } from '../../../interfaces/typings';
import Pagination from '../../Shared/Pagination';
import { RootState } from '../../../Redux/slices/userSlice';

const Table = () => {
	const { showFilterModal, setShowFilterModal, handleOptionsModal, handlePageChange } = TableHook();
	const [activeRow, setActiveRow] = React.useState<null | string>(null);
	const { filteredUsers, currentPage, totalPages, pageSize, noOfItems, showOptionsModal } = useSelector((state: RootState) => state.users);

	return (
		<div>
			<div className='table_responsive'>
				<table className='custom_table'>
					<thead>
						<tr>
							{tableHeaders.map((header, index) => {
								return (
									<th key={index}>
										<div className='filter_container'>
											{header}
											<img src='/assets/icons/users/filter-button.png' alt='filter' className='filter_icon' onClick={() => setShowFilterModal(true)} data-testid={`filter-${index}`} />
										</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className='table_body'>
						{filteredUsers?.map((user: UserProps, index) => {
							return (
								<tr key={user.customId} className='table_data_row' data-testid={`row-${index + 1}`}>
									<td>{user.organization}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.phone_number}</td>
									<td>{user.date_joined}</td>
									<td>
										<span className={`${user.status.toLowerCase() === 'active' ? 'active_bg' : user.status.toLowerCase() === 'inactive' ? 'inactive_bg' : user.status.toLowerCase() === 'blacklisted' ? 'blacklisted_bg' : user.status.toLowerCase() === 'pending' ? 'pending_bg' : ''}`}>{user.status}</span>
									</td>
									<td>
										<BsThreeDotsVertical
											size={20}
											onClick={() => {
												setActiveRow(user.customId);
												handleOptionsModal(true);
											}}
											cursor='pointer'
											data-testid={`three-dots-${index + 1}`}
										/>
										<div className={`${showOptionsModal && activeRow === user.customId ? 'options_modal show' : 'hide_modal'}`}>
											<OptionsModal id={user.customId} />
										</div>
									</td>
								</tr>
							);
						})}
						<tr className={`${showFilterModal ? 'filter_modal show' : 'hide_modal'}`}>
							<td colSpan={3}>
								<Modal setShowFilterModal={setShowFilterModal} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<Pagination totalItems={noOfItems} currentPage={currentPage} itemsPerPage={pageSize} totalPages={totalPages} onPageChange={handlePageChange} />
		</div>
	);
};
export default Table;
