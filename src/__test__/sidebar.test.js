/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../components/Shared/Sidebar';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
// Mock the react-router-dom Link component
jest.mock('react-router-dom', () => ({
	Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('Sidebar component', () => {
	test('renders Pagination component', () => {
		const { container } = render(
			<Provider store={store}>
				<Sidebar />
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});

	test('renders sidebar with links', () => {
		render(
			<Provider store={store}>
				<Sidebar />
			</Provider>
		);
		const dashboardLink = screen.getByText('Dashboard');
		const usersLink = screen.getByText('users');
		expect(dashboardLink).toBeInTheDocument();
		expect(usersLink).toBeInTheDocument();
	});

	test('activates link on click', () => {
		render(
			<Provider store={store}>
				<Sidebar />
			</Provider>
		);

		const usersLink = screen.getByText('users');

		// Click on the Users link
		fireEvent.click(usersLink);

		// Get the immediate parent li element
		const parentLi = usersLink.parentElement;

		// Assert that the parent li element has the 'active_link' class
		expect(parentLi).toHaveClass('active_link');
	});
});
