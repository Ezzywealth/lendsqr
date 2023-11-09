import React from 'react';
import Layout from '../components/Shared/Layout';
import '../styles/users.scss';
import DetailsCard from '../components/users/DetailsCard';

const Users = () => {
	return (
		<Layout>
			<h2 className='users_title'>users</h2>
			<DetailsCard />
		</Layout>
	);
};

export default Users;
