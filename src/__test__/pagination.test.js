/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from '../components/Shared/Pagination';

const defaultProps = {
	currentPage: 1,
	totalPages: 10,
	itemsPerPage: 10,
	totalItems: 100,
	onPageChange: jest.fn(),
};

// Mock the Redux store and related dependencies
jest.mock('../Redux/store.ts', () => ({
	...jest.requireActual('../Redux/store.ts'),
	useAppDispatch: jest.fn(),
}));

// Mock the userSlice module
jest.mock('../Redux/slices/userSlice', () => ({
	...jest.requireActual('../Redux/slices/userSlice'),
	initialState: {
		currentPage: 1,
		itemsPerPage: 10,
		totalItems: 100,
		totalPages: 10,
	},
	setItemsPerPage: jest.fn(),
}));

describe('Pagination component', () => {
	test('renders Pagination component', () => {
		const { container } = render(<Pagination {...defaultProps} />);
		expect(container).toMatchSnapshot();
	});
	it('renders Pagination correctly', () => {
		render(<Pagination {...defaultProps} />);
		// Assert
		// Find the element with the "Showing" text within the pagination container
		expect(screen.getByText('Showing', { selector: 'p' })).toBeInTheDocument();
	});

	it('handles page change on button click', () => {
		render(<Pagination {...defaultProps} />);
		// Act
		const buttonWithText2 = screen.getByText('2', { selector: 'button' });
		fireEvent.click(buttonWithText2);
		// Assert
		expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
	});

	// ...

	it('handles items per page change', () => {
		render(<Pagination {...defaultProps} />);

		// Act

		const option1 = screen.getByTestId('option-1');
		expect(option1).toBeInTheDocument();
	});

	it('renders correct number of page buttons and ellipsis', () => {
		const totalPages = 10; // Change this to the desired total number of pages
		// Act
		render(<Pagination currentPage={1} totalPages={totalPages} itemsPerPage={10} totalItems={100} onPageChange={() => {}} />);
		// Assert
		const pageButtons = screen.getAllByRole('button');

		const ellipsis = screen.getByText('...');

		// Assert that the correct number of page buttons is rendered
		expect(pageButtons).toHaveLength(5);

		// Assert that the ellipsis is visible when there are more than 5 pages
		if (totalPages > 5) {
			expect(ellipsis).toBeInTheDocument();
		} else {
			// Assert that the ellipsis is not present when there are 5 or fewer pages
			expect(ellipsis).not.toBeInTheDocument();
		}
	});

	// Add more test cases as needed
});
