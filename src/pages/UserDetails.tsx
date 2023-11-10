import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Shared/Layout';

const UserDetails = () => {
	const params = useParams();
	return (
		<Layout>
			<div>UserDetails {params.id}</div>;
		</Layout>
	);
};

export default UserDetails;
