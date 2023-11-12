import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

type Props = {
	rating?: number;
};

const StarRating = ({ rating=0 }: Props) => {

	const filledStars = Math.floor(rating);
	const remainder = 3 - rating;

	const renderStars = () => {
		const stars = [];

		for (let i = 0; i < filledStars; i++) {
			stars.push(<FaStar key={i} className='star filled' />);
		}

		if (remainder > 0) {
			stars.push(<FaRegStar color='#ffcf24' key='half' className='star ' />);
		}

		for (let i = filledStars + 1; i < 3; i++) {
			stars.push(<FaRegStar color='#ffcf24' key={i} className='star' />);
		}
		return stars.filter((item) => item !== undefined);
	};
	return <div className='star-rating'>{renderStars()}</div>;
};

export default StarRating;
