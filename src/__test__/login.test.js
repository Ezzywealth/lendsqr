/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import store from '../Redux/store';

describe('LoginForm', () => {
	test('renders LoginForm component', () => {
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginForm />
				</BrowserRouter>
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it('renders LoginForm correctly', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginForm />
				</BrowserRouter>
			</Provider>
		);

		// Add assertions based on your component's structure and content
		expect(screen.getByText('Welcome')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
	});
});
