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
import ErrorComponent from '../components/ErrorComponent';

const UserDetails = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user, userError } = useSelector((state: RootState) => state.users);

	useEffect(() => {
		reload();
	}, [params, dispatch]);

	const reload = () => {
		if (params?.id) {
			dispatch(fetchUserById(params?.id));
		}
	};

	return (
		<Layout>
			<section>
				<span className='back_arrow' onClick={() => navigate('/users')}>
					<HiOutlineArrowNarrowLeft cursor='pointer' size={30} />
					Back to Users
				</span>
			</section>
			{!user && userError ? (
				<ErrorComponent errorMessage={userError} reload={reload} />
			) : (
				<>
					<DetailsHeader id={user?.customId} />
					<DetailsProfile user={user} />
					<DetailsInformation user={user} />
				</>
			)}
		</Layout>
	);
};

export default UserDetails;
