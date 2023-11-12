import React, { useEffect } from 'react';
import Layout from '../components/Shared/Layout';
import '../styles/users.scss';
import DetailsCard from '../components/users/DetailsCard';
import Table from '../components/users/Table/Table';
import { fetchUsers } from '../Redux/slices/userSlice';
import { useAppDispatch } from '../Redux/store';

const Users = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
		return;
	}, []);

	return (
		<Layout>
			<h2 className='users_title'>users</h2>
			<DetailsCard />
			<Table />
		</Layout>
	);
};

export default Users;
