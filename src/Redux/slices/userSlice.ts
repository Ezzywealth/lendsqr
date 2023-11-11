import { usersData } from '../../utils/userDetails';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState, UserProps } from '../../interfaces/typings';
import axios from 'axios';
const base_url = process.env.REACT_APP_API;
const initialState: AppState = {
	admin: undefined,
	counter: 0,
	users: [],
	user: undefined,
	filteredUsers: [],
	usersLoading: false,
	usersError: '',
	userLoading: false,
	userError: '',
	currentPage: 1,
	totalPages: 0,
	pageSize: 0,
	noOfItems: 0,
};

export const fetchUsers = createAsyncThunk('fetchLoans', async () => {
	const res = await axios.get(`${base_url}`);
	console.log(res);
	return usersData;
});

export const fetchUserById = createAsyncThunk('fetchUser', async (id: string) => {
	const res = await axios.get(`${base_url}`);
	console.log(res);
	const user: UserProps | undefined = usersData.find((user) => user.id === id);
	return user;
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
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload;
			state.pageSize = 9;
			state.filteredUsers = action.payload.slice(0, state.pageSize);
			state.usersLoading = false;
			state.usersError = '';
			state.totalPages = Math.ceil(action.payload.length / state.pageSize);
			state.noOfItems = action.payload.length;
		});
		builder.addCase(fetchUsers.rejected, (state) => {
			state.users = [];
			state.filteredUsers = [];
			state.usersLoading = false;
			state.noOfItems = 0;
			state.usersError = 'An error occured';
		});
		builder.addCase(fetchUsers.pending, (state) => {
			state.usersLoading = true;
			state.users = [];
			state.filteredUsers = [];
			state.noOfItems = 0;
			state.usersError = '';
		});
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state.user = action.payload;
			state.userLoading = false;
			state.userError = '';
		});
		builder.addCase(fetchUserById.rejected, (state) => {
			state.user = undefined;
			state.userLoading = false;
			state.userError = 'An error occured';
		});
		builder.addCase(fetchUserById.pending, (state) => {
			state.userLoading = true;
			state.user = undefined;
			state.userError = '';
		});
	},
});

export const { buttonPagination, setItemsPerPage, filterUsers, blackListUser, activateUser } = counterSlice.actions;
export default counterSlice.reducer;
export type RootState = {
	usersData: {
		admin: UserProps | undefined;
		counter: number;
		users: UserProps[];
		user: UserProps | undefined;
		filteredUsers: UserProps[];
		usersLoading: boolean;
		usersError: string;
		userLoading: boolean;
		userError: string;
		currentPage: number;
		totalPages: number;
		pageSize: number;
		noOfItems: number;
	};
};
