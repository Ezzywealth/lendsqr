import { usersData } from '../../utils/userDetails';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../interfaces/typings';
import axios from 'axios';

const initialState: AppState = {
	counter: 0,
	users: [],
	filteredUsers: [],
	usersLoading: false,
	usersError: '',
	currentPage: 1,
	totalPages: 0,
	pageSize: 0,
	noOfItems: 0,
};

export const fetchLoans = createAsyncThunk('fetchLoans', async () => {
	const res = await axios.get(`https://run.mocky.io/v3/39ea9fd0-3025-4287-a056-078c5df0f118`);
	console.log(res);
	return usersData;
});

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		buttonPagination: (state, action) => {
			const currentPage = action.payload;
			state.currentPage = currentPage;
			state.filteredUsers = state.users.slice((currentPage - 1) * state.pageSize, currentPage * state.pageSize);
		},
		setItemsPerPage: (state, action) => {
			state.pageSize = action.payload;
			state.totalPages = Math.ceil(state.noOfItems / state.pageSize);
		},
		blackListUser: (state, action) => {
			const { id } = action.payload;
			state.users = state.users.map((item) => {
				if (item.id === id) {
					return {
						...item,
						status: 'Blacklisted',
					};
				}
				return item;
			});
			state.filteredUsers = state.filteredUsers.map((item) => {
				if (item.id === id) {
					return {
						...item,
						status: 'Blacklisted',
					};
				}
				return item;
			});
		},
		activateUser: (state, action) => {
			const { id } = action.payload;
			console.log(id);
			state.users = state.users.map((item) => {
				if (item.id === id) {
					return {
						...item,
						status: 'Active',
					};
				}
				return item;
			});
			state.filteredUsers = state.filteredUsers.map((item) => {
				if (item.id === id) {
					return {
						...item,
						status: 'Active',
					};
				}
				return item;
			});
		},
		filterUsers: (state, action) => {
			const { organization, username, phoneNumber, date, email, status } = action.payload;

			const filteredUsers = state.users.filter((user) => {
				const user_username = user.username.toLowerCase();
				const user_email = user.email.toLowerCase();
				const user_organization = user.organization.toLowerCase();
				const date_joined = user.date_joined.toLowerCase();
				const user_status = user.status.toLowerCase();
				const phone = user.phone_number;

				return (
					user_username === username.toLowerCase() ||
					user_email === email.toLowerCase() ||
					user_organization === organization.toLowerCase() ||
					new Date(date).toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					}) ===
						new Date(date_joined).toLocaleString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						}) ||
					user_status === status.toLowerCase() ||
					phone === phoneNumber
				);
			});
			state.filteredUsers = filteredUsers.slice(0, state.pageSize);
			state.totalPages = Math.ceil(filteredUsers.length / state.pageSize);
			state.currentPage = 1;
			state.noOfItems = filteredUsers.length;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLoans.fulfilled, (state, action) => {
			state.users = action.payload;
			state.pageSize = 9;
			state.filteredUsers = action.payload.slice(0, state.pageSize);
			state.usersLoading = false;
			state.usersError = '';
			state.totalPages = Math.ceil(action.payload.length / state.pageSize);
			state.noOfItems = action.payload.length;
		});
		builder.addCase(fetchLoans.rejected, (state, action) => {
			state.users = [];
			state.filteredUsers = [];
			state.usersLoading = false;
			state.noOfItems = 0;
			state.usersError = 'An error occured';
		});
		builder.addCase(fetchLoans.pending, (state) => {
			state.usersLoading = true;
			state.users = [];
			state.filteredUsers = [];
			state.noOfItems = 0;
			state.usersError = '';
		});
	},
});

export const { buttonPagination, setItemsPerPage, filterUsers, blackListUser, activateUser } = counterSlice.actions;
export default counterSlice.reducer;
