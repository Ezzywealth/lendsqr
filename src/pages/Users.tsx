import React, { useEffect } from 'react';
import Layout from '../components/Shared/Layout';
import '../styles/users.scss';
import DetailsCard from '../components/users/DetailsCard';
import Table from '../components/users/Table/Table';
import { RootState, fetchUsers } from '../Redux/slices/userSlice';
import { useAppDispatch } from '../Redux/store';
import { useSelector } from 'react-redux';
import ErrorComponent from '../components/ErrorComponent';

const Users = () => {
	const dispatch = useAppDispatch();
	const { usersError } = useSelector((state: RootState) => state.users);

	useEffect(() => {
		dispatch(fetchUsers());
		return;
	}, []);

	// function to reload fetching users when there is an error
	const reload = () => {
		dispatch(fetchUsers());
	};

	return (
		<Layout>
			{usersError ? (
				<ErrorComponent errorMessage={usersError} reload={reload} />
			) : (
				<>
					<h2 className='users_title'>users</h2>
					<DetailsCard />
					<Table />
				</>
			)}
		</Layout>
	);
};

export default Users;
