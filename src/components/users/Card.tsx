import React from 'react';
import { CardProps } from '../../interfaces/typings';
import { formatNumber } from '../../utils/userDetails';
import CardHook from './Table/Hook/CardHook';

type Props = {
	item: CardProps;
};

const Card = ({ item }: Props) => {
	const { returnVal } = CardHook({ name: item.title });
	return (
		<div className='card'>
			<img src={item.icon} alt={item.title} className='card_icon' />
			<p className='card_title'>{item.title}</p>
			<p className='card_amount'>{formatNumber(returnVal)}</p>
		</div>
	);
};

export default Card;
