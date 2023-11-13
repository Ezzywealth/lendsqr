import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // You may need to install this package
import { usersData } from '../utils/userDetails';
import Table from '../components/users/Table/Table';

const mockStore = configureStore();
jest.mock('../utils/userDetails.ts', () => ({
	tableHeaders: ['organization', 'username', 'email', 'phone number', 'date joined', 'status'],
	filteredUsers: [
		{
			'customId': '6550b257581b3a7f0',
			'id': 1,
			'profile_picture': 'https://picsum.photos/200/300?random=446',
			'organization': 'Lendstar',
			'username': 'Snider92',
			'fullName': 'Mcclain Head',
			'email': 'mcclainhead@bitendrex.com',
			'date_joined': 'Aug 09, 2020 03:57 AM',
			'status': 'Active',
			'phone_number': '+1 (989) 466-2279',
			'acc_tier': 3,
			'acc_balance': 13342819,
			'acc_number': 21704038798,
			'bank_name': 'VURBO',
			'bvn': 2222663344,
			'gender': 'Female',
			'marital_status': 'Divorced',
			'children': 'Yes',
			'resident_type': 'Parental Resident',
			'education_level': "Master's Degree",
			'employment_status': 'Employed',
			'industry': 'Technology',
			'duration_of_employment': '2 years',
			'office_email': 'mcclainhead@vurbo.com',
			'monthly_income': {
				'min': 3103,
				'max': 10000,
			},
			'loan_repayment': 491.40000000000003,
			'socials': [
				{
					'platform': 'facebook',
					'handle': 'Graciela Cardenas',
				},
				{
					'platform': 'twitter',
					'handle': '@Maryann30',
				},
				{
					'platform': 'instagram',
					'handle': '@Agnes59',
				},
			],
			'guarantor': [
				{
					'fullName': 'Gentry Clay',
					'phone_number': '+1 (927) 417-2383',
					'email': 'gentryclay@vurbo.com',
					'relationship': 'Colleague',
				},
				{
					'fullName': 'Massey Casey',
					'phone_number': '+1 (918) 460-3318',
					'email': 'masseycasey@vurbo.com',
					'relationship': 'Colleague',
				},
				{
					'fullName': 'Soto Burgess',
					'phone_number': '+1 (835) 427-2949',
					'email': 'sotoburgess@vurbo.com',
					'relationship': 'Friend',
				},
			],
		},
		{
			'customId': '6550b2578a3fedf31',
			'id': 2,
			'profile_picture': 'https://picsum.photos/200/300?random=559',
			'organization': 'Lendsqr',
			'username': 'Carey77',
			'fullName': 'Christina Rush',
			'email': 'christinarush@vurbo.com',
			'date_joined': 'Jan 16, 2020 11:15 PM',
			'status': 'Pending',
			'phone_number': '+1 (897) 587-3994',
			'acc_tier': 3,
			'acc_balance': 72290141,
			'acc_number': 37068730901,
			'bank_name': 'MAXEMIA',
			'bvn': 2222690725,
			'gender': 'Female',
			'marital_status': 'Single',
			'children': 'Yes',
			'resident_type': 'Own Resident',
			'education_level': "Bachelor's Degree",
			'employment_status': 'Employed',
			'industry': 'Finance',
			'duration_of_employment': '2 years',
			'office_email': 'christinarush@maxemia.com',
			'monthly_income': {
				'min': 5052,
				'max': 10000,
			},
			'loan_repayment': 600.1,
			'socials': [
				{
					'platform': 'facebook',
					'handle': 'Benson Cochran',
				},
				{
					'platform': 'twitter',
					'handle': '@Howe76',
				},
				{
					'platform': 'instagram',
					'handle': '@Schmidt76',
				},
			],
			'guarantor': [
				{
					'fullName': 'Reeves Woods',
					'phone_number': '+1 (955) 530-2008',
					'email': 'reeveswoods@maxemia.com',
					'relationship': 'Family',
				},
				{
					'fullName': 'Gallegos Hurley',
					'phone_number': '+1 (882) 590-3045',
					'email': 'gallegoshurley@maxemia.com',
					'relationship': 'Friend',
				},
				{
					'fullName': 'Benton Dean',
					'phone_number': '+1 (884) 477-3410',
					'email': 'bentondean@maxemia.com',
					'relationship': 'Family',
				},
			],
		},
		{
			'customId': '6550b25742f7956c2',
			'id': 3,
			'profile_picture': 'https://picsum.photos/200/300?random=214',
			'organization': 'Lendstar',
			'username': 'Tessa31',
			'fullName': 'Kimberly Wall',
			'email': 'kimberlywall@maxemia.com',
			'date_joined': 'Dec 13, 2022 04:31 AM',
			'status': 'Blacklisted',
			'phone_number': '+1 (886) 534-2090',
			'acc_tier': 3,
			'acc_balance': 99585584,
			'acc_number': 57031766312,
			'bank_name': 'QUALITEX',
			'bvn': 2222679749,
			'gender': 'Male',
			'marital_status': 'Married',
			'children': 'No',
			'resident_type': 'Own Resident',
			'education_level': "Bachelor's Degree",
			'employment_status': 'Unemployed',
			'industry': 'Technology',
			'duration_of_employment': '1 year',
			'office_email': 'kimberlywall@qualitex.com',
			'monthly_income': {
				'min': 9712,
				'max': 10000,
			},
			'loan_repayment': 952.5,
			'socials': [
				{
					'platform': 'facebook',
					'handle': 'Hooper Frederick',
				},
				{
					'platform': 'twitter',
					'handle': '@Luann98',
				},
				{
					'platform': 'instagram',
					'handle': '@Kennedy68',
				},
			],
			'guarantor': [
				{
					'fullName': 'Hess Black',
					'phone_number': '+1 (909) 473-2937',
					'email': 'hessblack@qualitex.com',
					'relationship': 'Family',
				},
				{
					'fullName': 'Leon Madden',
					'phone_number': '+1 (828) 573-2217',
					'email': 'leonmadden@qualitex.com',
					'relationship': 'Friend',
				},
				{
					'fullName': 'Annette Ayers',
					'phone_number': '+1 (960) 502-2086',
					'email': 'annetteayers@qualitex.com',
					'relationship': 'Family',
				},
			],
		},
	],
}));
describe('Table component', () => {
	let store;

	beforeEach(() => {
		// Initial state for your Redux store
		const initialState = {
			users: {
				filteredUsers: [],
				currentPage: 1,
				totalPages: 3,
				pageSize: 10,
				noOfItems: 25,
				showOptionsModal: false,
				showFilterModal: false,
			},
		};

		store = mockStore(initialState);
	});

	test('renders LoginForm component', () => {
		const { container } = render(
			<Provider store={store}>
				<Table />
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it('renders table headers', () => {
		render(
			<Provider store={store}>
				<Table />
			</Provider>
		);

		// Add assertions for each header
		expect(screen.getByText('Organization')).toBeInTheDocument();
		expect(screen.getByText('Username')).toBeInTheDocument();
		// Add assertions for other headers
	});

	it('renders user data', () => {
		render(
			<Provider store={store}>
				<Table />
			</Provider>
		);

		// Add assertions for user data rendering
		// For example, check if a user's organization is displayed
		expect(screen.getByText('Organization')).toBeInTheDocument();
		// Add assertions for other user data
	});

	it('opens filter modal when filter icon is clicked', async () => {
		render(
			<Provider store={store}>
				<Table />
			</Provider>
		);

		// Click on the filter icon
		fireEvent.click(screen.getByTestId('filter-1'));

		// Wait for the modal to be visible (use async/await if needed)
		await screen.findByText('Organization');

		// Add assertions for the visible modal
		expect(screen.getByText('Organization')).toBeInTheDocument();
	});
});
