import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Shared/Layout';
import DetailsHeader from '../components/userDetails/DetailsHeader';
import DetailsProfile from '../components/userDetails/DetailsProfile';
import DetailsInformation from '../components/userDetails/DetailsInformation';
import '../styles/userDetails.scss';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { UserProps } from '../interfaces/typings';
import { usersData } from '../utils/userDetails';

const UserDetails = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [user, setUser] = React.useState<UserProps>(usersData[0]);

	useEffect(() => {
		const user = usersData.find((user) => user.id === params.id);
		if (user) setUser(user);
	}, [params.id]);

	return (
		<Layout>
			<section className='back_arrow' onClick={() => navigate('/users')}>
				<HiOutlineArrowNarrowLeft size={30} />
				Back to Users
			</section>
			<DetailsHeader />
			<DetailsProfile user={user} />
			<DetailsInformation user={user} />
		</Layout>
	);
};

export default UserDetails;
