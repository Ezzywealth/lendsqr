import React from 'react';
import Layout from '../components/Shared/Layout';
import '../styles/users.scss';
import DetailsCard from '../components/users/DetailsCard';
import Table from '../components/users/Table/Table';

const Users = () => {
	return (
		<Layout>
			<h2 className='users_title'>users</h2>
			<DetailsCard />
			<Table/>
		</Layout>
	);
};

export default Users;