import React, { useEffect } from 'react';
import Layout from '../components/Shared/Layout';
import '../styles/users.scss';
import DetailsCard from '../components/users/DetailsCard';
import Table from '../components/users/Table/Table';
import { fetchLoans } from '../Redux/slices/userSlice';
import { useAppDispatch } from '../Redux/store';
import { useSelector } from 'react-redux';

const Users = () => {
	const dispatch = useAppDispatch();
	const { users } = useSelector((state: any) => state.counter);

	useEffect(() => {
		if (users.length < 1) {
			dispatch(fetchLoans());
		}
	}, [users.length, dispatch]);

	return (
		<Layout>
			<h2 className='users_title'>users</h2>
			<DetailsCard />
			<Table />
		</Layout>
	);
};

export default Users;
