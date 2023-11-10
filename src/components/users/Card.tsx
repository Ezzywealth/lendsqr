import React from 'react';
import { CardProps } from '../../interfaces/typings';
import { formatNumber } from '../../utils/userDetails';

type Props = {
	item: CardProps;
};

const Card = ({ item }: Props) => {
	return (
		<div className='card'>
			<img src={item.icon} alt={item.title} className='card_icon' />
			<p className='card_title'>{item.title}</p>
			<p className='card_amount'>{formatNumber(item.amount)}</p>
		</div>
	);
};

export default Card;
