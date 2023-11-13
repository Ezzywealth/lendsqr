// Modal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterModal from '../components/users/Table/FilterModal'; // Adjust the path accordingly

jest.mock('../Redux/store.ts', () => ({
	...jest.requireActual('../Redux/store.ts'),
	useAppDispatch: jest.fn(),
}));

describe('Modal component', () => {
	const setShowFilterModalMock = jest.fn();

	const defaultProps = {
		setShowFilterModal: setShowFilterModalMock,
	};

	test('renders LoginForm component', () => {
		const { container } = render(<FilterModal {...defaultProps} />);
		expect(container).toMatchSnapshot();
	});

	it('renders modal content and handles apply button click', () => {
		render(<FilterModal {...defaultProps} />);

		// Check if modal content is rendered
		expect(screen.getByLabelText('Organization')).toBeInTheDocument();
		expect(screen.getByLabelText('Username')).toBeInTheDocument();
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Date')).toBeInTheDocument();
		expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
		expect(screen.getByLabelText('Status')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
		expect(screen.getByText('Apply')).toBeInTheDocument();
	});

	it('handles cancel button click', () => {
		render(<FilterModal {...defaultProps} />);

		// Click the Cancel button
		fireEvent.click(screen.getByText('Cancel'));

		// Check if the setShowFilterModalMock function was called
		expect(setShowFilterModalMock).toHaveBeenCalledWith(false);
	});
});
