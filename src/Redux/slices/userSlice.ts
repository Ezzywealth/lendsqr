import { usersData } from '../../utils/userDetails';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState, StatusProp, UpdateStatusProps, UserProps } from '../../interfaces/typings';
import axios from 'axios';
import { getAllUsers, searchUserById, updateUserStatusById } from '../../utils/Database/indexDb';
const base_url = process.env.REACT_APP_API;

const initialState: AppState = {
	users: [],
	user: null,
	filteredUsers: [],
	usersLoading: false,
	usersError: '',
	userLoading: false,
	userError: '',
	updateLoading: false,
	updateError: '',
	currentPage: 1,
	showOptionsModal: false,
	totalPages: 0,
	pageSize: 0,
	noOfItems: 0,
	sidebarOpen: false,
};

// function to update user status by id
export const updateUserStatus = createAsyncThunk('updateUserStatus', async ({ id, status }: UpdateStatusProps) => {
	let value: boolean = false;
	await updateUserStatusById(id, status, (response) => {
		console.log(response);
		response ? (value = true) : (value = false);
	});
	// mock an api call using mocky.io and axios
	await axios.get(`${base_url}`);
	return value;
});

// function to mock an api call using mocky.io and axios, and then return the users data
export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
	let data: UserProps[] = [];
	// fetch the users from indexedDB and set the data to the users array
	await getAllUsers((users) => {
		data = users;
	});

	// mock an api call using mocky.io and axios
	await axios.get(`${base_url}`);
	if (data.length !== 0) {
		return data;
	} else {
		return [];
	}
});

// a function to mock an api call using mocky.io and axios, and then return a single user details
export const fetchUserById = createAsyncThunk('fetchUser', async (id: string) => {
	// declare a variable to hold the user details
	let data: UserProps | undefined;

	// fetch the user from indexedDB and set the data to the user object
	await searchUserById(id, (user) => {
		data = user;
	});

	// mock an api call using mocky.io and axios
	await axios.get(`${base_url}`);

	// return the user details
	return data;
});

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		buttonPagination: (state, action) => {
			// get the current page from the payload
			const currentPage = action.payload;

			// set the current page to the payload
			state.currentPage = currentPage;

			// slice the users array to get the users for the current page
			state.filteredUsers = state.users.slice((currentPage - 1) * state.pageSize, currentPage * state.pageSize);
		},
		setItemsPerPage: (state, action) => {
			// get the number of items to be displayed per page from the payload
			state.pageSize = action.payload;

			// slice the users array to get the users for the current page
			state.totalPages = Math.ceil(state.noOfItems / state.pageSize);
		},
		setShowOptionsModal: (state, action) => {
			// toggle the showFilterModal state
			state.showOptionsModal = action.payload;
		},
		toggleSidebar: (state) => {
			state.sidebarOpen = !state.sidebarOpen;
		},
		filterUsers: (state, action) => {
			// get the filter parameters from the payload
			const { organization, username, phoneNumber, date, email, status } = action.payload;

			// filter the users array based on the filter parameters
			const filteredUsers = state.users.filter((user) => {
				const user_username = user.username.toLowerCase();
				const user_email = user.email.toLowerCase();
				const user_organization = user.organization.toLowerCase();
				const date_joined = user.date_joined.toLowerCase();
				const user_status = user.status.toLowerCase();
				const phone = user.phone_number;
				return (
					// check if the filter parameters matches any of the user details
					user_username === username.toLowerCase() ||
					// check if the email matches the user email
					user_email === email.toLowerCase() ||
					// check if the organization matches the user organization
					user_organization === organization.toLowerCase() ||
					// check if the date matches the date joined
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
					// check if the status matches the user status
					user_status === status.toLowerCase() ||
					// check if the phone number matches the user phone number
					phone === phoneNumber
				);
			});
			// set the state filtered users array to the filtered users
			state.filteredUsers = filteredUsers.slice(0, state.pageSize);
			// set the total pages to the number of pages needed to display the filtered users
			state.totalPages = Math.ceil(filteredUsers.length / state.pageSize);
			// set the current page to 1
			state.currentPage = 1;
			// set the number of items to the number of filtered users
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
			state.usersError = 'An error occured while fetching users. Refresh !!!';
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
			state.user = null;
			state.userLoading = false;
			state.userError = 'An error occured';
		});
		builder.addCase(fetchUserById.pending, (state) => {
			state.userLoading = true;
			state.user = null;
			state.userError = '';
		});
		builder.addCase(updateUserStatus.pending, (state) => {
			state.updateLoading = true;
			state.updateError = '';
		});
		builder.addCase(updateUserStatus.fulfilled, (state, action) => {
			state.updateLoading = false;
			state.updateError = '';

			// get the id of the user and the new status from the payload
			const { id, status } = action.meta.arg;

			// map through the users array and change the status of the user to active
			state.users = state.users.map((item) => {
				if (item.customId === id) {
					return {
						...item,
						status: status,
					};
				}
				return item;
			});

			// map through the filteredUsers array and change the status of the user to active
			state.filteredUsers = state.filteredUsers.map((item) => {
				if (item.customId === id) {
					return {
						...item,
						status: status,
					};
				}
				return item;
			});
			state.showOptionsModal = false;
		});
		builder.addCase(updateUserStatus.rejected, (state) => {
			state.updateLoading = false;
			state.updateError = 'Status update failed';
		});
	},
});

export const { buttonPagination, setItemsPerPage, filterUsers, setShowOptionsModal, toggleSidebar } = usersSlice.actions;
export default usersSlice.reducer;
export type RootState = {
	users: {
		admin: UserProps | undefined;
		counter: number;
		users: UserProps[];
		user: UserProps;
		filteredUsers: UserProps[];
		usersLoading: boolean;
		usersError: string;
		updateLoading: false;
		updateError: '';
		userLoading: boolean;
		userError: string;
		currentPage: number;
		totalPages: number;
		pageSize: number;
		noOfItems: number;
		showOptionsModal: boolean;
		sidebarOpen: boolean;
	};
};
