import React from 'react';
import { cardDetails } from '../../utils/userDetails';
import Card from './Card';
const DetailsCard = () => {
	return (
		<div className='details_card_container'>
			{cardDetails.map((item) => (
				<Card item={item} key={item.id} />
			))}
		</div>
	);
};

export default DetailsCard;
