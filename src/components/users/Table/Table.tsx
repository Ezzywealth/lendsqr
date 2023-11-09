import React from 'react';
import { tableHeaders, usersData } from '../../../utils/userDetails';
import { BsFilter, BsThreeDotsVertical } from 'react-icons/bs';

const Table = () => {
	return (
		<div className='table-responsive'>
			<table className='custom-table'>
				<thead>
					<tr>
						{tableHeaders.map((header, index) => {
							return (
								<th key={index}>
									{header}
									<img src='/assets/icons/users/filter-button.png' alt='filter' className='filter-icon' />
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{usersData.slice(0, 9).map((user, index) => {
						return (
							<tr key={index}>
								<td>{user.organization}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone_number}</td>
								<td>{user.date_joined}</td>
								<td>{user.status}</td>
								<td>
									<BsThreeDotsVertical size={20} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
