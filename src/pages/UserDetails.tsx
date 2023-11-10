import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Shared/Layout';
import DetailsHeader from '../components/userDetails/DetailsHeader';
import DetailsProfile from '../components/userDetails/DetailsProfile';
import DetailsInformation from '../components/userDetails/DetailsInformation';
import '../styles/userDetails.scss';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
	const params = useParams();
	const navigate = useNavigate();
	return (
		<Layout>
			<section className='back_arrow' onClick={() => navigate('/users')}>
				<HiOutlineArrowNarrowLeft size={30} />
				Back to Users
			</section>
			<DetailsHeader />
			<DetailsProfile />
			<DetailsInformation />
		</Layout>
	);
};

export default UserDetails;
