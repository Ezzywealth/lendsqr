import React from 'react';
import { formatNumber, userTabs, usersData } from '../../utils/userDetails';
import { UserProps } from '../../interfaces/typings';
import { FaNairaSign } from 'react-icons/fa6';
import StarRating from './StarRating';
const DetailsProfile = () => {
	const [user, setUser] = React.useState<UserProps>(usersData[0]);
	const [activeTab, setActiveTab] = React.useState<string>('General Details');
	return (
		<section className='profile_container'>
			<article className='profile_top'>
				<div className='image_name'>
					<img src={user.profile_picture} alt={user.username} className='user_image' />
					<div className='name_id'>
						<h3>{user.fullName}</h3>
						<p>{user.id}</p>
					</div>
				</div>
				<div className='divider'></div>
				<div className='user_tier_container'>
					<h3 className='user_tier_title'>User's Tier</h3>
					<StarRating rating={user.acc_tier} />
				</div>
				<div className='divider'></div>
				<div className='acc_balance_container'>
					<h3 className='acc_balance'>
						<FaNairaSign className='naira_icon' />
						<span className='amount'>{formatNumber(user.acc_balance)}</span>
					</h3>
					<p className='acc_number_name'>
						<span> {user.acc_number}</span>/<span>{user.bank_name}</span>
					</p>
				</div>
			</article>
			<article className='profile_bottom'>
				<ul className='tabs_list'>
					{userTabs.map((tab) => (
						<li key={tab} className={`${activeTab === tab ? 'active_tab' : 'inactive_tab'} tab`}>
							{tab}
						</li>
					))}
				</ul>
			</article>
		</section>
	);
};

export default DetailsProfile;
