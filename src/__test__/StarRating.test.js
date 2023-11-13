import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StarRating from '../components/userDetails/StarRating'; // adjust the path accordingly

describe('StarRating component', () => {
	test('renders LoginForm component', () => {
		const { container } = render(<StarRating rating={2} />);
		expect(container).toMatchSnapshot();
	});
	it('renders with the correct number of filled and empty stars with a rating of 2', () => {
		// Case: Rating is 2.5
		render(<StarRating rating={2} />);

		// Assert: Check if there are 2 filled stars, 1 half-filled star, and 1 empty star
		expect(screen.getAllByTestId('star')).toHaveLength(3);
		expect(screen.getAllByTestId('star')[0]).toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[1]).toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[2]).not.toHaveClass('star filled');

		// Add more test cases based on different rating values and expected outcomes
	});

	it('renders with default rating of 0 when not provided', () => {
		render(<StarRating />);

		// Assert: Check if there are no filled stars  (default rating is 0)
		expect(screen.getAllByTestId('star')).toHaveLength(3);
		expect(screen.getAllByTestId('star')[0]).not.toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[1]).not.toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[2]).not.toHaveClass('star filled');
	});

	it('renders with default rating of filled and empty stars with a rating of 1', () => {
		// Case: Rating is 0.8
		render(<StarRating rating={1} />);

		// Assert: Check if there is 1 filled star, 1 half-filled star, and 1 empty star
		expect(screen.getAllByTestId('star')).toHaveLength(3);
		expect(screen.getAllByTestId('star')[0]).toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[1]).not.toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[2]).not.toHaveClass('star filled');
	});

	it('renders with default rating of filled and empty stars with a rating of 3', () => {
		// Case: Rating is 0.8
		render(<StarRating rating={3} />);

		// Assert: Check if there is 1 filled star, 1 half-filled star, and 1 empty star
		expect(screen.getAllByTestId('star')).toHaveLength(3);
		expect(screen.getAllByTestId('star')[0]).toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[1]).toHaveClass('star filled');
		expect(screen.getAllByTestId('star')[2]).toHaveClass('star filled');
	});
});
