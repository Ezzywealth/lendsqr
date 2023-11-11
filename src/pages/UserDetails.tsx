import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Shared/Layout';
import DetailsHeader from '../components/userDetails/DetailsHeader';
import DetailsProfile from '../components/userDetails/DetailsProfile';
import DetailsInformation from '../components/userDetails/DetailsInformation';
import '../styles/userDetails.scss';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { RootState, fetchUserById } from '../Redux/slices/userSlice';
import { useSelector } from 'react-redux';

const UserDetails = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user, userError } = useSelector((state: RootState) => state.usersData);

	useEffect(() => {
		if (params?.id) {
			dispatch(fetchUserById(params?.id));
		}
	}, [params, dispatch]);

	return (
		<Layout>
			<section className='back_arrow' onClick={() => navigate('/users')}>
				<HiOutlineArrowNarrowLeft size={30} />
				Back to Users
			</section>
			{!user && userError ? (
				<h2 className='error message'>{userError}</h2>
			) : (
				<>
					<DetailsHeader id={user?.id} />
					<DetailsProfile user={user} />
					<DetailsInformation user={user} />
				</>
			)}
		</Layout>
	);
};

export default UserDetails;
