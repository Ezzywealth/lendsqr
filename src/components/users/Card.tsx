import React from 'react';
import { CardProps } from '../../interfaces/typings';

type Props = {
	item: CardProps;
};

const Card = ({ item }: Props) => {
	return (
		<div className='card'>
			<img src={item.icon} alt={item.title} className='card_icon' />
			<p className='card_title'>{item.title}</p>
			<p className='card_amount'>{item.amount}</p>
		</div>
	);
};

export default Card;
